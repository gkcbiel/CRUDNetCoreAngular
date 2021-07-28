using Microsoft.EntityFrameworkCore;

namespace CrudAPI
{
    public class Context : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}