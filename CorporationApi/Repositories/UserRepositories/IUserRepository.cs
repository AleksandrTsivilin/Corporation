using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.UserRepositories
{
    public interface IUserRepository 
    {
        Task<UserModelRep> GetTryUser(LoginModel model);
        Task AddUserWithAvaiables(NewUser model);
    }
}
