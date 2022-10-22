using CorporationApi.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models.ProductModels;
using Repositories.Specifications;
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
    [RequireRole("ProductManager", "ProductMovementManager")]
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
            var identityInfo = GetIdentityInfo("ProductManager");
            var product = await Task.Run(() => _service.GetProductsByAccess(identityInfo));
            return Ok(product);
        }

        [HttpGet("ByUser")]
        public async Task<IActionResult> GetProductsByUser(int id)
        {
            var identity = GetIdentityInfo("ProductMovementManager");
            var products = await _service.GetProductsByUser(identity);
            return Ok(products);
        }

        [HttpPost("ByFilter")]
        public async Task<IActionResult> GetProductsByFilter([FromForm]FilterProductModel filter)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var products = await _service.GetByFilter(filter,identityInfo);
            return Ok(products);
        }

        [HttpGet("filterByTitle")]
        public async Task<IActionResult> GetProductsByFilterByTitle(string title)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var products = await _service.GetByFilterByTitle(title, identityInfo);
            return Ok(products);
        }

        [HttpGet("ById")]
        public async Task<ActionResult> GetById(int id)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var product = await _service.GetById(id, identityInfo);
            return Ok(product);
        }

        private IdentityUserModel GetIdentityInfo(string key)
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, key);
        }
    }
}
