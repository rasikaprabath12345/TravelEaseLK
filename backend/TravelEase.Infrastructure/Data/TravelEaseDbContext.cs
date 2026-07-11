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
            entity.HasIndex(e => e.IsActive);
            entity.HasIndex(e => e.IsFeatured);
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
            entity.HasIndex(e => e.Status);
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

        // Blog
        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.IsPublished);
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
    }
}
