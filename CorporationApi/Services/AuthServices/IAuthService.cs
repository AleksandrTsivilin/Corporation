using Services.Models.UserModels;
using Services.Models.UserModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AuthServices
{
    public interface IAuthService
    {
        string CreateJWT(UserModel model);
    }
}
