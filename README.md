# POC: AWS Kentico 13 

## 📌 Overview
This project was created as a **Proof of Concept (POC)** to support AWS initiatives in using AI to automatically convert existing codebases into **Kentico Xperience 13** compatible applications.

---

## ⚙️ Technologies
* **Platform:** Kentico Xperience 13
* **Framework:** ASP.NET MVC / .NET Framework (or .NET Core if applicable)
* **Database:** Microsoft SQL Server
* **Cloud:** Amazon Web Services (AWS)

---

## 🚀 Getting Started

### Prerequisites
* **IDE:** Visual Studio 2019 / 2022 / 2026
* **SDK:** .NET Framework / .NET Core SDK (depending on your solution)
* **Database:** Microsoft SQL Server

### 🔧 Setup Instructions

1.  **Clone Repository**
    ```bash
    git clone https://github.com/gob123th/POC_AWS_Kentico13.git
    cd POC_AWS_Kentico13
    ```

2.  **Configure Database**
    * Restore database backup.
    * Update connection strings in: `web.config` for cms and  `appsettings.json` for WebApp.

3.  **Configure Kentico**
    * Set **CMSApp** and **MVC site** as startup projects.
    * Ensure both applications point to the same database.

4.  **Run Locally**
    * Start **CMSApp** first.
    * Then run the **MVC application**.

---

## 🔐 Configuration & Security
* **Secrets Management:** Store secrets in **AWS Secrets Manager** or **SSM Parameter Store**.
* **Environments:** Use environment-specific configs.
* **Encryption:** Enable **HTTPS** via **AWS Certificate Manager (ACM)**.

---

## 📂 Project Structure
* ` /CMSApp ` — Kentico Administration interface.
* ` /MVC ` — Live site application.
* ` /Database ` — SQL scripts and backups.

---

## 🧪 Purpose of This POC
* **Validate** Kentico deployment on AWS infrastructure.
* **Test** scalability and performance metrics.
* **Demonstrate** cloud architecture patterns and AI conversion viability.

> [!CAUTION]
> **This is a POC project, not production-ready.** > Some configurations may be simplified for testing purposes. Security hardening is strictly required before any production deployment.

---

## 📚 References
* [Kentico 13 Documentation](https://docs.xperience.io)
* [AWS Architecture Best Practices](https://aws.amazon.com/architecture/well-architected/)
