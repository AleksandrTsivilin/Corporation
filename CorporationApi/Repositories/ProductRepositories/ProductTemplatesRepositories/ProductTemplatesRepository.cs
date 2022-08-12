using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.ProductTemplatesRepositories
{
    public class ProductTemplatesRepository : Repository<ProductTemplate>, IProductTemplatesRepository
    {

        public ProductTemplatesRepository(DBContext context)
            : base(context) { }

        public async Task<bool> Add(FilterProductModel filter, int userId)
        {
            //using var transaction = _context.Database.BeginTransaction();
            //try
            //{
            //    await _context.ProductTemplates.AddAsync(
            //        new ProductTemplate
            //        {
            //            Title = filter.Title,
            //            RegionId = filter.RegionId,
            //            FactoryId = filter.FactoryId,
            //            StorageId = filter.StorageId,
            //            ManufacturerId = filter.ManufacturerId,
            //            CategoryId = filter.CategoryId,
            //            UnitId = filter.UnitId,
            //            StartCount = filter.StartCount,
            //            EndCount = filter.EndCount,
            //            StartPrice = filter.StartPrice,
            //            EndPrice = filter.EndPrice,
            //            UserId = userId
            //        });
            //    await _context.SaveChangesAsync();
            //    transaction.Commit();
            //    return true;
            //}
            //catch (Exception ex)
            //{
            //    transaction.Rollback();
            //    return false;
            //}

            return true;
        }

        public async Task<List<ProductTemplate>> GetByUser(int userId)
        {
            return await _context.ProductTemplates
                .Where(template => template.UserId == userId)
                .ToListAsync();
        }
    }
}
