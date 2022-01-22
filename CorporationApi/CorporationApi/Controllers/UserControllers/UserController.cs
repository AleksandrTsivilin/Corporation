using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.UserServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet("byAccess")]
        public async Task<IActionResult> Get()
        {
            var avaiablesString = GetAvaiables();
            return Ok();
        }

        private List<string> GetAvaiables()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var avaiables = new List<string>();
            if (identity is null) return null;
            var avaiablesStringRaw = identity.FindFirst("avaiables")?.Value;

            if (avaiablesStringRaw is null) return null;
            var avaiablesString = avaiablesStringRaw
                .Substring(1, avaiablesStringRaw.Length - 2);
            avaiables.Add(avaiablesString);
            return avaiables;
        }

        private int? GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var idString = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var id = 0;
            return int.TryParse(idString, out id)
                ? id
                : null;
        }
    }
}
