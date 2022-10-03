using CorporationApi.Filters;
using Microsoft.AspNetCore.Http;
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
            var result = await _service.Add(filter,identityInfo);
            return Ok(result);
        }

        [HttpGet("ById")]
        public async Task<IActionResult> GetById(int id)
        {
            var identity = GetIdentityInfo("ProductManager");
            var template = await _service.GetById(id, identity);

            return Ok(template);
            //testc code 

            //if (id == 5) return Ok(null);

            //return id % 2 == 0 
            //    ? Ok(new ProductTemplateModel 
            //    {
            //        Id = 5,
            //        Title = "template 11",
            //        IsOwner = true,
            //        Owner = "Vasya",
            //        Criteria  = new ProductCriteria
            //        {
            //            RegionId = 1,
            //            FactoryId = 0,
            //            StorageId = 0,
            //            ManufacturerId = 0,
            //            CategoryId = 0,
            //            UnitId = 0,
            //            StartCount = 0,
            //            EndCount = 150,
            //            StartPrice = 1000,
            //            EndPrice = 7400
            //        }

            //    })
            //    : Ok(new ProductTemplateModel {
            //        Id = 5,
            //        Title = "template 11",
            //        IsOwner = false,
            //        Owner = "Vasya",
            //        Criteria = new ProductCriteria
            //        {
            //            RegionId = 1,
            //            FactoryId = 0,
            //            StorageId = 0,
            //            ManufacturerId = 0,
            //            CategoryId = 0,
            //            UnitId = 0,
            //            StartCount = 0,
            //            EndCount = 150,
            //            StartPrice = 1000,
            //            EndPrice = 7400
            //        }
            //    });
            //return Ok();
        }

        [HttpGet("detail")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var template = await _service.GetDetail(id);
            return Ok(template);
        }


        private IdentityUserModel GetIdentityInfo(string key)
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, key);
        }
    }
}
