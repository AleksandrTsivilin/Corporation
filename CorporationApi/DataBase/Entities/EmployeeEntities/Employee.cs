using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.EmployeeEntities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Email { get; set; }
        public Guid RegistrationToken { get; set; }
        public User User { get; set; }
        public Department Department { get; set; }
        public int DepartmentId { get; set; }
    }
}
