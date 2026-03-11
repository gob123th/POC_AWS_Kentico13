<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PartnerList_Export.aspx.cs"
    Inherits="PartnerList.PartnerList_Export" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Export - PartnerList</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>


    </head>

    <body>

        <form id="form1" runat="server">

            <div class="container mt-5">
                <h4>Export, Partner List Data</h4>
                <div class="row">
                    <div class="form-group col-12 col-md-2 mt-2">
                        <label for="fromDate">From:</label>
                        <asp:TextBox ID="txtDateFrom" autocomplete="off" runat="server" CssClass="form-control"
                            placeholder="yyyy-mm-dd"></asp:TextBox>

                    </div>
                    <div class="form-group col-12 col-md-2 mt-2">
                        <label for="toDate">To:</label>
                        <asp:TextBox ID="txtDateTo" autocomplete="off" runat="server" CssClass="form-control"
                            placeholder="yyyy-mm-dd"></asp:TextBox>
                    </div>
                    <div class="form-group col-12 col-md-3 mt-2 d-flex align-items-end">
                        <asp:Button ID="btnSearch" runat="server" Text="Search" class="btn btn-primary" Width="120px"
                            OnClick="btnSearch_Click" />
                    </div>
                </div>

                <div class="row mt-2">
                    <asp:Label ID="lbItem" runat="server" Text="Found 0 item(s)" class="mt-3"></asp:Label>
                    <div class="form-group col-12 col-md-3 mt-2 d-flex align-items-end">
                        <asp:Button ID="btnExport" runat="server" Text="Export .dat" class="btn btn-warning"
                            Width="120px" OnClick="btnExport_Click" />
                        <asp:Button ID="btnExportCtl" runat="server" Text="Export .ctl" style="margin-left:16px;"
                            class="btn btn-warning" Width="120px" OnClick="btnExportCtl_Click" />
                    </div>
                </div>

            </div>


        </form>

        <script>
            $(function () {
                $("#<%= txtDateFrom.ClientID %>").datepicker({
                    dateFormat: "yy-mm-dd",
                    onSelect: function (selectedDate) {
                        $("#<%= txtDateTo.ClientID %>").datepicker("option", "minDate", selectedDate);
                    }
                });
                $("#<%= txtDateTo.ClientID %>").datepicker({
                    dateFormat: "yy-mm-dd",
                    onSelect: function (selectedDate) {
                        $("#<%= txtDateFrom.ClientID %>").datepicker("option", "maxDate", selectedDate);
                    }
                });
            });
        </script>



    </body>

    </html>