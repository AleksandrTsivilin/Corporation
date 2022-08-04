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
            return GetProductTemplatesModel();
        }

        private List<ProductTemplatesModel> GetProductTemplatesModel()
        {
            return new List<ProductTemplatesModel>();
        }
    }
}
