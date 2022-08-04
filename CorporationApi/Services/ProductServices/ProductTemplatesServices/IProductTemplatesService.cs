using Repositories.Specifications;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductTemplatesServices
{
    public interface IProductTemplatesService
    {
        Task<List<ProductTemplatesModel>> GetByUser(IdentityUserModel identityInfo);
    }
}
