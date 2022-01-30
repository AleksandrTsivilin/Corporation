using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.IdentityUserServices;
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
        private readonly IIdentityUserService _identityService;
        public UserController(
            IUserService service,
            IIdentityUserService identityUserService)
        {
            _service = service;
            _identityService = identityUserService;
        }

        [HttpGet("byAccess")]
        public async Task<IActionResult> Get()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            var identityInfo = _identityService.GetIdentity(claims, "UserManager");
            var users = await _service.GetByAccess(identityInfo);
            return Ok(users);
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

        //private int? GetUserId()
        //{
        //    var identity = HttpContext.User.Identity as ClaimsIdentity;
        //    var idString = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    var id = 0;
        //    return int.TryParse(idString, out id)
        //        ? id
        //        : null;
        //}
    }
}
