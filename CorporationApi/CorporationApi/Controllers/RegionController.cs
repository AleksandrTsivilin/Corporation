using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Specifications;
using Services.IdentityUserServices;
using Services.RegionServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly IRegionService _service;
        private readonly IIdentityUserService _identityService;
        public RegionController(
            IRegionService service,
            IIdentityUserService identityUserService)
        {
            _service = service;
            _identityService = identityUserService;
        }
        [HttpGet("ByAccess")]
        public async Task<IActionResult> Get()
        {
            var identity = GetIdentityInfo();
            var regions = await Task.Run(() => _service.GetRegionByAccess(identity));
            return Ok(regions);
        }

        private IdentityUserModel GetIdentityInfo()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, "ProductManager");
        }
    }
}
