using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.IdentityUserServices;
using Services.ProductService;
using Services.ProductServices.ProductService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IIdentityUserService _identityService;
        public ProductController(
            IProductService service,
            IIdentityUserService identityService)
        {
            _service = service;
            _identityService = identityService;
        }

        [HttpGet("productsByAccess")]
        public async Task<IActionResult> GetProductsByAccess()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            var identityInfo = _identityService.GetIdentity(claims, "ProductManager");
            var product = await Task.Run(() => _service.GetProductsByAccess(identityInfo));
            return Ok(product);
        }

        [HttpGet("productsByUser")]
        public IActionResult GetProductsByUser(int id)
        {
            var products = _service.GetProductsByUser(id);
            return Ok(products);
        }


        //[HttpGet("manufacturer")]
        //public IActionResult GetManufacturers()
        //{
        //    var manufacturers = _service.GetManufacturers();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("category")]
        //public IActionResult GetCategories()
        //{
        //    var manufacturers = _service.GetCategories();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("unit")]
        //public IActionResult GetUnits()
        //{
        //    var manufacturers = _service.GetUnits();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("storage")]
        //public IActionResult GetStorages()
        //{
        //    var storages = _service.GetStorages();
        //    return Ok(storages);
        //}

        //[HttpGet("storageByUser")]
        //public IActionResult GetStorageByUser(int userId)
        //{
        //    var storage = _service.GetStorageByUser(userId);
        //    return Ok(storage);
        //}


    }
}
