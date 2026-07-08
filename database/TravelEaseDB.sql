-- ============================================================
-- TravelEase LK - Enterprise Travel Agency Management System
-- Complete Database Schema for SQL Server
-- ============================================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TravelEaseLK')
BEGIN
    CREATE DATABASE TravelEaseLK;
END
GO

USE TravelEaseLK;
GO

-- ============================================================
-- Drop tables if they exist (for clean re-run)
-- ============================================================
IF OBJECT_ID('Notifications', 'U') IS NOT NULL DROP TABLE Notifications;
IF OBJECT_ID('Wishlists', 'U') IS NOT NULL DROP TABLE Wishlists;
IF OBJECT_ID('Reviews', 'U') IS NOT NULL DROP TABLE Reviews;
IF OBJECT_ID('Bookings', 'U') IS NOT NULL DROP TABLE Bookings;
IF OBJECT_ID('PackageImages', 'U') IS NOT NULL DROP TABLE PackageImages;
IF OBJECT_ID('Packages', 'U') IS NOT NULL DROP TABLE Packages;
IF OBJECT_ID('TourGuides', 'U') IS NOT NULL DROP TABLE TourGuides;
IF OBJECT_ID('Hotels', 'U') IS NOT NULL DROP TABLE Hotels;
IF OBJECT_ID('Vehicles', 'U') IS NOT NULL DROP TABLE Vehicles;
IF OBJECT_ID('DestinationImages', 'U') IS NOT NULL DROP TABLE DestinationImages;
IF OBJECT_ID('Destinations', 'U') IS NOT NULL DROP TABLE Destinations;
IF OBJECT_ID('Blogs', 'U') IS NOT NULL DROP TABLE Blogs;
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;
GO

-- ============================================================
-- Users Table
-- ============================================================
CREATE TABLE Users (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    FirstName   NVARCHAR(100) NOT NULL,
    LastName    NVARCHAR(100) NOT NULL,
    Email       NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(512) NOT NULL,
    PhoneNumber NVARCHAR(20) NULL,
    Country     NVARCHAR(100) NULL,
    ProfileImage NVARCHAR(500) NULL,
    Role        NVARCHAR(20) NOT NULL DEFAULT 'Customer', -- 'Admin' | 'Customer'
    IsActive    BIT NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt   DATETIME2 NULL
);
GO

-- ============================================================
-- Destinations Table
-- ============================================================
CREATE TABLE Destinations (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200) NOT NULL,
    Country     NVARCHAR(100) NOT NULL DEFAULT 'Sri Lanka',
    Description NVARCHAR(MAX) NULL,
    ShortDescription NVARCHAR(500) NULL,
    ImageUrl    NVARCHAR(500) NULL,
    IsActive    BIT NOT NULL DEFAULT 1,
    SortOrder   INT NOT NULL DEFAULT 0,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Destination Images Table
-- ============================================================
CREATE TABLE DestinationImages (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    DestinationId INT NOT NULL REFERENCES Destinations(Id) ON DELETE CASCADE,
    ImageUrl      NVARCHAR(500) NOT NULL,
    Caption       NVARCHAR(200) NULL,
    SortOrder     INT NOT NULL DEFAULT 0,
    CreatedAt     DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Tour Guides Table
-- ============================================================
CREATE TABLE TourGuides (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200) NOT NULL,
    Email       NVARCHAR(256) NULL,
    PhoneNumber NVARCHAR(20) NULL,
    Languages   NVARCHAR(500) NULL,
    Experience  INT NOT NULL DEFAULT 0,
    ProfileImage NVARCHAR(500) NULL,
    Bio         NVARCHAR(MAX) NULL,
    IsActive    BIT NOT NULL DEFAULT 1,
    Rating      DECIMAL(3,2) NOT NULL DEFAULT 5.00,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Hotels Table
-- ============================================================
CREATE TABLE Hotels (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200) NOT NULL,
    Location    NVARCHAR(200) NULL,
    StarRating  INT NOT NULL DEFAULT 3,
    Description NVARCHAR(MAX) NULL,
    ImageUrl    NVARCHAR(500) NULL,
    IsActive    BIT NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Vehicles Table
-- ============================================================
CREATE TABLE Vehicles (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Type        NVARCHAR(100) NOT NULL, -- 'Van', 'Bus', 'Car', 'Tuk Tuk'
    Capacity    INT NOT NULL DEFAULT 4,
    Description NVARCHAR(500) NULL,
    IsActive    BIT NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Packages Table
-- ============================================================
CREATE TABLE Packages (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    Name            NVARCHAR(200) NOT NULL,
    Description     NVARCHAR(MAX) NULL,
    ShortDescription NVARCHAR(500) NULL,
    Price           DECIMAL(18,2) NOT NULL DEFAULT 0,
    OriginalPrice   DECIMAL(18,2) NULL,
    Duration        INT NOT NULL DEFAULT 1,          -- Days
    MaxGroupSize    INT NOT NULL DEFAULT 15,
    AvailableSeats  INT NOT NULL DEFAULT 15,
    DestinationId   INT NOT NULL REFERENCES Destinations(Id) ON DELETE NO ACTION,
    TourGuideId     INT NULL REFERENCES TourGuides(Id) ON DELETE SET NULL,
    ImageUrl        NVARCHAR(500) NULL,
    Category        NVARCHAR(50) NULL,               -- 'beach','cultural','nature','hill'
    DifficultyLevel NVARCHAR(50) NULL DEFAULT 'Easy', -- 'Easy','Moderate','Hard'
    Inclusions      NVARCHAR(MAX) NULL,              -- JSON array
    Exclusions      NVARCHAR(MAX) NULL,              -- JSON array
    Itinerary       NVARCHAR(MAX) NULL,              -- JSON array of days
    IsFeatured      BIT NOT NULL DEFAULT 0,
    IsActive        BIT NOT NULL DEFAULT 1,
    AverageRating   DECIMAL(3,2) NOT NULL DEFAULT 5.00,
    TotalReviews    INT NOT NULL DEFAULT 0,
    CreatedAt       DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt       DATETIME2 NULL
);
GO

-- ============================================================
-- Package Images Table
-- ============================================================
CREATE TABLE PackageImages (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    PackageId INT NOT NULL REFERENCES Packages(Id) ON DELETE CASCADE,
    ImageUrl  NVARCHAR(500) NOT NULL,
    Caption   NVARCHAR(200) NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Bookings Table
-- ============================================================
CREATE TABLE Bookings (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    BookingId        NVARCHAR(20) NOT NULL UNIQUE,    -- e.g. TL-2026-00001
    UserId           INT NOT NULL REFERENCES Users(Id) ON DELETE NO ACTION,
    PackageId        INT NOT NULL REFERENCES Packages(Id) ON DELETE NO ACTION,
    FullName         NVARCHAR(200) NOT NULL,
    Email            NVARCHAR(256) NOT NULL,
    PhoneNumber      NVARCHAR(20) NOT NULL,
    Country          NVARCHAR(100) NOT NULL,
    PassportOrNIC    NVARCHAR(50) NULL,
    NumberOfAdults   INT NOT NULL DEFAULT 1,
    NumberOfChildren INT NOT NULL DEFAULT 0,
    TravelDate       DATETIME2 NOT NULL,
    PickupLocation   NVARCHAR(200) NULL,
    SpecialRequests  NVARCHAR(MAX) NULL,
    TotalPrice       DECIMAL(18,2) NOT NULL,
    Status           NVARCHAR(20) NOT NULL DEFAULT 'Pending', -- 'Pending','Confirmed','Cancelled','Completed'
    PaymentStatus    NVARCHAR(20) NOT NULL DEFAULT 'Unpaid',  -- 'Unpaid','Paid','Refunded'
    Notes            NVARCHAR(MAX) NULL,
    CreatedAt        DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt        DATETIME2 NULL
);
GO

-- ============================================================
-- Reviews Table
-- ============================================================
CREATE TABLE Reviews (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    UserId    INT NOT NULL REFERENCES Users(Id) ON DELETE NO ACTION,
    PackageId INT NOT NULL REFERENCES Packages(Id) ON DELETE CASCADE,
    BookingId INT NULL REFERENCES Bookings(Id) ON DELETE SET NULL,
    Rating    INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Title     NVARCHAR(200) NULL,
    Comment   NVARCHAR(MAX) NULL,
    IsVerified BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Wishlists Table
-- ============================================================
CREATE TABLE Wishlists (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    UserId    INT NOT NULL REFERENCES Users(Id) ON DELETE CASCADE,
    PackageId INT NOT NULL REFERENCES Packages(Id) ON DELETE CASCADE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT UQ_Wishlist_User_Package UNIQUE (UserId, PackageId)
);
GO

-- ============================================================
-- Notifications Table
-- ============================================================
CREATE TABLE Notifications (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    UserId    INT NOT NULL REFERENCES Users(Id) ON DELETE CASCADE,
    Title     NVARCHAR(200) NOT NULL,
    Message   NVARCHAR(MAX) NOT NULL,
    Type      NVARCHAR(50) NULL DEFAULT 'Info', -- 'Info','Success','Warning','Error'
    IsRead    BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Blogs Table
-- ============================================================
CREATE TABLE Blogs (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Title       NVARCHAR(300) NOT NULL,
    Slug        NVARCHAR(300) NOT NULL UNIQUE,
    Content     NVARCHAR(MAX) NULL,
    Excerpt     NVARCHAR(500) NULL,
    ImageUrl    NVARCHAR(500) NULL,
    AuthorId    INT NULL REFERENCES Users(Id) ON DELETE SET NULL,
    IsPublished BIT NOT NULL DEFAULT 0,
    PublishedAt DATETIME2 NULL,
    Tags        NVARCHAR(500) NULL,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ============================================================
-- Useful Indexes
-- ============================================================
CREATE INDEX IX_Packages_DestinationId ON Packages(DestinationId);
CREATE INDEX IX_Packages_IsFeatured ON Packages(IsFeatured);
CREATE INDEX IX_Packages_IsActive ON Packages(IsActive);
CREATE INDEX IX_Bookings_UserId ON Bookings(UserId);
CREATE INDEX IX_Bookings_PackageId ON Bookings(PackageId);
CREATE INDEX IX_Bookings_Status ON Bookings(Status);
CREATE INDEX IX_Bookings_TravelDate ON Bookings(TravelDate);
CREATE INDEX IX_Reviews_PackageId ON Reviews(PackageId);
GO

PRINT 'TravelEaseLK database schema created successfully!';
GO
