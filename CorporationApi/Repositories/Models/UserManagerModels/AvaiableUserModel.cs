using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.UserManagerModels
{
    public class AvaiableUserModel
    {
        public string Role { get; set; }
        public string Access { get; set; }
        public ICollection <string> Permissions { get; set; }
    }
}
