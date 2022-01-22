using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;

using Repositories.UserRepositories;
using Services.Models;
using Services.Models.UserModels;
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

        public async Task AddUserWithAvaiables(NewUser model)
        {
            await _repository.AddUserWithAvaiables(model);
        }

        public async Task<UserModel> TryGetUser(LoginModel model)
        {
            var user = await _repository.GetTryUser(model);

            return (user is null)
                ? null
                : new UserModel
                {
                    Id = user.Id,
                    Fullname = user.Lastname + " " + user.Firtsname,
                    Avaiables = CreateAvaiables(user)
                };
        }

        private List<AvaiableUserModel> CreateAvaiables(UserModelRep user)
        {
            var avaiables = new List<AvaiableUserModel>();
            foreach (var avaiable in user.Avaiables)
            {
                var permissions = new List<string>();
                foreach (var permission in avaiable.AvaiablesUser_Permissions)
                {
                    permissions.Add(permission.Permission.Title);
                }
                avaiables.Add(new AvaiableUserModel()
                {
                    Role = avaiable.Role.Title,
                    Access = avaiable.Access.Title,
                    Permissions = permissions
                });
            }
            return avaiables;
        }
    }
}
