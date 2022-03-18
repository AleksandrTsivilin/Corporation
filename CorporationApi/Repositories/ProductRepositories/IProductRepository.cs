using DataBase.Entities.ProductEntities;
using Repositories.Models.ProductModels;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<List<Product>> GetByAccess(ProductSpecificationByAccess specification);
        Task<List<int>> Add(NewProductModel model);
        Task<List<int>> Update(NewProductModel model, int id);
        Task<List<int>> Remove(int id);
        Task<List<Product>> GetByUser(int departmentId);
        Task<List<Product>> GetByFilter(FilterProductModel filter, ProductSpecificationByAccess specification);
    }
}
