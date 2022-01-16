using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.UserEntities;
using Repositories.ProductRepositories;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices.RoleServices
{
    public class RoleService : IRoleService
    {
        private readonly IRepository<Role> _repository;

        public RoleService(IRepository<Role> repository)
        {
            _repository = repository;
        }
        public async Task<List<RoleModel>> GetRoles()
        {
            var roles = await _repository.Get();
            return roles.Select(r => new RoleModel()
            {
                Id = r.Id,
                Title = r.Title

            }).ToList();
           
        }
    }
}
