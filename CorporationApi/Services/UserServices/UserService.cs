using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;
using Repositories.Specifications;
using Repositories.UserRepositories;
using Services.Models;
using Services.Models.DepartmentModels;
using Services.Models.EmployeeModels;

using Services.Models.UserModels;
using Services.Models.UserModels.FactoryModels;
using Services.Models.UserModels.RegionModels;
using Services.Models.UserModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> AddUserWithAvaiables(NewUserWithAvaiables model)
        {
            return await _repository.AddUserWithAvaiables(model);
        }

        public async Task<UserModel> AddUserWithRegistrationId(NewUserWithRegistrationId model)
        {
            var user = await _repository.AddUserWithRegistrationId(model);
            return new UserModel
            {
                Id = user.Id,
                Username = user.Username,
                Department = new DepartmentModel
                {
                    Id = user.Department.Id,
                    Title = user.Department.Title
                },
                Factory = new FactoryModel
                {
                    Id = user.Department.Factory.Id,
                    Title = user.Department.Factory.Title
                },
                Region = new RegionModel
                {
                    Id = user.Department.Factory.Region.Id,
                    Title = user.Department.Factory.Region.Title
                },
                Avaiables = null

            };
        }

        public async Task<int> BanUser(int userId)
        {
            return await _repository.BanUser(userId);
        }

        public async Task<List<UserModelFull>> GetByAccess(IdentityUserModel identity)
        {
            var specification = new UserSpecificationByAccess(identity);

            var users = await _repository.GetByAccess(specification);
            return users.Select(u => new UserModelFull
            {
                Id = u.Id,
                Username = u.Username,
                IsBanned = u.IsBanned,
                Employee = new EmployeeModel
                {
                    Id = u.Employee.Id,
                    Lastname = u.Employee.Lastname,
                    Firstname = u.Employee.Firstname
                },
                Department = new DepartmentModel
                {
                    Id = u.Department.Id,
                    Title = u.Department.Title
                },

                Avaiables = CreateAvaiables(u)
            }).ToList();
        }

        public async Task<UserModel> TryGetUser(LoginModel model)
        {
            var user = await _repository.GetTryUser(model);

            return (user is null)
                ? null
                : new UserModel
                {
                    Id = user.Id,
                    Username = user.Username,
                    Department = new DepartmentModel
                    {
                        Id = user.Department.Id,
                        Title = user.Department.Title
                    },
                    Factory = new FactoryModel
                    {
                        Id = user.Department.Factory.Id,
                        Title = user.Department.Factory.Title
                    },
                    Region = new RegionModel 
                    {
                        Id = user.Department.Factory.Region.Id,
                        Title = user.Department.Factory.Region.Title
                    },
                    Avaiables = CreateAvaiables(user)
                };
        }
        public async Task<int> UpdateAvaiables(NewAvaiable[] avaiables,int userId)
        {
            return await _repository.UpdateUserAvaiables(avaiables, userId);
        }

        private List<AvaiableUserModel> CreateAvaiables(User user)
        {
            var avaiables = new List<AvaiableUserModel>();
            foreach (var avaiable in user.Avaiables)
            {
                var permissions = new List<PermissionModel>();
                foreach (var permission in avaiable.AvaiablesUser_Permissions)
                {
                    permissions.Add(new PermissionModel()
                    {
                        Id = permission.Permission.Id,
                        Title = permission.Permission.Title
                    });
                }
                avaiables.Add(new AvaiableUserModel()
                {
                    Role = new RoleModel
                    {
                        Id = avaiable.Role.Id,
                        Title = avaiable.Role.Title
                    },
                    Access = new AccessModel
                    {
                        Id = avaiable.Access.Id,
                        Title = avaiable.Access.Title
                    },
                    Permissions = permissions
                });
            }
            return avaiables;
        }
    }
}
