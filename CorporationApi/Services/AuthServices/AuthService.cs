using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Services.Models.UserModels;
using Services.Models.UserModels.UserModel;
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
            var userLocation = CreateUserLocationClaims(model);

            var avaiablesClaims = new List<Claim>();
            avaiablesClaims.Add(new Claim("avaiables", JsonConvert.SerializeObject(model.Avaiables)));
            return userClaim
                .Concat(avaiablesClaims).ToList()
                .Concat(userLocation).ToList();
        }

        private List<Claim> CreateUserLocationClaims(UserModel model)
        {
            return new List<Claim>
            {
                new Claim("department",model.Department.Id.ToString()),
                new Claim("factory",model.Factory.Id.ToString()),
                new Claim("region",model.Region.Id.ToString())

            };
        }

        private List<Claim> CreateUserClaims(UserModel model)
        {
            return new List<Claim>
            {
               new Claim(ClaimTypes.NameIdentifier,model.Id.ToString()),
               new Claim(ClaimTypes.Name,model.Username)
            };
        }

        private JwtSecurityToken SetOptionsToken(List<Claim> claims)
        {
            var now = DateTime.Now;

            return new JwtSecurityToken
            (
                notBefore: now,
                expires: now.AddDays(2),
                claims: claims,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(_configuration["SignignKey"])),
                                SecurityAlgorithms.HmacSha256)

            );

        }
    }
}
