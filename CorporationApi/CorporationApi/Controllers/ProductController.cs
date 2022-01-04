﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductService;
using Services.ProductServices.ProductService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader] string access)
        {
            var product = await Task.Run(() => _service.GetProductsByAccess(access));
            return Ok(product);
        }

        [HttpGet("productsByUser")]
        public IActionResult GetProductsByUser(int id)
        {
            var products = _service.GetProductsByUser(id);
            return Ok(products);
        }

        //[HttpGet("manufacturer")]
        //public IActionResult GetManufacturers()
        //{
        //    var manufacturers = _service.GetManufacturers();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("category")]
        //public IActionResult GetCategories()
        //{
        //    var manufacturers = _service.GetCategories();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("unit")]
        //public IActionResult GetUnits()
        //{
        //    var manufacturers = _service.GetUnits();
        //    return Ok(manufacturers);
        //}

        //[HttpGet("storage")]
        //public IActionResult GetStorages()
        //{
        //    var storages = _service.GetStorages();
        //    return Ok(storages);
        //}

        //[HttpGet("storageByUser")]
        //public IActionResult GetStorageByUser(int userId)
        //{
        //    var storage = _service.GetStorageByUser(userId);
        //    return Ok(storage);
        //}


    }
}
