﻿using DataBase;
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
        private readonly IStorageRepository _repository;
        public StorageService(DBContext context, IStorageRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<StorageModel>> GetByFactoryId(int id)
        {
            var storages = await _repository.GetByFactoryId(id);
            return storages
                .Select(storage => new StorageModel
                {
                    Id = storage.Id,
                    Title = storage.Title
                }).ToList();
        }

        public async Task<List<StorageModel>> GetByRegionId(int id)
        {
            var storages = await _repository.GetByRegionId(id);
            return storages
                .Select(storage => new StorageModel
                {
                    Id = storage.Id,
                    Title = storage.Title
                }).ToList();
        }

        public async Task<int> GetCount()
        {
            return await _repository.GetCount();
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
            var storages = await _repository.Get();
            return storages.Select((s) => new StorageModel()
            {
                Title = s.Title
            }).ToList();
        }

        public async Task<StorageModel> GetById(int id)
        {
            var storage = await _repository.GetById(id);

            return storage is null ? null : GetStorageModel(storage);
        }

        private StorageModel GetStorageModel(Storage storage)
        {
            return new StorageModel
            {
                Id = storage.Id,
                Title = storage.Title
            };
        }
    }
}
