using DataBase;
using DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.DepartmentRepositories
{
    public class DepartmentRepository 
        : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(DBContext context) : base(context) { }
    }
}
