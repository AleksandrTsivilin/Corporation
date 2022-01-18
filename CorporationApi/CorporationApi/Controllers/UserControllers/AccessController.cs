using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.UserServices.AccessServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly IAccessService _service;
        public AccessController(IAccessService service)
        {
            _service = service;
        }

        [HttpGet("access")]
        public async Task<IActionResult> GetAccesses()
        {

            var accesses = await Task.Run(() => _service.GetAccesses());

            return Ok(accesses);

        }
    }
}
