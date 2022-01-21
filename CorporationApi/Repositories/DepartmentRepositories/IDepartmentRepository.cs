using DataBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.DepartmentRepositories
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Task<Department> GetById(int id);
    }
}
