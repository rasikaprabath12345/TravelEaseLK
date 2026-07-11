using Microsoft.EntityFrameworkCore;
using TravelEase.Domain.Entities;

namespace TravelEase.Infrastructure.Data;

public class TravelEaseDbContext : DbContext
{
    public TravelEaseDbContext(DbContextOptions<TravelEaseDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Destination> Destinations => Set<Destination>();
    public DbSet<DestinationImage> DestinationImages => Set<DestinationImage>();
    public DbSet<Package> Packages => Set<Package>();
    public DbSet<PackageImage> PackageImages => Set<PackageImage>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<TourGuide> TourGuides => Set<TourGuide>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<Hotel> Hotels => Set<Hotel>();
    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<Wishlist> Wishlists => Set<Wishlist>();
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
        });

        // Destination
        modelBuilder.Entity<Destination>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Country).IsRequired().HasMaxLength(100);
        });

        // DestinationImage
        modelBuilder.Entity<DestinationImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Destination)
                .WithMany(d => d.Images)
                .HasForeignKey(e => e.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Package
        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.Property(e => e.OriginalPrice).HasColumnType("decimal(18,2)");
            entity.HasOne(e => e.Destination)
                .WithMany(d => d.Packages)
                .HasForeignKey(e => e.DestinationId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.TourGuide)
                .WithMany(g => g.Packages)
                .HasForeignKey(e => e.TourGuideId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // PackageImage
        modelBuilder.Entity<PackageImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Package)
                .WithMany(p => p.Images)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Booking
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.BookingId).IsRequired().HasMaxLength(20);
            entity.HasIndex(e => e.BookingId).IsUnique();
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
            entity.HasOne(e => e.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Package)
                .WithMany(p => p.Bookings)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Review
        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Package)
                .WithMany(p => p.Reviews)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Wishlist
        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.UserId, e.PackageId }).IsUnique();
            entity.HasOne(e => e.User)
                .WithMany(u => u.Wishlists)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Package)
                .WithMany()
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Notification
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Seed Admin User (password: Admin@123)
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@travelease.lk",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = "Admin",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });

        // Seed Palaces Blogs & Vlogs
        modelBuilder.Entity<Blog>().HasData(
            new Blog
            {
                Id = 1,
                Title = "Sigiriya: The Magnificent Lion Rock Palace in the Clouds",
                Content = "Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance that is dominated by a massive column of rock around 180 metres (590 ft) high.\n\nAccording to the ancient Sri Lankan chronicle the Culavamsa, this area was a large forest, then after storms and landslides it became a hill and was selected by King Kashyapa (477 – 495 AD) for his new capital. He built his palace on the top of this rock and decorated its sides with colourful frescoes. On a small plateau about halfway up the side of this rock he built a gateway in the form of a enormous lion. The name of this place is derived from this structure — Sīhāgiri, the Lion Rock.\n\nThe capital and the royal palace were abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Sigiriya today is a UNESCO listed World Heritage Site. It is one of the best preserved examples of ancient urban planning.",
                Excerpt = "Explore the eighth wonder of the world, Sigiriya Rock Palace, a grand mountaintop fortress built by King Kashyapa in the 5th century.",
                ImageUrl = "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80",
                VideoUrl = "https://www.youtube.com/watch?v=8M0L-V1yRz4",
                Author = "TravelEase Guide",
                IsPublished = true,
                PublishedDate = new DateTime(2026, 7, 10, 10, 0, 0, DateTimeKind.Utc),
                Tags = "[\"Palace\",\"Sigiriya\",\"Heritage\",\"Vlog\"]",
                CreatedAt = new DateTime(2026, 7, 10, 10, 0, 0, DateTimeKind.Utc)
            },
            new Blog
            {
                Id = 2,
                Title = "The Royal Palace of Kandy: The Last Kingdom's Heart",
                Content = "The Royal Palace of Kandy in Kandy, Sri Lanka, was the royal residence of the Sri Lankan monarchy of the Kingdom of Kandy. The last king to reside in it was King Sri Vikrama Rajasinha (1798–1815). It was constructed by King Wickramabahu III (1356-1374) and subsequent kings added modifications.\n\nOriginally, the palace complex consisted of several buildings, including the Temple of the Tooth (Sri Dalada Maligawa), which holds the Sacred Tooth Relic of the Buddha. The palace is situated next to the Udawattakele Sanctuary forest reserve, providing a scenic backdrop to the historical site.\n\nThe palace architecture features traditional Kandyan design with intricately carved wooden pillars, beautiful murals, and clay tile roofs. Today, the palace complex serves as a museum displaying Kandyan royal regalia, jewelry, weapons, and tools of the era, standing as a proud symbol of the last independent kingdom of Sri Lanka.",
                Excerpt = "Discover the history and architecture of Kandy Royal Palace, the last royal residence of the independent Kings of Sri Lanka.",
                ImageUrl = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
                VideoUrl = "https://www.youtube.com/watch?v=H74S9nL4bU0",
                Author = "TravelEase Guide",
                IsPublished = true,
                PublishedDate = new DateTime(2026, 7, 9, 14, 30, 0, DateTimeKind.Utc),
                Tags = "[\"Palace\",\"Kandy\",\"History\",\"Vlog\"]",
                CreatedAt = new DateTime(2026, 7, 9, 14, 30, 0, DateTimeKind.Utc)
            },
            new Blog
            {
                Id = 3,
                Title = "The Seven-Story Royal Palace of Polonnaruwa",
                Content = "The Royal Palace of King Parakramabahu I in Polonnaruwa is an extraordinary monument of medieval Sri Lankan engineering and architecture. Built during the 12th century, this palace was originally named 'Vaijayanta Prasada' (named after the palace of God Indra) and was described as a seven-story building with 1,000 chambers.\n\nToday, only the massive brick walls of the first three levels remain standing, showcasing the immense thickness of the walls designed to support wood-and-mortar upper floors. The ruins are surrounded by a well-planned garden, courtrooms, a bathing pool (Kumara Pokuna), and assembly halls.\n\nVisitors to the site can explore the grand entrance stairs flanked by guard stones, the royal assembly hall with carved elephant reliefs, and the intricate drainage and water supply systems that were state-of-the-art for the 12th century. It is a key highlight of the Polonnaruwa Ancient City World Heritage Site.",
                Excerpt = "A testament to medieval engineering, explore the ruins of King Parakramabahu's grand 7-story palace in Polonnaruwa.",
                ImageUrl = "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
                VideoUrl = "https://www.youtube.com/watch?v=3R-zK30e37Y",
                Author = "TravelEase Guide",
                IsPublished = true,
                PublishedDate = new DateTime(2026, 7, 8, 9, 15, 0, DateTimeKind.Utc),
                Tags = "[\"Palace\",\"Polonnaruwa\",\"Archaeology\",\"Vlog\"]",
                CreatedAt = new DateTime(2026, 7, 8, 9, 15, 0, DateTimeKind.Utc)
            }
        );
    }
}
