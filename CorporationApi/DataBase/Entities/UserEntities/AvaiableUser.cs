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
        public User User { get; set; }
        public int UserId { get; set; }
        public Role Role { get; set; }
        public int RoleId { get; set; }
        public Access Access { get; set; }
        public int AccessId { get; set; }
        public ICollection<Permission> Permissions { get; set; }
    }
}
