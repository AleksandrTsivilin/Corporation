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
            var updatedProduct= _service.UpdateProduct(model, id);

            Clients.All.SendAsync("updateProduct", updatedProduct);
        }

        public void DeleteProduct(int id)
        {
            var newProduct = _service.RemoveProduct(id);

            if (newProduct is not null)
                Clients.All.SendAsync("updateProduct", newProduct);
        }


        public void AddManufacturer(ManufacturerModel model)
        {
            var newManufacturer = _service.AddManufacturer(model);
            Clients.All.SendAsync("manufacturerAdd", newManufacturer);
        }

        public void AddCategory(CategoryModel model)
        {
            var newCategory = _service.AddCategory(model);
            Clients.All.SendAsync("categoryAdd", newCategory);
        }

        public void AddUnit(UnitModel model)
        {
            var newUnit = _service.AddUnit(model);
            Clients.All.SendAsync("unitAdd", newUnit);
        }
    }
}
