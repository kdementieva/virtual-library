using Microsoft.AspNetCore.Mvc;
using virtual_library.Models;

namespace virtual_library.Controllers;

[Route("[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
  private readonly DBContext _context;
  public OrdersController(DBContext context)
  {
    _context = context;
  }

  [HttpPost]
  public IActionResult addOrder([FromBody] NewOrder order)
  {
    using (var transaction = _context.Database.BeginTransaction())
    {
      try
      {
        if (ModelState.IsValid)
        {
          decimal sum = 0;

          foreach (var book in order.books)
          {
            var bookToAdd = _context.Books
              .FirstOrDefault(b => b.id == book.id);
            
            if (bookToAdd == null)
            {
              transaction.Rollback();
              BadRequest();
            }

            sum += bookToAdd.price * book.amount;
          }

          var newOrder = new Orders
          {
            sum = sum,
            firstname = order.firstname,
            lastname = order.lastname,
            email = order.email,
            phone_number = order.phone_number,
            city = order.city,
            address = order.address,
            postal_code = order.postal_code,
            house_number = order.house_number,
            flat_number = order.flat_number,
            payment_method = order.payment_method
          };
          _context.Orders.Add(newOrder);
          _context.SaveChanges();

          foreach (var book in order.books)
          {
            var newBookInOrder = new Basket
            {
              order_id = newOrder.id,
              book_id = book.id,
              amount = book.amount
            };
            _context.Basket.Add(newBookInOrder);
            _context.SaveChanges();
          }
          transaction.Commit();
          return NoContent();
        }
        else 
        {
          throw new Exception("Invalid order data");
        }
      }
      catch (Exception ex)
      {
        transaction.Rollback();
        return BadRequest("Failed to create order" + ex.Message);
      }
    }
  }
}