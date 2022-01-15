using DataBase.Entities.EmployeeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set;}
        public string Email { get; set; }
        public byte [] Salt { get; set; }
        public string HashedPassword { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
