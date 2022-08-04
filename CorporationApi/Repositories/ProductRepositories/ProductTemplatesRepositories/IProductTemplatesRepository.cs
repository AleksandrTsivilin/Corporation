using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.ProductTemplatesRepositories
{
    public interface IProductTemplatesRepository
    {
        Task<List<ProductTemplate>> GetByUser(int userId);
    }
}
