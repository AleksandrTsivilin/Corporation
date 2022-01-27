using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.EmployeeServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers.EmployeeControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _service;
        public EmployeeController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet("employeeTitle")]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await Task.Run(() => _service.GetEmployeesShort());

            return Ok(employees);
        }

        [HttpGet("nonUser")]
        public async Task<IActionResult> GetEmployeesNonUser()
        {
            var employees = await _service.GetEmployeesNonUser();

            return Ok(employees);
        }
    }
}
