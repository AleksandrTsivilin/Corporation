using DataBase.Entities;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.FactoryRepositories
{
    public interface IFactoryRepository : IRepository<Factory>
    {
        Task<List<Factory>> GetByAccess(FactorySpecificationByAccess specification);
    }
}
