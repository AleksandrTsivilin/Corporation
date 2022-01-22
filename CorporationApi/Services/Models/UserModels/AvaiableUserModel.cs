using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.UserModels
{
    public class AvaiableUserModel
    {
        public RoleModel Role { get; set; }
        public AccessModel Access { get; set; }
        public ICollection<PermissionModel> Permissions { get; set; }
    }
}
