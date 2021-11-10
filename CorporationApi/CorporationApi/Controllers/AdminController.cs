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
        [HttpGet("permissions")]
        public IActionResult GetPermissionsByUser(int userId)
        {
            var permissions = new string[] { "create", "read", "delete", "update" };
            return Ok( new { p=permissions});
        }

        [HttpGet("registrationData")]
        public IActionResult GetRegistrationData(int userId)
        {
            var departmentsOfUser = new string[] { "dep 1", "dep 2" };
            var allRoles = new string[] {"adminManager","productManager"};
            var allPermissions = new string[] { "create", "read", "update", "delete" };
            var accessOfUser = new string[] { "full", "region", "factory", "department" };
            return Ok(new { 
                departments=departmentsOfUser,
                roles=allRoles,
                permissions=allPermissions,
                access=accessOfUser
            });
        }

        [HttpPost("addUser")]
        public IActionResult AddUser(RegistrationModel model)
        {
            return Ok();
        }

        [HttpGet("access")]
        public IActionResult GetAccessByUser(int userId)
        {
            var accessOfUser = new string[] { "full", "region", "factory", "department" };
            return Ok(new { access = accessOfUser });
        }

        [HttpGet("users")]
        public IActionResult GetUsersByUser()
        {
            var users = new string[] { "vasya", "petya", "oleg" };
            return Ok(new { users = users });
        }
    }

    public class RegistrationModel
    {
        public string FirstName { get; set; }
        public string Username { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public string[] Permissions { get; set; }
        public string[] Access { get; set; }
    }
}
