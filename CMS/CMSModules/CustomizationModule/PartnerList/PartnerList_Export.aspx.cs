using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Security.Cryptography;
using System.Configuration;
using System.Runtime.Remoting.Contexts;
using static System.Net.Mime.MediaTypeNames;
using System.IO.Compression;
using System.Globalization;

namespace PartnerList
{
    public partial class PartnerList_Export : System.Web.UI.Page
    {
        private static Encoding tis620 = Encoding.GetEncoding("TIS-620");

        protected void Page_Load(object sender, EventArgs e)
        {
            lbItem.Text = "Found 0 item(s)";
            btnExport.Enabled = false;
            btnExportCtl.Enabled = false;
        }

        protected DataTable ItemData
        {
            get
            {
                return (DataTable)Session["PartnetList_ItemData"];
            }
            set
            {
                Session["PartnetList_ItemData"] = value;
            }
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            try
            {
                Dictionary<string, string> partnerListConfig = getBatchConfig("partnerList");
                string querySelectForm = partnerListConfig["QUERY"];
                
                StringBuilder sqlText = new StringBuilder();
                if (string.IsNullOrEmpty(querySelectForm))
                {
                    sqlText.AppendLine(" select ID_NUMBER, ID_TYPE, MOBILE_NO, format(ItemCreatedWhen,'yyyy-MM-dd HH:mm:ss') as DATETIME_TEXT ");
                    sqlText.AppendLine(" from customtable_partnerlist ");
                }
                else
                {
                    sqlText.AppendLine(querySelectForm);
                }
                sqlText.AppendLine(" where convert(varchar(10),ItemCreatedWhen,120) >= @dateform ");
                sqlText.AppendLine(" and convert(varchar(10),ItemCreatedWhen,120) <= @dateto ");

                string dateform = txtDateFrom.Text;
                string dateto = txtDateTo.Text;

                if (string.IsNullOrEmpty(dateform?.Trim()) || string.IsNullOrEmpty(dateto?.Trim()))
                {
                    throw new Exception("Please specific Date [From - To]");
                }

                SqlConnection sqlcon = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["CMSConnectionString"].ConnectionString);
                sqlcon.Open();

                SqlCommand cmd = new SqlCommand(sqlText.ToString(), sqlcon);
                cmd.CommandTimeout = 0;
                cmd.Parameters.Add(new SqlParameter("@dateform", dateform));
                cmd.Parameters.Add(new SqlParameter("@dateto", dateto));

                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                sqlcon.Close();


                lbItem.Text = string.Format("found {0} item(s)", ds.Tables[0].Rows.Count);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ItemData = ds.Tables[0].Copy();
                    btnExport.Enabled = true;
                    btnExportCtl.Enabled = true;
                }
                else
                {
                    ItemData = null;
                    btnExport.Enabled = false;
                    btnExportCtl.Enabled = false;
                    Response.Write("<div class=\"alert alert-warning\" role=\"alert\">Not Found!</div>");
                }
            }
            catch (Exception ex)
            {
                Response.Write(string.Format("<div class=\"alert alert-danger\" role=\"alert\">{0}</div>", ex.Message.ToString()));
            }
        }

        protected void btnExport_Click(object sender, EventArgs e)
        {
            Dictionary<string, string> partnerListConfig = getBatchConfig("partnerList");
            string filePath = partnerListConfig["PathExport"];

            string fileFullNameData = string.Format("NOTI_PARTNER_1100_{0}.dat", DateTime.Now.ToString("yyyyMMddHHmmss"));
            string fileResposneNameData = string.Format("NOTI_PARTNER_1100_{0}.dat", GenerateAsOfDateText(ItemData));

            ExportFileData(filePath, fileFullNameData, fileResposneNameData);
        }

        protected void ExportFileData(string filePath, string fileFullName, string fileResponseName)
        {
            try
            {
                string txtResponse = GenerateTextFile(ItemData);

                string fullName = Path.Combine(filePath, fileFullName);
                StreamWriter strStream = new StreamWriter(new FileStream(fullName, FileMode.Create), tis620);
                strStream.Write(txtResponse);
                strStream.Flush();
                strStream.Close();
                strStream.Dispose();


                if (!string.IsNullOrEmpty(fileResponseName) && File.Exists(fullName))
                {
                    Response.Clear();
                    Response.ClearHeaders();
                    Response.BufferOutput = false;
                    Response.ContentType = "application/octet-stream";
                    Response.AppendHeader("Content-Disposition", string.Format("attachment;filename=\"{0}\"", fileResponseName));
                    Response.TransmitFile(fullName);
                    Response.Flush();
                    Response.End();
                }
            }
            catch(Exception ex)
            {
                 InsertLog("getBatchConfig", ex.ToString());
            }
        }

        protected void btnExportCtl_Click(object sender, EventArgs e)
        {
            Dictionary<string, string> partnerListConfig = getBatchConfig("partnerList");
            string filePath = partnerListConfig["PathExport"];

            string fileFullNameControl = string.Format("NOTI_PARTNER_1100_{0}.ctl", DateTime.Now.ToString("yyyyMMddHHmmss"));
            string fileResposneNameControl = string.Format("NOTI_PARTNER_1100_{0}.ctl", GenerateAsOfDateText(ItemData));
            ExportFileControl(filePath, fileFullNameControl, fileResposneNameControl);
        }
        
        protected void ExportFileControl(string filePath, string fileFullName, string fileResponseName)
        {
            try
            {
                string txtResponse = GenerateControlFile(ItemData);

                string fullName = Path.Combine(filePath, fileFullName);
                StreamWriter strStream = new StreamWriter(new FileStream(fullName, FileMode.Create), new System.Text.UTF8Encoding(false));
                strStream.Write(txtResponse);
                strStream.Flush();
                strStream.Close();
                strStream.Dispose();

                if (!string.IsNullOrEmpty(fileResponseName) && File.Exists(fullName))
                {
                    Response.Clear();
                    Response.ClearHeaders();
                    Response.BufferOutput = false;
                    Response.ContentType = "application/octet-stream";
                    Response.AppendHeader("Content-Disposition", string.Format("attachment;filename=\"{0}\"", fileResponseName));
                    Response.TransmitFile(fullName);
                    Response.Flush();
                    Response.End();
                }
            }
            catch (Exception ex)
            {
                InsertLog("getBatchConfig", ex.ToString());
            }
        }


        private string GenerateTextFile(DataTable data)
        {
            try
            {
                Dictionary<string, string> partnerListConfig = getBatchConfig("partnerList");
                Dictionary<string, string> aes256config = getBatchConfig("aes256");

                string delimited = partnerListConfig["Delimited"];
                StringBuilder txtWrite = new StringBuilder();

                //write header
                if (partnerListConfig["ExportHeader"] == "True")
                {
                    string lineHead = string.Empty;
                    foreach (DataColumn colItem in data.Columns)
                    {
                        lineHead += colItem.ColumnName + delimited;

                    }
                    txtWrite.AppendLine(lineHead.Substring(0, lineHead.Length - 1));
                }

                //write data
                foreach (DataRow row in data.Rows)
                {
                    string lineData = string.Empty;
                    foreach (DataColumn colItem in data.Columns)
                    {
                        string tempDecrypt = Decrypt(row[colItem.ColumnName]?.ToString(), aes256config["key"], aes256config["iv"]).Replace(Environment.NewLine, " ").Replace("\r", "").Replace("\n", "");
                        lineData += tempDecrypt + delimited;
                    }
                    txtWrite.AppendLine(lineData.Substring(0, lineData.Length - 1));
                }

                return txtWrite.ToString();
            }
            catch (Exception ex)
            {
                Response.Write(string.Format("<div class=\"alert alert-danger\" role=\"alert\">{0}</div>", ex.Message.ToString()));
                return string.Empty;
            }
        }


        private string GenerateControlFile(DataTable data)
        {
            try
            {
                //string tmpStartDate = (string) data.Compute("MIN(DATETIME_TEXT)", "");
                //DateTime dteStartdate = DateTime.ParseExact(tmpStartDate, "yyyyMMdd HH:mm:ss", CultureInfo.InvariantCulture);

                string tmpEndDate = (string)data.Compute("MAX(DATETIME_TEXT)", "");
                DateTime dteEnddate = DateTime.ParseExact(tmpEndDate, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);

                
                string asOfDate = dteEnddate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
                string currentDate = DateTime.Now.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);


                // DateTime CurTime = DateTime.Now;
                // string CurrentTime = CurTime.ToString("yyyy-MM-dd HH:mm:ss.ffffff", CultureInfo.InvariantCulture);

                // string StartTime = dteStartdate.ToString("yyyy-MM-dd ", CultureInfo.InvariantCulture) + "00:00:00.000000";
                // string EndTime = dteEnddate.ToString("yyyy-MM-dd ", CultureInfo.InvariantCulture) + "23:59:59.000000";
                // string CountFile = "0000000001";
                // string CountRow = data.Rows.Count.ToString().PadLeft(10, '0');

                // string row = string.Empty;
                // row += CurrentTime + StartTime + EndTime + CountFile + CountRow;


                string dataControlText = asOfDate + '|' + currentDate + '|' + data.Rows.Count.ToString();
                return dataControlText;
            }
            catch (Exception ex)
            {
                Response.Write(string.Format("<div class=\"alert alert-danger\" role=\"alert\">{0}</div>", ex.Message.ToString()));
                return string.Empty;
            }
        }

        private string GenerateAsOfDateText(DataTable data)
        {
            try
            {
                string tmpEndDate = (string)data.Compute("MAX(DATETIME_TEXT)", "");
                DateTime dteEnddate = DateTime.ParseExact(tmpEndDate, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                
                return dteEnddate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            }
            catch (Exception ex)
            {
                Response.Write(string.Format("<div class=\"alert alert-danger\" role=\"alert\">{0}</div>", ex.Message.ToString()));
                return string.Empty;
            }
        }

        protected static Dictionary<string, string> getBatchConfig(string service)
        {
            Dictionary<string, string> config = new Dictionary<string, string>();
            try
            {
                using (SqlConnection connect = new SqlConnection(ConfigurationManager.ConnectionStrings["CMSConnectionString"].ConnectionString))
                {
                    connect.Open();
                    using (SqlCommand command = new SqlCommand("SELECT KEY_NAME,KEY_VALUE FROM customtable_IT_Config_Master with (nolock) WHERE APP_NAME = @service", connect))
                    {
                        command.Parameters.AddWithValue("@service", service);
                        SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);
                        DataTable dt = new DataTable();
                        sqlDataAdapter.Fill(dt);
                        foreach (DataRow row in dt.Rows)
                        {
                            config.Add(row["KEY_NAME"].ToString(), row["KEY_VALUE"].ToString());
                        }
                    }
                    connect.Close();
                }
            }
            catch (Exception ex)
            {
                InsertLog("getBatchConfig", ex.ToString());
            }
            return config;
        }

        public static void InsertLog(string subject, string exception)
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CMSConnectionString"].ConnectionString);
            try
            {
                con.Open();
                SqlCommand com = new SqlCommand();
                com.Connection = con;
                com.CommandType = CommandType.Text;
                com.CommandText = "insert into customtable_CMSLog (LogTitle,LogDetail,ItemCreatedWhen) VALUES ('" + "ExportPartnerList-" + subject + "'  ,'" + exception + "', GETDATE())";
                com.ExecuteNonQuery();
                con.Close();
            }
            catch { }
            finally
            {
                con.Close();
            }
        }


        public string Decrypt(string cipherText, string key, string iv)
        {
            try
            {
                string plaintext;

                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Convert.FromBase64String(key);
                    aesAlg.IV = Convert.FromBase64String(iv);
                    aesAlg.Mode = CipherMode.CBC;

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(cipherText)))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            // Read the decrypted bytes and convert to string using UTF-8 encoding
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt, Encoding.UTF8))
                            {
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                return plaintext;
            }
            catch
            {
                return cipherText;
            }
        }

    }
}