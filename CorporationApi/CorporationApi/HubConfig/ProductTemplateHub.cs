using Microsoft.AspNetCore.SignalR;
using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using Services.ProductServices.ProductTemplatesServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class ProductTemplateHub : Hub
    {
        private readonly IProductTemplatesService _service;
        public ProductTemplateHub(IProductTemplatesService service)
        {
            _service = service;
        }
       

        public async Task Delete(int id)
        {
            var responce = await _service.Delete(id);
            await Send(responce);
        }

        public async Task Update(int id, FilterProductModel filter)
        {
            var responce = await _service.Update(id, filter);
            await Send(responce);
        }

        private async Task Send(ResponceInfo<int> responce)
        {
            if (responce is null) return;
            await Clients.All.SendAsync("changed", responce);
        }

    }
}
