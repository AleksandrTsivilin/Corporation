using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.StorageRepositories
{
    public class StorageRepository : Repository<Storage>, IStorageRepository
    {
        public StorageRepository(DBContext context)
            : base(context) { }

        public async Task<List<Storage>> GetByAccess(StorageSpecificationByAccess specification)
        {
            return await _context.Storages
                .Where(specification.Expression)
                .ToListAsync();
        }
    }
}
