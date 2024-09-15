using virtual_library.Models;
using Microsoft.EntityFrameworkCore;

namespace virtual_library;
public class DBContext : DbContext
{
  public DBContext(DbContextOptions<DBContext> options) : base(options) { }

  public DbSet<Authors> Authors { get; set; }
  public DbSet<Basket> Basket { get; set; }
  public DbSet<Books> Books { get; set; }
  public DbSet<Orders> Orders { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Basket>()
    .HasKey(b => new { b.order_id, b.book_id });
  }
}