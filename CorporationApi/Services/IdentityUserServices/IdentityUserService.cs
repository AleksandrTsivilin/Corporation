using DataBase.Entities.UserEntities;
using Newtonsoft.Json;
using Repositories.Models.IdentityUserModels;
using Repositories.Specifications;

using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.IdentityUserServices
{
    public class IdentityUserService : IIdentityUserService
    {
        public IdentityUserModel GetIdentity(ClaimsIdentity claims, string role)
        {
            string access = GetAccessUser(claims, role);


            var userLocation = GetLocationUser(claims);
            int? userId = GetUserId(claims);
            return userId is null
                ? null
                : new IdentityUserModel
                {
                    UserId = (int)userId,
                    Access = access,
                    Location = userLocation
                };
        }

        private UserLocation GetLocationUser(ClaimsIdentity identity)
        {
            var department = identity.FindFirst("department")?.Value;
            var factory = identity.FindFirst("factory")?.Value;
            var region = identity.FindFirst("region")?.Value;
            return new UserLocation
            {
                RegionId = int.Parse(region),
                FactoryId = int.Parse(factory),
                DepartmentId = int.Parse(department)
            };
        }

        private string GetAccessUser(ClaimsIdentity identity, string role)
        {
            if (identity is null) return null;
            var avaiablesStringRaw = identity.FindFirst("avaiables")?.Value;

            if (avaiablesStringRaw is null) return null;

            var avaiables = JsonConvert.DeserializeObject<List<AvaiableUserModel>>(avaiablesStringRaw);
            var avaiable = avaiables.FirstOrDefault(avaiable => avaiable.Role.Title == role);
            var access = avaiable.Access.Title;

            return access;
        }
        private int? GetUserId(ClaimsIdentity claims)
        {
            var idString = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var id = 0;
            return int.TryParse(idString, out id)
                ? id
                : null;
        }
    }
}
