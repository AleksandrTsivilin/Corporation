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

        [HttpGet("ByUser")]
        public async Task<IActionResult> GetProductsByUser(int id)
        {
            var identity = GetIdentityInfo();
            var products = await _service.GetProductsByUser(identity);
            return Ok(products);
        }

        [HttpPost("ByFilter")]
        public async Task<IActionResult> GetProductsByFilter([FromForm]FilterProductModel filter)
        {
            //Console.WriteLine(filter.RegionId);
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            var identityInfo = _identityService.GetIdentity(claims, "ProductManager");
            var products = await _service.GetByFilter(filter,identityInfo);
            return Ok(products);
        }

        private IdentityUserModel GetIdentityInfo()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, "ProductMovementManager");
        }
    }
}
