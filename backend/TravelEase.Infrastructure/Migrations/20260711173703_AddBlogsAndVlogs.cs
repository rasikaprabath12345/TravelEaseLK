using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TravelEase.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBlogsAndVlogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentSlipUrl",
                table: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentStatus",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldDefaultValue: "Unpaid");

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Blogs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Blogs",
                columns: new[] { "Id", "Author", "Content", "CreatedAt", "Excerpt", "ImageUrl", "IsPublished", "PublishedDate", "Tags", "Title", "UpdatedAt", "VideoUrl" },
                values: new object[,]
                {
                    { 1, "TravelEase Guide", "Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance that is dominated by a massive column of rock around 180 metres (590 ft) high.\n\nAccording to the ancient Sri Lankan chronicle the Culavamsa, this area was a large forest, then after storms and landslides it became a hill and was selected by King Kashyapa (477 – 495 AD) for his new capital. He built his palace on the top of this rock and decorated its sides with colourful frescoes. On a small plateau about halfway up the side of this rock he built a gateway in the form of a enormous lion. The name of this place is derived from this structure — Sīhāgiri, the Lion Rock.\n\nThe capital and the royal palace were abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Sigiriya today is a UNESCO listed World Heritage Site. It is one of the best preserved examples of ancient urban planning.", new DateTime(2026, 7, 10, 10, 0, 0, 0, DateTimeKind.Utc), "Explore the eighth wonder of the world, Sigiriya Rock Palace, a grand mountaintop fortress built by King Kashyapa in the 5th century.", "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80", true, new DateTime(2026, 7, 10, 10, 0, 0, 0, DateTimeKind.Utc), "[\"Palace\",\"Sigiriya\",\"Heritage\",\"Vlog\"]", "Sigiriya: The Magnificent Lion Rock Palace in the Clouds", null, "https://www.youtube.com/watch?v=8M0L-V1yRz4" },
                    { 2, "TravelEase Guide", "The Royal Palace of Kandy in Kandy, Sri Lanka, was the royal residence of the Sri Lankan monarchy of the Kingdom of Kandy. The last king to reside in it was King Sri Vikrama Rajasinha (1798–1815). It was constructed by King Wickramabahu III (1356-1374) and subsequent kings added modifications.\n\nOriginally, the palace complex consisted of several buildings, including the Temple of the Tooth (Sri Dalada Maligawa), which holds the Sacred Tooth Relic of the Buddha. The palace is situated next to the Udawattakele Sanctuary forest reserve, providing a scenic backdrop to the historical site.\n\nThe palace architecture features traditional Kandyan design with intricately carved wooden pillars, beautiful murals, and clay tile roofs. Today, the palace complex serves as a museum displaying Kandyan royal regalia, jewelry, weapons, and tools of the era, standing as a proud symbol of the last independent kingdom of Sri Lanka.", new DateTime(2026, 7, 9, 14, 30, 0, 0, DateTimeKind.Utc), "Discover the history and architecture of Kandy Royal Palace, the last royal residence of the independent Kings of Sri Lanka.", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", true, new DateTime(2026, 7, 9, 14, 30, 0, 0, DateTimeKind.Utc), "[\"Palace\",\"Kandy\",\"History\",\"Vlog\"]", "The Royal Palace of Kandy: The Last Kingdom's Heart", null, "https://www.youtube.com/watch?v=H74S9nL4bU0" },
                    { 3, "TravelEase Guide", "The Royal Palace of King Parakramabahu I in Polonnaruwa is an extraordinary monument of medieval Sri Lankan engineering and architecture. Built during the 12th century, this palace was originally named 'Vaijayanta Prasada' (named after the palace of God Indra) and was described as a seven-story building with 1,000 chambers.\n\nToday, only the massive brick walls of the first three levels remain standing, showcasing the immense thickness of the walls designed to support wood-and-mortar upper floors. The ruins are surrounded by a well-planned garden, courtrooms, a bathing pool (Kumara Pokuna), and assembly halls.\n\nVisitors to the site can explore the grand entrance stairs flanked by guard stones, the royal assembly hall with carved elephant reliefs, and the intricate drainage and water supply systems that were state-of-the-art for the 12th century. It is a key highlight of the Polonnaruwa Ancient City World Heritage Site.", new DateTime(2026, 7, 8, 9, 15, 0, 0, DateTimeKind.Utc), "A testament to medieval engineering, explore the ruins of King Parakramabahu's grand 7-story palace in Polonnaruwa.", "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80", true, new DateTime(2026, 7, 8, 9, 15, 0, 0, DateTimeKind.Utc), "[\"Palace\",\"Polonnaruwa\",\"Archaeology\",\"Vlog\"]", "The Seven-Story Royal Palace of Polonnaruwa", null, "https://www.youtube.com/watch?v=3R-zK30e37Y" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 7, 11, 17, 37, 2, 736, DateTimeKind.Utc).AddTicks(5740), "$2a$11$L1ZerYtYQZFd6f283/Nec.Sv4LHrPHi3blyybd8JyfLLeNd.wQP/." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Blogs");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentStatus",
                table: "Bookings",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "Unpaid",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "PaymentSlipUrl",
                table: "Bookings",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 7, 9, 7, 3, 16, 109, DateTimeKind.Utc).AddTicks(3696), "$2a$11$BmAgerJK.0tE7zdfo2HNl.uX5N8czR9WQv6yayxgk4KSGcApqowaW" });
        }
    }
}
