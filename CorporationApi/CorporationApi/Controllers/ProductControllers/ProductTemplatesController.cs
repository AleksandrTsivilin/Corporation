﻿using CorporationApi.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models.ProductModels;
using Repositories.Specifications;
using Services.IdentityUserServices;
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
        public async Task<IActionResult> GetProductsByAccess()
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
            return Ok();
        }



        private IdentityUserModel GetIdentityInfo(string key)
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, key);
        }
    }
}
