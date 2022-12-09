using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }
        //fetch an individual basket => einen einzelnen Korb abrufen
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetreveBasket();
            if (basket == null) return NotFound();
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }


        // add an item to the basket 
        [HttpPost]// api/basket?productId=3&quantity=2 => querystring
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket if not exists create a new basket => get product => add item => save changes
            Basket basket = await RetreveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem saving itm to basket" });
        }


        // remove an item
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket => remove item or reduce quantity => save changes
            Basket basket = await RetreveBasket();
            basket.RemoveItem(productId, quantity);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
        private async Task<Basket> RetreveBasket()
        {
            // 1-identify the basket with cookie
            // 2- get  Basket => get items(basketitems) => get Product
            return await _context.Baskets
                        .Include(i => i.Items).ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }


    }
}