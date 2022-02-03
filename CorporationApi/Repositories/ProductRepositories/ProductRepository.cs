using DataBase;
using DataBase.Entities;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.Models.ProductModels;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DBContext context)
            : base(context) { }

        public async Task<List<int>> AddProduct(NewProductModel model)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var storage = await GetEntityById<Storage>(model.StorageId);
                if (storage is null) throw new Exception();
                var manufacturer = await GetEntityById<ManufacturerProduct>(model.ManufacturerId);
                if (manufacturer is null) throw new Exception();
                var category = await GetEntityById<CategoryProduct>(model.CategoryId);
                if (category is null) throw new Exception();
                var unit = await GetEntityById<UnitProduct>(model.UnitId);
                if (unit is null) throw new Exception();
                await _context.Products.AddAsync(
                    new Product
                    {
                        Title = model.Title,
                        Price = model.Price,
                        Manufacture = manufacturer,
                        Category = category,
                        Unit = unit,
                        ProductStorages = new List<ProductStorage> 
                        {
                            new ProductStorage
                            {
                                CountProduct = model.Count,
                                StorageId = storage.Id
                            }
                        }
                    }

                );
                await _context.SaveChangesAsync();
                transaction.Commit();
                return new List<int>() { model.StorageId };
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<List<Product>> GetByAccess(ProductSpecificationByAccess specification)
        {
            var products = await _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.ProductStorages)
                .ThenInclude(ps => ps.Storage)
                .ThenInclude(s => s.Department)
                .ThenInclude(d => d.Factory)
                .ThenInclude(f => f.Region)
                .Where(specification.Expression)
                .ToListAsync();
           
            return products;
        }

        public async Task<List<int>> Update(NewProductModel model, int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var editProduct = await _context.Products
                    .Include(product => product.ProductStorages)
                    .FirstOrDefaultAsync(product => product.Id == id);

                if (editProduct is null) throw new Exception();
                var manufacturer = await GetEntityById<ManufacturerProduct>(model.ManufacturerId);
                if (manufacturer is null) throw new Exception();
                var category = await GetEntityById<CategoryProduct>(model.CategoryId);
                if (category is null) throw new Exception();
                var unit = await GetEntityById<UnitProduct>(model.UnitId);
                if (unit is null) throw new Exception();

                editProduct.Title = model.Title;
                editProduct.Price = model.Price;
                editProduct.Manufacture = manufacturer;
                editProduct.Category = category;
                editProduct.Unit = unit;
                await _context.SaveChangesAsync();
                transaction.Commit();
                var storages = new List<int>();
                foreach (var productStorage in editProduct.ProductStorages)
                {
                    storages.Add(productStorage.StorageId);
                }
                return storages;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }

        private async Task<T> GetEntityById<T>(int id) where T : BaseEntity
        {
            return await _context.Set<T>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}
