﻿using DataBase.Entities.EmployeeEntities;
using Repositories;
using Repositories.EmployeeRepositories;
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
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EmployeeModel>> GetEmployeesNonUser()
        {
            var employees = await _repository.GetEmployeesNonUser();
            var model = employees.Select(employee => new EmployeeModel
            {
                Id = employee.Id,
                Lastname = employee.Lastname,
                Firstname = employee.Firstname
            });
            return model.ToList();
        }

        public async Task<List<EmployeeModel>> GetEmployeesShort()
        {
            var employees = await _repository.Get();
            var model = employees.Select(employee => new EmployeeModel()
            {
                Id = employee.Id,
                Lastname = employee.Lastname,
                Firstname = employee.Firstname
            });

            return model.ToList();
        }
    }
}
