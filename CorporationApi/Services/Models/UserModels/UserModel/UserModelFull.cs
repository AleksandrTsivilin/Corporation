using Services.Models.DepartmentModels;
using Services.Models.EmployeeModels;
using Services.Models.UserModels.FactoryModels;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.UserModels.UserModel
{
    public class UserModelFull : UserModel
    {        
        public EmployeeModel Employee { get; set; }
    }
}
