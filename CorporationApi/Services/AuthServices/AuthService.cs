using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreateJWT(UserModel model)
        {
            var claims = CreateClaims(model);

            var jwt = SetOptionsToken(claims);

            return new JwtSecurityTokenHandler()
                .WriteToken(jwt);
        }

        private List<Claim> CreateClaims(UserModel model)
        {
            var userClaim = CreateUserClaims(model);

            List<Claim> roleClaims = new();
            roleClaims.Add(new Claim("roles", JsonConvert.SerializeObject(model.Roles)));
            //var roles = model.Roles
            //    .SelectMany(r => r.Permissions)
            //    //.Select(r => new Claim("role", r.Title))
            //    .Select(p => new Claim("permission", p.Title));
                //.Select(r => new Claim("title", r.Title, "access", r.RoleAccess.Title));
            //var permissionsClaim = model.Roles
            //    .SelectMany(r => r.Permissions)
            //    .Distinct()
            //    .Select(p => new Claim("permissions", p.PermissionTypeId.ToString()));
            //var rolesClaim = model.Roles
            //    .Select(r => r.Permissions)
            return userClaim.Concat(roleClaims).ToList();//.Concat(rolesClaim).ToList();
        }

        private List<Claim> CreateUserClaims(UserModel model)
        {
            return new List<Claim>
            {
               new Claim(ClaimTypes.NameIdentifier,model.Id.ToString()),
               new Claim(ClaimTypes.Name,model.Firstname)
            };
        }

        private JwtSecurityToken SetOptionsToken(List<Claim> claims)
        {
            var now = DateTime.Now;

            return new JwtSecurityToken
            (
                notBefore: now,
                expires: now.AddMinutes(2),
                claims: claims,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(_configuration["SignignKey"])),
                                SecurityAlgorithms.HmacSha256)

            );

        }
    }
}
