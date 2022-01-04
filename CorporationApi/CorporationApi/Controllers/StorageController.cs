using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ProductServices.StoragesService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly IStorageService _service;
        public StorageController(IStorageService service)
        {
            _service = service;
        }
        [HttpGet("storage")]
        public async Task<IActionResult> GetStorage()
        {
            var storages = await Task.Run(() => _service.GetStorages());
            return Ok(storages);
        }

        [HttpGet("storageByUser")]
        public async Task<IActionResult> GetStorageByUser([FromHeader] int userId)
        {
            var storage = await Task.Run(() => _service.GetStorageByUser(userId));
            return Ok(storage);
        }

        [HttpGet("storageByAccess")]
        public async Task<IActionResult> GetStorageByAccess([FromHeader] string access)
        {
            var storage = await Task.Run(() => _service.GetStorageByAccess(access));
            return Ok(storage);
        }


    }
}
