using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace virtual_library.Models;
[Table("authors")]
public class Authors
{
  [Key]
  public int id { get; set; }
  public string? firstname { get; set; }
  public string? lastname { get; set; }
}