﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductServices.CategoriesService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductController : ControllerBase
    {
        private readonly ICategoryService _service;
        public CategoryProductController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var categories =await Task.Run(() => _service.GetCategories());
            return Ok(categories);
        }

        [HttpGet("ById")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _service.GetById(id);
            return Ok(category);
        }
    }
}
