﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductServices.UnitsService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitProductController : ControllerBase
    {
        private readonly IUnitService _service;

        public UnitProductController(IUnitService service)
        {
            _service = service;
        }

        [HttpGet("unit")]
        public async Task<IActionResult> GetUnits()
        {
            var units = await Task.Run(() => _service.GetUnits());
            return Ok(units);
        }
    }
}