using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.UserServices.PermissionServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _service;
        public PermissionController(IPermissionService service)
        {
            _service = service;
        }

        [HttpGet("permission")]
        public async Task<IActionResult> GetPermission()
        {

            var permissions = await Task.Run(() => _service.GetPermissions());

            return Ok(permissions);

        }
    }

}
