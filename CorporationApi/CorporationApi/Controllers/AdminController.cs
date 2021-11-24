using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public IActionResult GetUsersByUser()
        {
            var permissions1 = new List<Permission>
            {
                new Permission { Title="create"},
                new Permission { Title="read"}

            };
            var roles1 = new List<Role>
            {
                new Role{Title="AdminManager",Permissions=permissions1}
            };

            var userInfos = new List<UserInfo>{
                new UserInfo
                {
                    Id=1,
                    Username="VasyaUser",
                    Firstname="Vasya",
                    Roles=roles1
                    
                },
                new UserInfo
                {
                    Id=2,
                    Username="OlegUser",
                    Firstname="Oleg",
                    Roles=roles1
                }


            };

            return Ok(userInfos);
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
        public ICollection<Role> Roles { get; set; }        
    }

    public class Role
    {
        public string Title { get; set; }
        public ICollection< Permission> Permissions { get; set; }
    }

    public class Permission
    {
        public string Title { get; set; }
    }
}
