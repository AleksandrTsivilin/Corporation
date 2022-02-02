using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.ProductRepositories;
using Repositories.Specifications;
using Services.AccessServices;
using Services.Models;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProductSpecificationByAccess = Repositories.Specifications.ProductSpecificationByAccess;

namespace Services.ProductServices.ProductService
{
    public class ProductService : IProductService
    {
        private readonly DBContext _context;
        private readonly IProductRepository _repository;
        //private readonly AccessService _access;
        public ProductService(DBContext context, IProductRepository repository)
        {
            _context = context;
            _repository = repository;
        }
        public async Task<List<ProductModel>> GetProductsByAccess(IdentityUserModel identity)
        {
            var specification = new ProductSpecificationByAccess(identity);
            var products = await _repository.GetByAccess(specification);
            return products.Select(product => new ProductModel
            {
                Id = product.Id,
                Title = product.Title,
                Price = product.Price,
                Count = product.ProductStorages
                            .Sum(ps => ps.CountProduct),
                Manufacturer = new ManufacturerModel
                {
                    Id = product.Manufacture.Id,
                    Title = product.Manufacture.Title
                },
                Category = new CategoryModel 
                {
                    Id = product.Category.Id,
                    Title = product.Category.Title
                }, //product.Category.Title,
                Unit = new UnitModel 
                {
                    Id = product.Unit.Id,
                    Title = product.Unit.Title
                }, //product.Unit.Title,
                IsBanned = product.IsBanned
            }).ToList();
            //return await _context.Products
            //    .Include(p => p.Manufacture)
            //    .Include(p => p.Category)
            //    .Include(p => p.Unit)
            //    .Include(p => p.ProductStorages)
            //    .ThenInclude(ps => ps.Storage)
            //    .ThenInclude(s => s.Department)
            //    .ThenInclude(d => d.Factory)
            //    .ThenInclude(f => f.Region)
            //    //.Where(accessService.Expression)
                //.Select((product) => new ProductModel()
                //{
                //    Id = product.Id,
                //    Title = product.Title,
                //    Price = product.Price,
                //    Count = product.ProductStorages
                //            .Sum(ps => ps.CountProduct),
                //    Manufacturer = product.Manufacture.Title,
                //    Category = product.Category.Title,
                //    Unit = product.Unit.Title,
                //    IsBanned = product.IsBanned
                //}).ToListAsync();
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
                .Where(ps => ps.StorageId == 5)
                .Select(ps => new ProductModel()
                {
                    Id = ps.Product.Id,
                    Title = ps.Product.Title,
                    Price = ps.Product.Price,
                    Count = ps.CountProduct,
                    Manufacturer = new ManufacturerModel 
                    { 
                        Id = ps.Product.Manufacture.Id,
                        Title = ps.Product.Manufacture.Title
                    },//ps.Product.Manufacture.Title,
                    Category = new CategoryModel 
                    {
                        Id = ps.Product.Category.Id,
                        Title = ps.Product.Category.Title
                    }, //ps.Product.Category.Title,
                    Unit = new UnitModel 
                    {
                        Id = ps.Product.Unit.Id,
                        Title = ps.Product.Unit.Title
                    }, //ps.Product.Unit.Title,
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
                Category = new CategoryModel 
                {
                    Id= newProduct.Category.Id,
                    Title = newProduct.Category.Title
                }, //newProduct.Category.Title,
                Manufacturer = new ManufacturerModel 
                { 
                    Id = newProduct.Manufacture.Id,
                    Title = newProduct.Manufacture.Title
                }, //newProduct.Manufacture.Title,
                Unit = new UnitModel 
                {
                    Id = newProduct.Unit.Id,
                    Title = newProduct.Unit.Title
                }, //newProduct.Unit.Title,
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
