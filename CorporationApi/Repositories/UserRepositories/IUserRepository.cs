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
        Task AddUserWithAvaiables(NewUser model);
        Task<List<User>> GetByAccess(UserSpecificationByAccess specification);
        Task UpdateUserAvaiables(NewAvaiable[] avaiables, int userId);
    }
}
