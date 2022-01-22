using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class AvaiableUser
    {
        public int Id { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public User User { get; set; }
        public int UserId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public Role Role { get; set; }
        public int RoleId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public Access Access { get; set; }
        public int AccessId { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public ICollection<AvaiablesUserPermission> AvaiablesUser_Permissions { get; set; }
    }
}
