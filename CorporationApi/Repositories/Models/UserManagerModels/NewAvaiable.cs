using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.UserManagerModels
{
    public class NewAvaiable
    {
        public int RoleId { get; set; }
        public int AccessId { get; set; }
        public ICollection<int> PermissionsId { get; set; }
    }
}
