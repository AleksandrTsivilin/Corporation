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
        Task<int> AddProduct(NewProductModel model);
    }
}
