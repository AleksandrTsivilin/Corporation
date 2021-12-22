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

namespace Services.ProductServices.ProductService
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
            return _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.ProductStorages)
                .Select((product) => new ProductModel()
                {
                    Id = product.Id,
                    Title = product.Title,
                    Price = product.Price,
                    Count = product.ProductStorages
                    .Sum(ps => ps.CountProduct),
                    Manufacturer = product.Manufacture.Title,
                    Category = product.Category.Title,
                    Unit = product.Unit.Title,
                    IsBanned = product.IsBanned

                })
                .ToList();
        }
        public List<MovementsProductModel> /*ProductModel*/ AddProduct(AddProductModel model)
        {
            var storage = GetStorageByTitle(model.Storage);            

            var manufacturer = GetManufacturerByTitle(model.Manufacturer);

            var category = GetCategoryByTitle(model.Category);

            var unit = GetUnitByTitle(model.Unit);



            if (storage is null
                || manufacturer is null
                || category is null
                || unit is null) return null;         

            _context.Products.Add(new Product
            {
                Title = model.Title,
                Price = model.Price,
                ManufactureId = manufacturer.Id,
                CategoryId = category.Id,
                UnitId = unit.Id,
                ProductStorages = new List<ProductStorage>
                {
                    new ProductStorage
                    {
                        StorageId=storage.Id,
                        CountProduct=model.AvaiableCount
                    }
                }

            });

            _context.SaveChanges();

            //return CreateProductModel(model.Title);
            var addProductModel = CreateProductModel(model.Title);
            return new List<MovementsProductModel>
            {
                new MovementsProductModel
                {
                    Storage=model.Storage,
                    Products=new List<ProductModel>
                    {
                        addProductModel
                    }
                }
            };

        }
        public List<ProductModel> GetProductsByUser(int id)
        {
            return _context.Product_Storage
                .Include(ps => ps.Product)
                .Where(ps => ps.StorageId == 1)
                .Select(ps => new ProductModel()
                {
                    Id = ps.Product.Id,
                    Title = ps.Product.Title,
                    Price = ps.Product.Price,
                    Count = ps.CountProduct,
                    Manufacturer = ps.Product.Manufacture.Title,
                    Category = ps.Product.Category.Title,
                    Unit = ps.Product.Unit.Title,
                    IsBanned = ps.Product.IsBanned

                }).ToList();
        }
        public ProductModel RemoveProduct(int id)
        {
            var product = GetProductById(id);

            if (product is null) return null;

            product.IsBanned = !product.IsBanned;
            _context.SaveChanges();
            return CreateProductModel(product.Title);
        }
        public ProductModel UpdateProduct(AddProductModel model, int id)
        {
            var storage = GetStorageByTitle(model.Storage);

            var productPrev = GetProductById(id);             

            var manufacturer = GetManufacturerByTitle(model.Manufacturer);

            var category = GetCategoryByTitle(model.Category);

            var unit = GetUnitByTitle(model.Unit);

            if ( storage is null
                || productPrev is null
                || manufacturer is null
                || category is null
                || unit is null) return null;



            productPrev.Title = model.Title;
            productPrev.Price = model.Price;
            productPrev.ManufactureId = manufacturer.Id;
            productPrev.CategoryId=category.Id;
            productPrev.UnitId = unit.Id;
            


            _context.SaveChanges();
            return CreateProductModel(model.Title);               
            
        }
        private Storage GetStorageByTitle(string title)
        {
            return _context.Storages
                .FirstOrDefault(s => s.Title == title);
        }
        private ProductModel CreateProductModel(string title)
        {
            
            var newProduct = GetProduct(title);

            if (newProduct is null) return null;

            return new ProductModel
            {
                Id = newProduct.Id,
                Title = newProduct.Title,
                Price = newProduct.Price,
                Count = newProduct.ProductStorages
                    .Sum(ps=>ps.CountProduct),
                Category = newProduct.Category.Title,
                Manufacturer = newProduct.Manufacture.Title,
                Unit = newProduct.Unit.Title,
                IsBanned = newProduct.IsBanned
            };

            
        }
        private Product GetProduct (string title)
        {
            return _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.ProductStorages)
                .FirstOrDefault(p => p.Title == title);
        }
        private Product GetProductById(int id)
        {
            return _context.Products
                .FirstOrDefault(p => p.Id == id);
        }
        private ManufacturerProduct GetManufacturerByTitle(string title)
        {
            return _context.Manufactures
                .FirstOrDefault(m => m.Title == title);
        }
        private CategoryProduct GetCategoryByTitle(string title)
        {
            return _context.Categoties
                .FirstOrDefault(c => c.Title == title);
        }
        private UnitProduct GetUnitByTitle(string title)
        {
            return _context.Units
                .FirstOrDefault(u => u.Title == title);
        }
        
    }
}
