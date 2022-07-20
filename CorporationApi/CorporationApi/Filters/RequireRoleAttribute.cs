using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Filters
{
    [AttributeUsage(AttributeTargets.Class)]
    public class RequireRoleAttribute : TypeFilterAttribute
    {
        public RequireRoleAttribute(params string[] roles) : base(typeof(RoleFilter))
        {
            Arguments = new object[] { roles };
        }
    }

    public class RoleFilter : IAuthorizationFilter
    {
        private readonly string[] _roles;

        public RoleFilter(string[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!IsAuthenticated(context))
            {
                context.Result = new UnauthorizedResult();
                return;
            }


            var claims = context.HttpContext.User.Identity as ClaimsIdentity;


            var avaiablesStringRaw = claims.FindFirst("avaiables")?.Value;

            var avaiables = JsonConvert.DeserializeObject<List<AvaiableUserModel>>(avaiablesStringRaw);

            if (!isHasRole(avaiables))
            {
                context.Result = new ForbidResult();
                return;
            }
        }

        private static bool IsAuthenticated(AuthorizationFilterContext context)
        {
            return context.HttpContext.User.Identity.IsAuthenticated;
        }

        private bool isHasRole(List<AvaiableUserModel> avaiables)
        {
            foreach (var avaiable in avaiables)
            {
                if (Array.Exists(_roles, element => element == avaiable.Role.Title)) return true;
            }

            return false;
        }
    }
}
