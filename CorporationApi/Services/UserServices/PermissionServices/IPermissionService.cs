using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices.PermissionServices
{
    public interface IPermissionService
    {
        Task<List<PermissionModel>> GetPermissions();
    }
}
