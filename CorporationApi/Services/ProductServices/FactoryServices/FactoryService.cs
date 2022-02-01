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
    }
}
