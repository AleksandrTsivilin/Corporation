using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;
using Services.Models.DepartmentModels;
using Services.Models.UserModels.FactoryModels;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.UserModels.UserModel
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public RegionModel Region { get; set; }
        public FactoryModel Factory { get; set; }
        public DepartmentModel Department { get; set; }
        public ICollection<AvaiableUserModel> Avaiables { get; set; }
    }
}
