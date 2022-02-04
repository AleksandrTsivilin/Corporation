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
        private SpecificationProduct _specificationProduct;
        public ProductRepository(DBContext context)
            : base(context) 
        {
            _specificationProduct = new SpecificationProduct();
        }

        public async Task<List<int>> Add(NewProductModel model)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var storage = await GetEntityById<Storage>(model.StorageId);
                if (storage is null) throw new Exception();
                var specProduct = await GetSpecificationProduct(model);

                await _context.Products.AddAsync(
                    new Product
                    {
                        Title = model.Title,
                        Price = model.Price,
                        Manufacture = specProduct.Manufacturer,
                        Category = specProduct.Category,
                        Unit = specProduct.Unit,
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

        public async Task<List<Product>> GetByAccess(
            ProductSpecificationByAccess specification)
        {
            //var products = await _context.Products
            //    .Include(p => p.Manufacture)
            //    .Include(p => p.Category)
            //    .Include(p => p.Unit)
            //    .Include(p => p.ProductStorages)
            //    .ThenInclude(ps => ps.Storage)
            //    .ThenInclude(s => s.Department)
            //    .ThenInclude(d => d.Factory)
            //    .ThenInclude(f => f.Region)
            //    .Where(specification.Expression)
            //    .ToListAsync();
            var productStorage = await _context.Product_Storage
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Manufacture)
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Category)
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Unit)
                .Include(ps => ps.Storage)
                    .ThenInclude(storage => storage.Department)
                        .ThenInclude(department => department.Factory)
                            .ThenInclude(factory => factory.Region)
                .Where(specification.Expression)
                
                .ToListAsync();

           
            return productStorage.Select(ps=>ps.Product).Distinct<Product>().ToList();
        }

        public async Task<List<int>> Remove(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var banProduct = await GetProductWithStorage(id);

                if (banProduct is null) throw new Exception();

                banProduct.IsBanned = !banProduct.IsBanned;

                await _context.SaveChangesAsync();
                transaction.Commit();
                var storages = GetUpdatedStorages(banProduct.ProductStorages);

                return storages;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<List<int>> Update(NewProductModel model, int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var editProduct = await GetProductWithStorage(id);

                if (editProduct is null) throw new Exception();
                var specProduct = await GetSpecificationProduct(model);

                editProduct.Title = model.Title;
                editProduct.Price = model.Price;
                editProduct.Manufacture = specProduct.Manufacturer;
                editProduct.Category = specProduct.Category;
                editProduct.Unit = specProduct.Unit;
                await _context.SaveChangesAsync();
                transaction.Commit();
                var storages = GetUpdatedStorages(editProduct.ProductStorages);
                return storages;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<List<Product>> GetByUser(int departmentId)
        {
            var productStorage = await _context.Product_Storage
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Manufacture)
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Category)
                .Include(ps => ps.Product)
                    .ThenInclude(product => product.Unit)
                .Include(ps => ps.Storage)
                .Where(ps => ps.Storage.DepartmentId == departmentId)
                .ToListAsync();

            return productStorage.Select(ps => ps.Product).ToList();
        }
        private List<int> GetUpdatedStorages(ICollection<ProductStorage> productStorages)
        {
            var storages = new List<int>();

            foreach (var productStorage in productStorages)
            {
                storages.Add(productStorage.StorageId);
            }
            return storages;
        }

        private async Task<SpecificationProduct> GetSpecificationProduct(NewProductModel model)
        {
            _specificationProduct.Manufacturer = await GetEntityById<ManufacturerProduct>(model.ManufacturerId);
            if (_specificationProduct.Manufacturer is null)
                throw new Exception();

            _specificationProduct.Category = await GetEntityById<CategoryProduct>(model.CategoryId);
            if (_specificationProduct.Category is null)
                throw new Exception();

            _specificationProduct.Unit = await GetEntityById<UnitProduct>(model.UnitId);
            if (_specificationProduct.Unit is null)
                throw new Exception();
            return _specificationProduct;
        }

        private async Task<T> GetEntityById<T>(int id) where T : BaseEntity
        {
            return await _context.Set<T>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        private async Task<Product> GetProductWithStorage(int id)
        {
            return await _context.Products
                    .Include(product => product.ProductStorages)
                    .FirstOrDefaultAsync(product => product.Id == id);
        }

    }
}
