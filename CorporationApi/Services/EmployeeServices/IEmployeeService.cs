
using DataBase.Entities.EmployeeEntities;
using Services.Models.EmployeeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.EmployeeServices
{
    public interface IEmployeeService
    {
        Task<List<EmployeeModel>> GetEmployeesShort();
        Task<List<EmployeeModel>> GetEmployeesNonUser();
    }
}
