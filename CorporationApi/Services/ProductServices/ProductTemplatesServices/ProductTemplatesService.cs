using DataBase.Entities.ProductEntities;
using Repositories.Models.ProductModels;
using Repositories.ProductRepositories.ProductTemplatesRepositories;
using Repositories.Specifications;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductTemplatesServices
{
    public class ProductTemplatesService : IProductTemplatesService
    {

        private readonly IProductTemplatesRepository _repository;

        public ProductTemplatesService(IProductTemplatesRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ProductTemplatesModel>> GetByUser(IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var templates = await _repository.GetByUser(userId);
            return GetProductTemplatesModel(templates);
        }

        public async Task<bool> Add(FilterProductModel filter, IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var result = await _repository.Add(filter, userId);
            return result;
        }

        private List<ProductTemplatesModel> GetProductTemplatesModel(List<ProductTemplate> templates)
        {
            return templates.Select(template => new ProductTemplatesModel
            {
                Id = template.Id,
                Title = template.Title,
                RegionId = template.RegionId,
                FactoryId = template.FactoryId,
                StorageId = template.StorageId,
                ManufacturerId =template.ManufacturerId,
                CategoryId = template.CategoryId,
                UnitId = template.UnitId,
                StartCount = template.StartCount,
                EndCount = template.EndCount,
                StartPrice = template.StartPrice,
                EndPrice = template.EndPrice
            }).ToList();
        }
    }
}
