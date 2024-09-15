using Microsoft.AspNetCore.Mvc;

namespace virtual_library.Controllers;

[Route("[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
  private readonly DBContext _context;
  public BooksController(DBContext context)
  {
    _context = context;
  }
    [HttpGet]
    public IActionResult getBooks()
    {
      var books = _context.Books
      .Select(b => new {
        book_id = b.id,
        book_title = b.title,
        book_description = b.description,
        book_price = b.price,
        book_img = b.img,
        author = new {
          b.author.id,
          b.author.firstname,
          b.author.lastname
        }
      }).ToList();
      return Ok(books);
    }
    
    [HttpGet("{id}")]
    public IActionResult getBookById(int id)
    {
      var book = _context.Books
      .Where(b => b.id == id)
      .Select(b => new {
        book_id = b.id,
        book_title = b.title,
        book_description = b.description,
        book_price = b.price,
        book_img = b.img,
        author = new {
          b.author.id,
          b.author.firstname,
          b.author.lastname
        }
      }).ToList();
      return Ok(book);
    }
}