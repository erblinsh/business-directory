using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.models;
using server.Models;

namespace server.data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<LocalUser> LocalUsers { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Review> Reviews { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
                    Name = "Amazon",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "123 Main St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://www.reviewjournal.com/wp-content/uploads/2022/06/16537994_web1_CV-AMAZON-SAFETY-JUL31-2006.jpg?w=1200",
                    Email = "info@example.com",
                    CategoryId = 2,
                },
                new Business
                {
                    Id = 2,
                    Name = "Premium Pool Business",
                    Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                    Address = "456 Elm St",
                    PhoneNumber = "123-456-7890",
                    WebsiteUrl = "http://www.example.com",
                    ImageUrl = "https://q-xx.bstatic.com/xdata/images/hotel/max500/329992678.jpg?k=fe3855f54cf70a0f7e452f086a8b7cd9f92e7a3d6c6bb6cedc5fe315f6abf838&o=",
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
                    ImageUrl = "https://suncoroutdoors.com/wp-content/uploads/2021/08/1_Suncor-Outdoors_How-to-Build-a-Luxury-Pool-to-Complete-Your-Backyard_IMAGE1-1.jpg",
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
                    ImageUrl = "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFoOuScGuZsA/v1/-1x-1.jpg",
                    Email = "info@example.com",
                    CategoryId = 2,
                });

        }
    }
}