using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelEase.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentStatusAndSlip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentSlipUrl",
                table: "Bookings",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentStatus",
                table: "Bookings",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "Unpaid");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Country", "CreatedAt", "PasswordHash" },
                values: new object[] { null, new DateTime(2026, 7, 9, 7, 3, 16, 109, DateTimeKind.Utc).AddTicks(3696), "$2a$11$BmAgerJK.0tE7zdfo2HNl.uX5N8czR9WQv6yayxgk4KSGcApqowaW" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PaymentSlipUrl",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "Bookings");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 7, 7, 16, 25, 54, 387, DateTimeKind.Utc).AddTicks(6244), "$2a$11$GM5qzRjxwEMVmBT7iASD/ejtpcZJP5IdlXCjDf0cZtfobrGqbhauS" });
        }
    }
}
