using Microsoft.AspNetCore.SignalR;
using Repositories.Models.ProductModels;
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
        //public async Task MoveProducts(MoveProductModel model)
        //{

        //    var storages = await Task.Run(() => _service.MovedProducts(model));
        //    if (storages is not null)
        //        await Clients.All.SendAsync("changeProducts", storages);

        //}

        public async Task Delete(int id)
        {
            var removedId = await _service.Delete(id);
            if (removedId != 0)
                await Clients.All.SendAsync("removedId", removedId);
        }

        public async Task Update(int id, FilterProductModel filter)
        {
            var updatedId = await _service.Update(id, filter);
            if (updatedId != 0)
                await Clients.All.SendAsync("removedId", updatedId);
        }
    }
}
