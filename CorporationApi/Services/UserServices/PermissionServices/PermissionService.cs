using DataBase.Entities.UserEntities;
using Repositories;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices.PermissionServices
{
    public class PermissionService : IPermissionService
    {
        private readonly IRepository<Permission> _repository;

        public PermissionService(IRepository<Permission> repository)
        {
            _repository = repository;
        }
        public async Task<List<PermissionModel>> GetPermissions()
        {
            var permissions = await _repository.Get();
            return permissions.Select(p => new PermissionModel()
            {
                Id = p.Id,
                Title = p.Title

            }).ToList();

        }
    }
}
