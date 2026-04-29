-- ============================================================
-- CS 458 Assignment 11 - Database Setup Script
-- Database: MaintenanceDB
-- ============================================================

-- Create the database (run this block once as a SQL Server admin)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'MaintenanceDB')
BEGIN
    CREATE DATABASE MaintenanceDB;
END
GO

USE MaintenanceDB;
GO

-- ============================================================
-- Table: WorkLogs
-- Stores clock-in/clock-out records for maintenance workers.
-- ============================================================
IF OBJECT_ID('dbo.WorkLogs', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.WorkLogs (
        LogID           INT IDENTITY(1,1) PRIMARY KEY,
        ProjectID       INT            NOT NULL,
        ClockInTime     DATETIME2      NOT NULL,
        ClockOutTime    DATETIME2      NOT NULL,
        GPSLocation     NVARCHAR(255)  NULL,
        ProofPhotoURL   NVARCHAR(500)  NULL,
        MaterialsUsed   NVARCHAR(MAX)  NULL,
        VendorSignature NVARCHAR(255)  NULL,

        CONSTRAINT CK_WorkLogs_ClockOrder
            CHECK (ClockOutTime > ClockInTime)
    );
END
GO

-- ============================================================
-- Table: Invoices
-- Stores billing invoices linked to projects or schedules.
-- ============================================================
IF OBJECT_ID('dbo.Invoices', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Invoices (
        InvoiceID    INT IDENTITY(1,1) PRIMARY KEY,
        ProjectID    INT            NULL,
        ScheduleID   INT            NULL,
        InvoiceDate  DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
        TotalAmount  DECIMAL(18, 2) NOT NULL,
        IsExported   BIT            NOT NULL DEFAULT 0,

        CONSTRAINT CK_Invoices_TotalAmount
            CHECK (TotalAmount >= 0)
    );
END
GO

-- ============================================================
-- Sample seed data (optional - comment out in production)
-- ============================================================
INSERT INTO dbo.WorkLogs (ProjectID, ClockInTime, ClockOutTime, GPSLocation, MaterialsUsed)
VALUES
    (1, '2024-06-01 08:00:00', '2024-06-01 12:00:00', '40.7128,-74.0060', 'Paint, brushes'),
    (1, '2024-06-02 09:00:00', '2024-06-02 17:00:00', '40.7128,-74.0060', 'Lumber, nails'),
    (2, '2024-06-03 07:30:00', '2024-06-03 15:30:00', '34.0522,-118.2437', 'Concrete, rebar');
GO

INSERT INTO dbo.Invoices (ProjectID, ScheduleID, InvoiceDate, TotalAmount, IsExported)
VALUES
    (1, NULL,  '2024-06-01 12:00:00', 1500.00, 0),
    (1, NULL,  '2024-06-02 17:00:00', 2400.00, 0),
    (2, 5,     '2024-06-03 15:30:00', 3200.50, 1);
GO
