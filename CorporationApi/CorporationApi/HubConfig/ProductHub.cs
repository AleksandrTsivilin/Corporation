using Microsoft.AspNetCore.SignalR;
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

        public void AddProduct(AddProductModel model)
        {
            var newProduct = _service.AddProduct(model);
            if (newProduct is not null)
                Clients.Others.SendAsync("productAdd", newProduct);
        }

        public void UpdateProduct(AddProductModel model, int id)
        {
            var updatedProduct = _service.UpdateProduct(model, id);

            if (updatedProduct is null) return;
            Clients.All.SendAsync("updateProduct", updatedProduct);
        }

        public void DeleteProduct(int id)
        {
            var newProduct = _service.RemoveProduct(id);

            if (newProduct is not null)
                Clients.All.SendAsync("updateProduct", newProduct);
        }
    }
}
