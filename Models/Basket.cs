using System.ComponentModel.DataAnnotations.Schema;

namespace virtual_library.Models;
[Table("basket")]
public class Basket
{
  public int order_id { get; set; }
  public int book_id { get; set; }
  public int amount { get; set; }
}