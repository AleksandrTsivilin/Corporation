using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var products = new List<Product>
            {
                new Product{Id=1, Title="product 1", Count=3.5},
                new Product{Id=1, Title="product 2", Count=500},
                new Product{Id=1, Title="product 3", Count=80.4},
                new Product{Id=1, Title="product 4", Count=0.5}
            };
            return Ok(products);
        }
    }

    //template 
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Count { get; set; }
    }
}
