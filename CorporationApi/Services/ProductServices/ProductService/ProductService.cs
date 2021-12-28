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
        public async Task<List<ProductModel>> Get()
        {
            return await ( _context.Products
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

                }))
                .ToListAsync();
        }
        public async Task<List<string>> AddProduct(NewProductModel model)
        {
            var storage = await GetStorageByTitle(model.Storage);            

            var manufacturer = await GetManufacturerByTitle(model.Manufacturer);

            var category = await GetCategoryByTitle(model.Category);

            var unit = await GetUnitByTitle(model.Unit);



            if (storage is null
                || manufacturer is null
                || category is null
                || unit is null) return null;         

            try
            {
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

                await _context.SaveChangesAsync();
                return new List<string> { model.Storage };
            }
            catch
            {
                return null;
            }
            
            //return new List<string> { model.Storage };
            //return CreateProductModel(model.Title);
            //var addProductModel = CreateProductModel(model.Title);
            //return new List<MovementsProductModel>
            //{
            //    new MovementsProductModel
            //    {
            //        Storage=model.Storage,
            //        Products=new List<ProductModel>
            //        {
            //            addProductModel
            //        }
            //    }
            //};

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
        public async Task<List<string>> RemoveProduct(int id)
        {
            var product = await GetProductById(id);

            if (product is null) return null;

            product.IsBanned = !product.IsBanned;
            await _context.SaveChangesAsync();
            var storage = await _context.Product_Storage
                .Include(ps => ps.Storage)
                .FirstOrDefaultAsync(ps => ps.ProductId == id);
            return new List<string> { storage.Storage.Title };
            //return CreateProductModel(product.Title);
        }
        public async Task<List<string>> UpdateProduct(NewProductModel model, int id)
        {
            var storage = await GetStorageByTitle(model.Storage);

            var productPrev = await GetProductById(id);             

            var manufacturer = await GetManufacturerByTitle(model.Manufacturer);

            var category = await GetCategoryByTitle(model.Category);

            var unit = await GetUnitByTitle(model.Unit);

            if ( storage is null
                || productPrev is null
                || manufacturer is null
                || category is null
                || unit is null) return null;


            try
            {
                productPrev.Title = model.Title;
                productPrev.Price = model.Price;
                productPrev.ManufactureId = manufacturer.Id;
                productPrev.CategoryId=category.Id;
                productPrev.UnitId = unit.Id;
            

            
                await _context.SaveChangesAsync();
                return new List<string> { model.Storage };
            }
            catch
            {
                return null;
            }
            
            //return CreateProductModel(model.Title);               
            
        }
        private async Task<Storage> GetStorageByTitle(string title)
        {
            return await _context.Storages
                .FirstOrDefaultAsync(s => s.Title == title);
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
        private async Task< Product> GetProductById(int id)
        {
            return await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        private async Task<ManufacturerProduct> GetManufacturerByTitle(string title)
        {
            return await _context.Manufactures
                .FirstOrDefaultAsync(m => m.Title == title);
        }
        private async Task<CategoryProduct> GetCategoryByTitle(string title)
        {
            return await _context.Categoties
                .FirstOrDefaultAsync(c => c.Title == title);
        }
        private async Task <UnitProduct> GetUnitByTitle(string title)
        {
            return await _context.Units
                .FirstOrDefaultAsync(u => u.Title == title);
        }
        
    }
}
