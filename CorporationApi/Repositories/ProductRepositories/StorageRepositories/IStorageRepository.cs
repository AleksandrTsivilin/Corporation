using DataBase.Entities.ProductEntities;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.StorageRepositories
{
    public interface IStorageRepository : IRepository<Storage>
    {
        Task <List<Storage>> GetByAccess(StorageSpecificationByAccess specification);
        Task<Storage> GetByUser(int departmentId);
    }
}
