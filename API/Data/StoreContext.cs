
using API.Entities;
using Microsoft.EntityFrameworkCore;
namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
         public DbSet<Basket> Baskets { get; set; }
         // we dont add a sperate BasketItems => we never going to need -----wir werden niemals einzelne Körbe direkt abfragen
    }
}


