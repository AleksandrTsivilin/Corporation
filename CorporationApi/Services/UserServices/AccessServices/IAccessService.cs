using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices.AccessServices
{
    public interface IAccessService
    {
        Task<List<AccessModel>> GetAccesses();
    }
}
