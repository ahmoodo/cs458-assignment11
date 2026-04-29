using Microsoft.EntityFrameworkCore;
using MaintenanceAPI.Models;

namespace MaintenanceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<WorkLog> WorkLogs { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WorkLog>().ToTable("WorkLogs");
            modelBuilder.Entity<Invoice>().ToTable("Invoices");
        }
    }
}
