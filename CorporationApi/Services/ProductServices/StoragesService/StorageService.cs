using DataBase;
using Microsoft.EntityFrameworkCore;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.StoragesService
{
    public class StorageService : IStorageService
    {
        private readonly DBContext _context;
        public StorageService(DBContext context)
        {
            _context = context;
        }

        public Task<List<StorageModel>> GetStorageByAccess(string access)
        {
            throw new NotImplementedException();
        }

        public async Task<StorageModel> GetStorageByUser(int userId)
        {
            var storage = await _context.Storages
                .FirstOrDefaultAsync(s => s.DepartmentId == userId);

            return new StorageModel()
            {
                Title = storage.Title
            };
            //return new StorageModel();
        }

        public async Task<List<StorageModel>> GetStorages()
        {
            return await _context.Storages
                .Select((storage) => new StorageModel()
                {
                    Title = storage.Title
                }).ToListAsync();
        }
    }
}
