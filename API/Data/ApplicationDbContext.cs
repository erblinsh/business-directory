using Microsoft.AspNetCore.Identity;
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
        //
        public DbSet<LocalUser> ApplicationUsers { get; set; }
        public DbSet<LocalUser> LocalUsers { get; set; }
        //

        public DbSet<Category> Categories { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Review> Reviews { get; set; }


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

            modelBuilder.Entity<LocalUser>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UserName).HasMaxLength(30); 
                entity.Property(e => e.Name).HasMaxLength(30); 
                entity.Property(e => e.Password).HasMaxLength(30); 
                entity.Property(e => e.Role).HasMaxLength(30);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Comment)
                      .HasMaxLength(500);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Business)
                      .WithMany()
                      .HasForeignKey(e => e.BusinessId)
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

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "1",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "2",
                    Name = "User",
                    NormalizedName = "USER"
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


            modelBuilder.Entity<Review>().HasData(
               new Review
               {
                   Id = 1,
                   Rating = 5,
                   Comment = "Very good bsiness!",
                   UserId = 2,
                   BusinessId = 2,
               },
                new Review
                {
                    Id = 2,
                    Rating = 3,
                    Comment = "Average",
                    UserId = 1,
                    BusinessId = 4 ,
                }
            );


        }
    }
}