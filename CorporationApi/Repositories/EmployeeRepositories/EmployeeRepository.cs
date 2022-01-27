
using DataBase;
using DataBase.Entities.EmployeeEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EmployeeRepositories
{
    public class EmployeeRepository
        : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(DBContext context) : base(context)
        {

        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<Employee>> GetEmployeesNonUser()
        {
            return await _context.Employees
                .Include(e => e.User)
                .Where(e => e.User == null)
                .ToListAsync();
        }
    }
}
