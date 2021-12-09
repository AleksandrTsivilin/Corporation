using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductService;
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
        private readonly IProductService _service;
        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var products = _service.Get();
            return Ok(products);
        }

        [HttpGet("manufacturer")]
        public IActionResult GetManufacturers()
        {
            var manufacturers = _service.GetManufacturers();
            return Ok(manufacturers);
        }

        [HttpGet("category")]
        public IActionResult GetCategories()
        {
            var manufacturers = _service.GetCategories();
            return Ok(manufacturers);
        }

        [HttpGet("unit")]
        public IActionResult GetUnits()
        {
            var manufacturers = _service.GetUnits();
            return Ok(manufacturers);
        }


    }
}
