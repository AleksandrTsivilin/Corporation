﻿using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.Models.ProductModels;
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
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ProductModel>> GetProductsByAccess(IdentityUserModel identity)
        {
            var specification = new ProductSpecificationByAccess(identity);
            var products = await _repository.GetByAccess(specification);
            return GetListModels(products);
        }

        public async Task<List<int>> AddProduct(NewProductModel model)
        {
            var storagesId = await _repository.Add(model);
            return storagesId;
        }

        public async Task<List<int>> RemoveProduct(int id)
        {
            return await _repository.Remove(id);
        }

        public async Task<List<int>> UpdateProduct(NewProductModel model, int id)
        {
            return await _repository.Update(model, id);
        }

        public async Task<List<ProductModel>> GetProductsByUser(IdentityUserModel identity)
        {
            var departmentId = identity.Location.DepartmentId;
            var products = await _repository.GetByUser(departmentId);
            return GetListModels(products);
        }

        public async Task<List<ProductModel>> GetByFilter(FilterProductModel filter, IdentityUserModel identity)
        {
            var specification = new ProductSpecificationByAccess(identity);
            var products = await _repository.GetByFilter(filter, specification);
            return GetListModels(products);
        }

        public async Task<ProductModel> GetById(int id, IdentityUserModel identity)
        {
            var specification = new ProductSpecificationByAccess(identity);
            var product = await _repository.GetById(id, specification);
            return product is null
                ? null
                : GetModel(product);
        }

        public async Task<List<ProductModel>> GetByFilterByTitle(string title, IdentityUserModel identity)
        {
            var specification = new ProductSpecificationByAccess(identity);
            var products = await _repository.GetByFilterByTitle(title, specification);
            return GetListModels(products);
        }

        private List<ProductModel> GetListModels(List<Product> products)
        {
            return products.Select(product => GetModel(product)).ToList();
        }

        private ProductModel GetModel(Product product)
        {
            return new ProductModel
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
                },
                Unit = new UnitModel
                {
                    Id = product.Unit.Id,
                    Title = product.Unit.Title
                },
                IsBanned = product.IsBanned
            };
        }

    }


}
