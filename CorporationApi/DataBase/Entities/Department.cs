using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.ProductEntities;
using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities
{
    public class Department : BaseEntity
    {
        public string Title { get; set; }
        public Storage Storage { get; set; }
        public Factory Factory { get; set; }
        public int FactoryId { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
