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
            //var spec = new EmployeeSpecification();
            //spec.Criteria
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
        }
    }
}
