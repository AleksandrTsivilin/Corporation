using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Services.Models;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManufacturerModel = Services.Models.ManufacturerModel;

namespace Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly DBContext _context;
        public ProductService(DBContext context)
        {
            _context = context;
        }
        public List<ProductModel> Get()
        {
            return  new List<ProductModel>
            {
                new ProductModel{Id=1, Title="product 1", Count=3.5},
                new ProductModel{Id=1, Title="product 2", Count=500},
                new ProductModel{Id=1, Title="product 3", Count=80.4},
                new ProductModel{Id=1, Title="product 4", Count=0.5}
            };
        }

        public List<ManufacturerModel> GetManufacturers()
        {
            
            return _context.Manufactures                
                .Select((manufacturer)=>new ManufacturerModel()
                {
                   Title=manufacturer.Title
                }).ToList();
        }

        public List<CategoryModel> GetCategories()
        {
            return _context.Categoties
                .Select((category) => new CategoryModel()
                {
                    Title = category.Title
                }).ToList();
        }

        public List<UnitModel> GetUnits()
        {
            return _context.Units
                .Select((unit) => new UnitModel()
                {
                    Title = unit.Title
                }).ToList();
        }

        public void AddProduct(AddProductModel model)
        {
            var manufacturer = _context.Manufactures
                .FirstOrDefault(m => m.Title == model.Manufacturer);

            if (manufacturer is null) return;

            var category = _context.Categoties
                .FirstOrDefault(c => c.Title == model.Category);

            if (category is null) return;

            var unit = _context.Units
                .FirstOrDefault(u => u.Title == model.Unit);

            if (unit is null) return;

            _context.Products.Add(new Product
            {
                Title = model.Title,
                Price = model.Price,
                AvaiableCount = model.AvaiableCount,
                ManufactureId = manufacturer.Id,                
                CategoryId = category.Id,
                UnitId = unit.Id
            });

            _context.SaveChanges();           

        }
    }
}
