﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Specifications;
using Services.IdentityUserServices;
using Services.ProductServices.FactoryServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactoryController : ControllerBase
    {
        private readonly IFactoryService _service;
        private readonly IIdentityUserService _identityService;

        public FactoryController(
            IFactoryService service,
            IIdentityUserService identityService)
        {
            _service = service;
            _identityService = identityService;
        }
        [HttpGet("ByAccess")]
        public async Task<IActionResult> Get()
        {
            var identity = GetIdentityInfo();
            var factories = await Task.Run(() => _service.GetFactoryByAccess(identity));
            return Ok(factories);
        }

        [HttpGet("ByRegionId")]
        public async Task<IActionResult> GetByRegionId(int id)
        {
            var factories = await Task.Run(() => _service.GetFactoryByRegion(id));
            return Ok(factories);
        }

        [HttpGet("ById")]
        public async Task<IActionResult> GetById(int id)
        {
            var factory = await _service.GetById(id);
            return Ok(factory);
        }



        private IdentityUserModel GetIdentityInfo()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, "ProductManager");
        }
    }
}
