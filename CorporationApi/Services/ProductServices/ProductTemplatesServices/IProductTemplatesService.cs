using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using Repositories.Specifications;
using Services.Models.ProductModels;
using Services.Models.ProductModels.ProductTemplateModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductTemplatesServices
{
    public interface IProductTemplatesService
    {
        Task<List<ProductTemplateModel>> GetByUser(IdentityUserModel identityInfo);
        Task<int> Add(FilterProductModel filter, IdentityUserModel identityInfo);
        Task<ProductTemplateModel> GetById(int id, IdentityUserModel identity);
        Task<ProductTemplateWithDetailModel> GetDetail(int id);
        Task<ResponceInfo<int>> Delete(int id);
        Task<ResponceInfo<int>> Update(int id, FilterProductModel filter);
    }
}
