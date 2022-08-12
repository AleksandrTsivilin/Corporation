using DataBase.Entities;
using Repositories.ProductRepositories.FactoryRepositories;
using Repositories.Specifications;
using Services.Models.UserModels.FactoryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.FactoryServices
{
    
    public class FactoryService : IFactoryService
    {
        private readonly IFactoryRepository _repository;
        public FactoryService(IFactoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<FactoryModel>> GetFactoryByAccess(IdentityUserModel identity)
        {
            var specification = new FactorySpecificationByAccess(identity);
            var factories = await _repository.GetByAccess(specification);
            return factories.Select(factory => new FactoryModel
            {
                Id = factory.Id,
                Title = factory.Title
            }).ToList();
        }

        public async Task<List<FactoryModel>> GetFactoryByRegion(int id)
        {
            var factories = await _repository.GetByRegionId(id);
            return factories
                .Select(factory => new FactoryModel
                {
                    Id = factory.Id,
                    Title = factory.Title
                }).ToList();
        }

        public async Task<FactoryModel> GetById(int id)
        {
            var factory = await _repository.GetById(id);
            return factory is null ? null : GetFactoryModel(factory);
        }

        private FactoryModel GetFactoryModel(Factory factory)
        {
            return new FactoryModel
            {
                Id = factory.Id,
                Title = factory.Title
            };
        }
    }
}
