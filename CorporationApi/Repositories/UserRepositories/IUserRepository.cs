using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.UserRepositories
{
    public interface IUserRepository 
    {
        Task<User> GetTryUser(LoginModel model);
        Task<int> AddUserWithAvaiables(NewUserWithAvaiables model);
        Task<List<User>> GetByAccess(UserSpecificationByAccess specification);
        Task<int> UpdateUserAvaiables(NewAvaiable[] avaiables, int userId);
        Task<int> BanUser(int userId);
        Task<User> AddUserWithRegistrationId(NewUserWithRegistrationId model);
    }
}
