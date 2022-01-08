using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.UserModels
{
    public class Role
    {
        public string Title { get; set; }
        public ICollection<Permission> Permissions { get; set; }
        public Access RoleAccess { get; set; }
    }
}
