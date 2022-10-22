//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using Repositories.Specifications;
using Services.IdentityUserServices;
using Services.ProductServices.ProductTemplatesServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class ProductTemplateHub : Hub
    {
        private readonly IProductTemplatesService _service;
        private readonly IIdentityUserService _identityService;

        public ProductTemplateHub(
            IProductTemplatesService service,
            IIdentityUserService identityService)
        {
            _service = service;
            _identityService = identityService;
        }
       

        public async Task Delete(int id)
        {
            var responce = await _service.Delete(id);
            await SendAll(responce);
        }

        public async Task Update(int id, FilterProductModel filter)
        {
            var responce = await _service.Update(id, filter);
            await SendAll(responce);
        }

        public async Task Add(FilterProductModel filter)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var responce = await _service.Add(filter, identityInfo);
            await Clients.Caller.SendAsync("changed", responce);
        }


        public async Task AddUser(int templateId)
        {
            var identityInfo = GetIdentityInfo("ProductManager");
            var responce = await _service.AddUser(templateId, identityInfo);
            await Clients.Caller.SendAsync("changes", responce);
        }
        //[HttpPost("add")]
        //public async Task<IActionResult> Add(FilterProductModel filter)
        //{
        //    var identityInfo = GetIdentityInfo("ProductManager");
        //    var result = await _service.Add(filter,identityInfo);
        //    return Ok(result);
        //}

        private async Task SendAll(ResponceInfo<int> responce)
        {
            if (responce is null) return;
            await Clients.All.SendAsync("changed", responce);
        }

        private IdentityUserModel GetIdentityInfo(string key)
        {
            //var claims = HttpContext.User.Identity as ClaimsIdentity;
            var claims = Context.User.Identity as ClaimsIdentity;
            return _identityService.GetIdentity(claims, key);

            //return _identityService.GetIdentity(claims, key);
            //return null;
        }

    }
}
