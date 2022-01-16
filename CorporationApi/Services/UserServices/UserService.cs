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
        public async Task<UserModel> TryGetUser(LoginModel model)
        {
            _repository.GetTryUser(model);
            return new UserModel()
            {
                Id = 5,
                Firstname = "Vasya",
                Lastname = "Turok"
            };
            //return new UserModel
            //{
            //    Id = 1,
            //    Lastname = "Dubinin",
            //    Firstname = "Vasya",
            //    Roles = new List<Role>
            //    {
            //        new Role
            //        {
            //            Title = "AdminManager",
            //            Permissions = new List<Permission>
            //            {
            //                new Permission{Title="Create"},
            //                new Permission{Title = "Read"},
            //                new Permission{Title ="Update"}
            //            },
            //            RoleAccess = new Access{Title = "Region"}
            //        },
            //        new Role
            //        {
            //            Title = "ProductManager",
            //            Permissions = new List<Permission>
            //            {
            //                new Permission{Title="Create"},
            //                new Permission{Title = "Read"},
            //                new Permission{Title = "Update"},
            //                new Permission{Title = "Delete"}
            //            },
            //            RoleAccess = new Access{Title = "Factory"}
            //        },
            //        new Role
            //        {
            //            Title = "MovementsProductManager",
            //            Permissions = new List<Permission>
            //            {
            //                new Permission{Title="Create"},
            //                new Permission{Title = "Read"},
            //                new Permission{Title = "Update"},
            //                new Permission{Title = "Delete"}
            //            },
            //            RoleAccess = new Access{Title = "Factory"}
            //        },

            //    }
            //};
        }
    }
}
