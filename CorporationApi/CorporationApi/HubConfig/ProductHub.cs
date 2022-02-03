using Microsoft.AspNetCore.SignalR;
using Repositories.Models.ProductModels;
using Services.Models.ProductModels;
using Services.ProductService;
using Services.ProductServices.ProductService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class ProductHub:Hub
    {
        private readonly IProductService _service;

        public ProductHub(IProductService service)
        {
            _service = service;
        }

        public async Task AddProduct(NewProductModel model)
        {
            var storages = await Task.Run(() => _service.AddProduct(model));
            if (storages is not null)
                await Clients.All.SendAsync("changeProducts", storages);
        }

        public async Task UpdateProduct(NewProductModel model, int id)
        {
            var storages = await Task.Run(() => _service.UpdateProduct(model, id));
            if (storages is not null)
                await Clients.All.SendAsync("changeProducts", storages);
        }

        public async Task DeleteProduct(int id)
        {
            //var newProduct = _service.RemoveProduct(id);

            //if (newProduct is not null)
            //    await Clients.All.SendAsync("updateProduct", newProduct);

            var storages = await Task.Run(() => _service.RemoveProduct(id));
            if (storages is not null )
                await Clients.All.SendAsync("changeProducts", storages);
        }
    }
}
