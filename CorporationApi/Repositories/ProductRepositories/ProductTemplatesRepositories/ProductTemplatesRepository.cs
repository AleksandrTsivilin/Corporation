using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.ProductTemplatesRepositories
{
    public class ProductTemplatesRepository : Repository<ProductTemplate>, IProductTemplatesRepository
    {

        public ProductTemplatesRepository(DBContext context)
            : base(context)
        {
        }

        public async Task<List<ProductTemplate>> GetByUser(int userId)
        {
            return await _context.ProductTemplates
                .Where(template => template.UserId == userId)
                .ToListAsync();
        }
    }
}
