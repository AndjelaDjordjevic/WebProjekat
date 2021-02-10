using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class HotelContext : DbContext
    {
        public DbSet<Hotel> Hoteli {get; set;} 
        public DbSet<Soba> Sobe {get; set;}
        public DbSet<Racun> Racuni {get; set;}
        public HotelContext(DbContextOptions options) : base(options)
        {

        }
    }
}