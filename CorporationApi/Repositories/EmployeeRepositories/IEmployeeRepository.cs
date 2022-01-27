using DataBase.Entities.EmployeeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EmployeeRepositories
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Employee> GetById(int id);
        Task<List<Employee>> GetEmployeesNonUser();
    }
}
