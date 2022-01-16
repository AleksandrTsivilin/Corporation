using DataBase.Entities.EmployeeEntities;
using Repositories.ProductRepositories;
using Services.Models.EmployeeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _repository;

        public EmployeeService(IRepository<Employee> repository)
        {
            _repository = repository;
        }
        public async Task<List<EmployeeModelShort>> GetEmployeesShort()
        {
            var employees = await _repository.Get();
            var model = employees.Select(employee => new EmployeeModelShort()
            {
                Id = employee.Id,
                Fullname = employee.Lastname + " " + employee.Firstname
            });

            return model.ToList();
        }
    }
}
