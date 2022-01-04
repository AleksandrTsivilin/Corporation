using DataBase;
using Microsoft.EntityFrameworkCore;
using Services.AccessServices;
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

        public async Task<List<StorageModel>> GetStorageByAccess(string access)
        {
            var accessStorages = new AccessServiceStorage("factory");

            return await _context.Storages
                .Include(s => s.Department)
                .ThenInclude(d => d.Factory)
                .ThenInclude(f => f.Region)
                .Where(accessStorages.Expression)
                .Select((storage) => new StorageModel()
                {
                    Title = storage.Title
                }).ToListAsync();

            //Console.WriteLine(a);
            //return new List<StorageModel>();
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
