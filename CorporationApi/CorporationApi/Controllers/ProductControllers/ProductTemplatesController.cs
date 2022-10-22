using CorporationApi.Filters;
//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models.ProductModels;
using Repositories.Specifications;
using Services.IdentityUserServices;
using Services.Models.ProductModels;
using Services.Models.ProductModels.ProductTemplateModels;
using Services.ProductServices.ProductTemplatesServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.ProductControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RequireRole("ProductManager")]
    public class ProductTemplatesController : ControllerBase
    {

        private readonly IIdentityUserService _identityService;
        private readonly IProductTemplatesService _service;

        public ProductTemplatesController(
            IIdentityUserService identityService,
            IProductTemplatesService service)
        {
            _identityService = identityService;
            _service = service;
        }

        [HttpGet("byUser")]
        public async Task<IActionResult> Get()
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var templates = await _service.GetByUser(identityInfo);
            return Ok(templates);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(FilterProductModel filter)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var responce = await _service.Add(filter, identityInfo);
            return Ok(responce);
        }

        //[HttpGet("ById")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var identity = GetIdentityInfo("ProductManager");
        //    var template = await _service.GetById(id, identity);

        //    return Ok(template);
        //}

        [HttpGet("detail")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var identity = GetIdentityInfo("ProductManager");
            var template = await _service.GetDetail(id, identity);
            return Ok(template);
        }

        [HttpGet("ByIdWithUsers")]
        public async Task<IActionResult> GetByIdWithUsers(int id)
        {
            var identity = GetIdentityInfo("ProductManager");
            var template = await _service.GetByIdWithUsers(id, identity);
            return Ok(template);
        }

        //[HttpPost("addUser")]
        //public async Task<IActionResult> AddUser(int id)
        //{
        //    var identity = GetIdentityInfo("ProductManager");
        //    var responce = _service.AddUser(id, identity);
        //    return Ok();
        //}

        private IdentityUserModel GetIdentityInfo(string key)
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, key);
        }
    }
}
