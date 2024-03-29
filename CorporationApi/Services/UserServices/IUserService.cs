﻿using Repositories.Models.UserManagerModels;
using Repositories.Specifications;
using Services.Models.UserModels.UserModel;
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
        Task<int> AddUserWithAvaiables(NewUserWithAvaiables model);
        Task<List<UserModelFull>> GetByAccess(IdentityUserModel identity);
        Task<int> UpdateAvaiables(NewAvaiable[] avaiables, int userId);
        Task<int> BanUser(int userId);
        Task<UserModel> AddUserWithRegistrationId(NewUserWithRegistrationId model);
    }
}
