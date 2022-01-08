using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.AuthServices;
using Services.Models;
using Services.UserServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthTokenController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IAuthService _authService;


        public AuthTokenController
            (IUserService service, IAuthService authService)
        {
            _service = service;
            _authService = authService;

        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _service
                .TryGetUser(model);

            if (user is null)
                return Unauthorized();

            var encodedJwt = _authService.CreateJWT(user);

            return Ok(new { token = encodedJwt });
        }
    }
}
