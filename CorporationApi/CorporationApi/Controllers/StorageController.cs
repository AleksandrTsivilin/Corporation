using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Specifications;
using Services.IdentityUserServices;
using Services.ProductServices.StoragesService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly IStorageService _service;
        private readonly IIdentityUserService _identityService;
        public StorageController(
            IStorageService service,
            IIdentityUserService identityUserService)
        {
            _service = service;
            _identityService = identityUserService;
        }
        [HttpGet("storage")]
        public async Task<IActionResult> GetStorage()
        {
            var storages = await Task.Run(() => _service.GetStorages());
            return Ok(storages);
        }

        [HttpGet("ByUser")]
        public async Task<IActionResult> GetByUser()
        {
            var identity = GetIdentityInfo();
            var storage = await Task.Run(() => _service.GetStorageByUser(identity));
            return Ok(storage);
        }

        [HttpGet("ByAccess")]
        public async Task<IActionResult> Get()
        {
            var identity = GetIdentityInfo();
            var storage = await Task.Run(() => _service.GetStorageByAccess(identity));
            return Ok(storage);
        }

        private IdentityUserModel GetIdentityInfo()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, "ProductManager");
        }


    }
}
