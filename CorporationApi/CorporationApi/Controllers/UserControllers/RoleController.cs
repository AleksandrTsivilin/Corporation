using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.UserServices.RoleServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _service;
        public RoleController(IRoleService service)
        {
            _service = service;
        }

        [HttpGet("role")]
        public async Task<IActionResult> GetRoles()
        {

            var roles = await Task.Run(() => _service.GetRoles());

            return Ok(roles);
           
        }
    }
}
