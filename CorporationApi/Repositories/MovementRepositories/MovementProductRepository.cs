using DataBase;
using DataBase.Entities;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.MovementRepositories
{
    public class MovementProductRepository : IMovementProductRepository
    {
        private readonly DBContext _context;

        public MovementProductRepository(DBContext context)
        {
            _context = context;
        }
        public async Task<List<int>> MovedProduct(MoveProductModel model)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var storageFrom = await GetEntityById<Storage>(model.From);
                var storageTo = await GetEntityById<Storage>(model.To);
                if (storageFrom is null || storageTo is null) return null;
                foreach (var movement in model.MovementProducts)
                {

                    var productStorageFrom = _context.Product_Storage
                        .Where(ps => ps.Storage.Id == model.From)
                        .FirstOrDefault(ps => ps.Product.Id == movement.ProductId);

                    if (productStorageFrom is null) continue;


                    var productStorageTo = _context.Product_Storage
                        .Where(ps => ps.Storage.Id == model.To)
                        .FirstOrDefault(ps => ps.Product.Id == movement.ProductId);

                    if (productStorageTo is null)
                    {
                        _context.Product_Storage.Add(new ProductStorage
                        {
                            ProductId = movement.ProductId,
                            StorageId = storageTo.Id,
                            CountProduct = movement.MovedCount
                        });

                        productStorageFrom.CountProduct -= movement.MovedCount;
                        _context.SaveChanges();
                    }
                    else
                    {
                        productStorageTo.CountProduct += movement.MovedCount;
                        productStorageFrom.CountProduct -= movement.MovedCount;
                        _context.SaveChanges();
                    }
                }

                await _context.SaveChangesAsync();
                transaction.Commit();
                return new List<int>() { model.From, model.To};
            }
            catch(Exception ex)
            {

                transaction.Rollback();
                Console.WriteLine(ex.InnerException.Message);
                return null;
            }
        }

        private async Task<T> GetEntityById<T>(int id) where T : BaseEntity
        {
            return await _context.Set<T>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}
