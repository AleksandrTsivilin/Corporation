using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductServices.ManufacturerService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerService _service;

        public ManufacturerController(IManufacturerService service)
        {
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var manufacturers = await Task.Run(() => _service.GetManufacturers());
            return Ok(manufacturers);
        }

        [HttpGet("ById")]
        public async Task<IActionResult> GetById(int id)
        {
            var manufacturer = await _service.GetById(id);
            return Ok(manufacturer);
        }
    }
}
