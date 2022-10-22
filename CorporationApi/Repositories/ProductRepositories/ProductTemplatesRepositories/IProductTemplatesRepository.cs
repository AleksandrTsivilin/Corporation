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
        Task<ResponceInfo<int>> Add(FilterProductModel filter, int userId);
        Task<List<ProductTemplateUser>> GetByIdWithUsers(int id);
        Task<ProductTemplateWithDetail> GetDetail(int id, int userId);
        Task<ResponceInfo<int>> Delete(int id);
        Task<ResponceInfo<int>> Update(int id, FilterProductModel filter);
        Task<ResponceInfo<bool>> AddUser(int templateId, int userId);
    }
}
