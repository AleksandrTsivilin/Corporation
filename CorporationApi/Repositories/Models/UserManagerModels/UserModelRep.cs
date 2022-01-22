using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.UserManagerModels
{
    public class UserModelRep
    {
        public int Id { get; set; }
        public string Lastname { get; set; }
        public string Firtsname { get; set; }
        public ICollection<AvaiableUser> Avaiables { get; set; }
    }
}
