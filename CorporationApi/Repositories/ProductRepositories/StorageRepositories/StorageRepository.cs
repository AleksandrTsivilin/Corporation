﻿using DataBase;
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

        public async Task<List<Storage>> GetByFactoryId(int id)
        {
            return await _context.Storages
                .Include(storage => storage.Department)
                .Where(storage => storage.Department.FactoryId == id)
                .ToListAsync();
        }

        public async Task<List<Storage>> GetByRegionId(int id)
        {
            return await _context.Storages
                .Include(storage => storage.Department)
                    .ThenInclude(department => department.Factory)
                        .ThenInclude(factory => factory.Region)
                .Where(storage => storage.Department.Factory.Region.Id == id)
                .ToListAsync();
        }

        public async Task<Storage> GetByUser(int departmentId)
        {
            return await _context.Storages
                .FirstOrDefaultAsync(storage => storage.DepartmentId == departmentId);
        }
    }
}
