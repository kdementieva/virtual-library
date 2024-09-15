using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace virtual_library.Models;
[Table("orders")]
public class Orders
{
  [Key]
  public int id { get; set; }
  public decimal? sum { get; set; }
  public bool payment_status { get; set; }
  public string? firstname { get; set; }
  public string? lastname { get; set; }
  public string? email { get; set; }
  public string? phone_number { get; set; }
  public string? city { get; set; }
  public string? address { get; set; }
  public string? postal_code { get; set; }
  public string? house_number { get; set; }
  public string? flat_number { get; set; }
  public string? payment_method { get; set; }
}