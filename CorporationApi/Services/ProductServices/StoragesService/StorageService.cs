using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.ProductRepositories.StorageRepositories;
using Repositories.Specifications;
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
        //private readonly IRepository<Storage> _repository;
        private readonly IStorageRepository _repository;
        public StorageService(DBContext context, IStorageRepository repository)
        {
            _context = context;
            _repository = repository;
        }

        public async Task<List<StorageModel>> GetStorageByAccess(IdentityUserModel identity)
        {
            var specification = new StorageSpecificationByAccess(identity);
            var storages = await _repository.GetByAccess(specification);
            return storages.Select(storage => new StorageModel
            {
                Id = storage.Id,
                Title = storage.Title
            }).ToList();
        }

        public async Task<StorageModel> GetStorageByUser(IdentityUserModel identity)
        {
            var storage = await _repository.GetByUser(identity.Location.DepartmentId);
            return storage is null 
                ? null
                : new StorageModel()
                {
                    Id = storage.Id,
                    Title = storage.Title
                };
        }

        public async Task<List<StorageModel>> GetStorages()
        {
            //return await _context.Storages
            //    .Select((storage) => new StorageModel()
            //    {
            //        Title = storage.Title
            //    }).ToListAsync();
            var storages = await _repository.Get();
            return storages.Select((s) => new StorageModel()
            {
                Title = s.Title
            }).ToList();
            //Console.WriteLine(b);
            //return b;
        }
    }
}
