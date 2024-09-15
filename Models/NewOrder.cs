using System.ComponentModel.DataAnnotations;

namespace virtual_library.Models;
public class NewOrder
{
  public bool payment_status { get; set; } = false;
  [Required]
  [MaxLength(20)]
  public string? firstname {get; set;}
  [Required]
  [MaxLength(30)]
  public string? lastname {get; set;}
  [Required]
  [MaxLength(50)]
  public string? email {get; set;}
  [Required]
  [MaxLength(9)]
  public string? phone_number {get; set;}
  [Required]
  [MaxLength(30)]
  public string? city {get; set;}
  [Required]
  [MaxLength(50)]
  public string? address {get; set;}
  [Required]
  [MaxLength(6)]
  public string? postal_code {get; set;}
  [Required]
  [MaxLength(10)]
  public string? house_number { get; set; }
  [Required]
  [MaxLength(10)]
  public string? flat_number { get; set; }
  [Required]
  [MaxLength(30)]
  public string? payment_method { get; set; }
  public List<NewBookInOrder>? books {get; set;}
}