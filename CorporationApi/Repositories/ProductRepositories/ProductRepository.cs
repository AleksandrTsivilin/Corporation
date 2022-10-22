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
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
            }
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
            catch(Exception ex )
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<List<Product>> GetByAccess(
            ProductSpecificationByAccess specification)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var productStorage = GetQueryDefault(specification);

                var productStorageExecuted = await productStorage.ToListAsync();


                transaction.Commit();
                return productStorageExecuted
                    .Select(ps => ps.Product)
                    .Distinct<Product>()
                    .ToList();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return new List<Product>();
            }
        }

        public async Task<List<Product>> GetByUser(int departmentId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
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

                transaction.Commit();

                return productStorage.Select(ps => ps.Product).ToList();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return new List<Product>();
            }
        }

        public async Task<List<Product>> GetByFilter(
            FilterProductModel filter,
            ProductSpecificationByAccess specification)
        {
            var productStorage = GetQueryDefault(specification);

            var productStorageExecuted = await productStorage
                .Where(ps =>
                    ((ps.Storage.Department.Factory.Region.Id == filter.RegionId
                        && filter.RegionId > 0 && filter.FactoryId <= 0 && filter.StorageId <= 0)
                    || (ps.Storage.Department.Factory.Id == filter.FactoryId
                        && filter.FactoryId > 0 && filter.StorageId <= 0)
                    || (ps.Storage.Id == filter.StorageId && filter.StorageId > 0)
                    || (filter.RegionId <= 0 && filter.FactoryId <= 0 && filter.StorageId <= 0))
                    && (ps.Product.Manufacture.Id == filter.ManufacturerId || filter.ManufacturerId <= 0)
                    && (ps.Product.Category.Id == filter.CategoryId || filter.CategoryId <= 0)
                    && (ps.Product.Unit.Id == filter.UnitId || filter.UnitId <= 0)
                    && (ps.Product.Price >= filter.StartPrice && ps.Product.Price <= filter.EndPrice)
                    && (ps.Product.Title.StartsWith(filter.Title) || filter.Title == null)
                 )
                .ToListAsync();

            return productStorageExecuted
                .Where(ps =>
                    ps.Product.ProductStorages.Sum(ps => ps.CountProduct) < filter.EndCount
                    && ps.Product.ProductStorages.Sum(ps => ps.CountProduct) > filter.StartCount)
                .Select(ps => ps.Product).Distinct<Product>()
                .ToList();
        }

        public async Task<List<Product>> GetByFilterByTitle(string title, ProductSpecificationByAccess specification)
        {
            try
            {
                var productStorage = GetQueryDefault(specification);

                var productStorageExecuted = await productStorage
                    .Where(ps => ps.Product.Title.StartsWith(title) || title == null)
                    .ToListAsync();

                return productStorageExecuted
                    .Select(ps => ps.Product)
                    .Distinct<Product>()
                    .ToList();
            }
            catch(Exception ex)
            {
                return new List<Product>();
            }

        }

        public async Task<Product> GetById(int id, ProductSpecificationByAccess specification)
        {
            try
            {
                var productStorage = GetQueryDefault(specification);

                var productStorageExecuted = await productStorage
                    .FirstOrDefaultAsync(ps => ps.Product.Id == id);
                return productStorageExecuted?.Product;
            }
            catch (Exception ex)
            {
                return null;
            }

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

        private IQueryable<ProductStorage> GetQueryDefault(ProductSpecificationByAccess specification)
        {
            return _context.Product_Storage
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
               .Where(specification.Expression);
        }

    }
}
