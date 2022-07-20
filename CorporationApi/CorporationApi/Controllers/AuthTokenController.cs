using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models.UserManagerModels;
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
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IHttpContextAccessor _accessor;


        public AuthTokenController
            (IUserService userService, IAuthService authService, IHttpContextAccessor accessor)
        {
            _userService = userService;
            _authService = authService;
            _accessor = accessor;

        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userService
                .TryGetUser(model);

            if (user is null)
                return Unauthorized();

            var encodedJwt = _authService.CreateJWT(user);

            createCookieToken(encodedJwt);

            return Ok(new { token = encodedJwt });
        }

        private void createCookieToken(string encodedJwt)
        {
            _accessor.HttpContext.Response.Cookies
                .Append(
                    "tn",
                    encodedJwt,
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None
                    });
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegistrationUser(NewUserWithRegistrationId model)
        {
            var user = await _userService.AddUserWithRegistrationId(model);
            //var user = await _userService
            //    .TryGetUser(model);

            if (user is null)
                return Unauthorized();

            var encodedJwt = _authService.CreateJWT(user);

            return Ok(new { token = encodedJwt });
        }
    }
}
