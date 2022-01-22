using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repositories.Models.UserManagerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        //[HttpGet("permissions")]
        //public IActionResult GetPermissionsByUser(int userId)
        //{
        //    var permissions = new string[] { "create", "read", "delete", "update" };
        //    return Ok(permissions);
        //}

        //[HttpGet("registrationData")]
        //public IActionResult GetRegistrationData(int userId)
        //{
        //    var departmentsOfUser = new string[] { "dep 1", "dep 2" };
        //    var allRoles = new string[] { "adminManager", "productManager" };
        //    var allPermissions = new string[] { "create", "read", "update", "delete" };
        //    var accessOfUser = new string[] { "full", "region", "factory", "department" };
        //    return Ok(new {
        //        departments = departmentsOfUser,
        //        roles = allRoles,
        //        permissions = allPermissions,
        //        access = accessOfUser
        //    });
        //}

        //[HttpPost("addUser")]
        //public IActionResult AddUser(RegistrationModel model)
        //{
        //    return Ok();
        //}

        //[HttpGet("access")]
        //public IActionResult GetAccessByUser(int userId)
        //{
        //    var accessOfUser = new string[] { "full", "region", "factory", "department" };
        //    return Ok(new { access = accessOfUser });
        //}

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersByUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                
                //var a = identity.FindFirst("avaiables");
                //var b = a.Value;
                //var c = b.Remove(0, 1);
                //c = c.Remove(c.Length - 1, 1);
                //var length = c.Length;
                //var jsonObj = JObject.Parse(c);
                //var avaiable = JsonConvert.DeserializeObject<AvaiableUserModel>(c);

                //IEnumerable<Claim> claims = identity.Claims;

            }
            





            

            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int userId)
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult Put(UserInfo model)
        {
            return Ok();
        }
    }

    //public class RegistrationModel
    //{
    //    public string FirstName { get; set; }
    //    public string Username { get; set; }
    //    public string Department { get; set; }
    //    public string Role { get; set; }
    //    public string[] Permissions { get; set; }
    //    public string[] Access { get; set; }
    //}


    public class UserInfo
    {
        public int Id { get; set; }
        public string Username { get; set; } 
        public string Firstname { get; set; } 
        //public ICollection<Role> Roles { get; set; }        
    }

    //public class Role
    //{
    //    public string Title { get; set; }
    //    public ICollection<Permission> Permissions { get; set; }
    //}

    //public class Permission
    //{
    //    public string Title { get; set; }
    //}
}
