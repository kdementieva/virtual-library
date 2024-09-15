using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace virtual_library.Models;
[Table("books")]
public class Books
{
  [Key]
  public int id { get; set; }
  public string? title { get; set; }
  public string? description { get; set; }
  public decimal price { get; set; }
  public string? img { get; set; }
  public int author_id { get; set; }
  [ForeignKey("author_id")]
  public Authors? author { get; set; }
}