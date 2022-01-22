using DataBase.Entities.EmployeeEntities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class User : BaseEntity
    {
        public string Username { get; set;}
        public byte [] Salt { get; set; }
        public string HashedPassword { get; set; }
        public int EmployeeId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public Employee Employee { get; set; }
        public int DepartmentId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public Department Department { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public ICollection<AvaiableUser> Avaiables { get; set; }
    }
}
