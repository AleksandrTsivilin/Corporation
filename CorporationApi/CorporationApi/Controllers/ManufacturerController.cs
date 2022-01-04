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

        [HttpGet("manufacturer")]
        public async Task<IActionResult> GetManufacturers()
        {
            var manufacturers = await Task.Run(() => _service.GetManufacturers());
            return Ok(manufacturers);
        }
    }
}
