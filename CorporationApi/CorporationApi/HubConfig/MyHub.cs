using Microsoft.AspNetCore.SignalR;
using Services.Models.ProductModels;
using Services.ProductService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class MyHub:Hub
    {
        private readonly IProductService _service;

        public MyHub(IProductService service)
        {
            _service = service;
        }

        public void AddProduct(AddProductModel model)
        {
            Console.WriteLine("addProduct");
            //model.Category.Title = "bb";
            //Console.Write(model);

            

            var newProduct=_service.AddProduct(model);
            if (newProduct is not null)
                 Clients.Others.SendAsync("productAdd", newProduct);
        }

        public void UpdateProduct(AddProductModel model, int id)
        {
            Console.WriteLine(model);
            Console.WriteLine(id);
            var updatedProduct= _service.UpdateProduct(model, id);

            Clients.All.SendAsync("updateProduct", updatedProduct);
        }
    }
}
