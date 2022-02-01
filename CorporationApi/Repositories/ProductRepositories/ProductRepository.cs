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

namespace Repositories.ProductRepositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DBContext context)
            : base(context) { }
        public async Task<List<Product>> GetByAccess(ProductSpecificationByAccess specification)
        {
            var products = await _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.ProductStorages)
                .ThenInclude(ps => ps.Storage)
                .ThenInclude(s => s.Department)
                .ThenInclude(d => d.Factory)
                .ThenInclude(f => f.Region)
                .Where(specification.Expression)
                .ToListAsync();
           
            return products;
        }
    }
}
