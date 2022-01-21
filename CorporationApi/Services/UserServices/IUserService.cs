using Repositories.Models.UserManagerModels;
using Services.Models;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices
{
    public interface IUserService
    {
        Task<UserModel> TryGetUser(LoginModel model);
        Task AddUserWithAvaiables(NewUser model);
    }
}
