using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.UserManagerModels
{
    public class NewUserWithAvaiables
    {
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<NewAvaiable> Avaiables { get; set; }
    }
}
