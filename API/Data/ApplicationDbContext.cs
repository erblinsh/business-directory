using Microsoft.EntityFrameworkCore;
using server.models;
using server.Models;

namespace server.data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Business> Businesses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(255);
            });

            modelBuilder.Entity<Business>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Category)
                      .WithMany()
                      .HasForeignKey(e => e.CategoryId)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);
            });




            // Initial, manual data seeding

            modelBuilder.Entity<Category>().HasData(
               new Category
               {
                   Id = 1,
                   Name = "Royal Business",
                   Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
               },
                new Category
                {
                    Id = 2,
                    Name = "E-commerce Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                }
           );


            modelBuilder.Entity<Business>().HasData(
                new Business
                {
                    Id = 1,
                    Name = "Royal Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "123 Main St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://images.blob.core.windows.net/blueBusinessimages/Business3.jpg",
                    Email = "info@example.com",
                    CategoryId = 1,
                },
                new Business
                {
                    Id = 2,
                    Name = "Premium Pool Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "456 Elm St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://images.blob.core.windows.net/blueBusinessimages/Business1.jpg",
                    Email = "info@example.com",
                    CategoryId = 1,
                },
                new Business
                {
                    Id = 3,
                    Name = "Luxury Pool Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "789 Oak St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://images.blob.core.windows.net/blueBusinessimages/Business4.jpg",
                    Email = "info@example.com",
                    CategoryId = 1,
                },
                new Business
                {
                    Id = 4,
                    Name = "Diamond Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "101 Diamond St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://images.blob.core.windows.net/blueBusinessimages/Business5.jpg",
                    Email = "info@example.com",
                    CategoryId = 2,
                });


        }
    }
}