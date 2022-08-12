using Repositories.Models.ProductModels;
using Repositories.Specifications;
using Services.Models.ProductModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductTemplatesServices
{
    public interface IProductTemplatesService
    {
        Task<List<ProductTemplatesModel>> GetByUser(IdentityUserModel identityInfo);
        Task<bool> Add(FilterProductModel filter, IdentityUserModel identityInfo);
    }
}
