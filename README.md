POC AWS Kentico 13

📌 **Overview**
This project was created as a Proof of Concept (POC) to support AWS initiatives in using AI to automatically convert existing codebases into Kentico Xperience 13-compatible applications.

⚙️ **Technologies**
Kentico Xperience 13
ASP.NET MVC / .NET Framework (or .NET Core if applicable)
Microsoft SQL Server

🚀 **Getting Started**
Prerequisites
Visual Studio 2019/2022/2026
.NET Framework / .NET Core SDK (depending on your solution)
SQL Server

🔧 **Setup Instructions**
Clone repository
git clone https://github.com/gob123th/POC_AWS_Kentico13.git
cd POC_AWS_Kentico13
Configure database
Restore database backup (if provided)
Update connection string in:
web.config / appsettings.json
Configure Kentico
Set CMSApp and MVC site startup projects
Ensure both apps point to the same database
Run locally
Start CMSApp first
Then run MVC application

🔐 **Configuration Notes**
Store secrets in AWS Secrets Manager or SSM Parameter Store
Use environment-specific configs
Enable HTTPS via ACM

📂 **Project Structure**
/CMSApp          → Kentico admin
/MVC             → Live site
/Database        → SQL scripts / backups

🧪 **Purpose of This POC**
Validate Kentico deployment on AWS
Test scalability and performance
Demonstrate cloud architecture patterns

⚠️ **Notes**
This is a POC project, not production-ready
Some configurations may be simplified
Security hardening is required for production

📚 **References**
Kentico 13 Documentation
AWS Architecture Best Practices

