using DataBase.Entities.ProductEntities;
using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.ProductTemplatesRepositories
{
    public interface IProductTemplatesRepository
    {
        Task<List<ProductTemplateUser>> GetByUser(int userId);
        Task<int> Add(FilterProductModel filter, int userId);
        Task<ProductTemplateUser> GetById(int id, int userId);
        Task<ProductTemplateWithDetail> GetDetail(int id);
        Task<ResponceInfo<int>> Delete(int id);
        Task<ResponceInfo<int>> Update(int id, FilterProductModel filter);
    }
}
