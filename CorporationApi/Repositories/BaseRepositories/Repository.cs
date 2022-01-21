using DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.BaseRepositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DBContext _context;

        public Repository(DBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<T>> Get()
        {
            return await _context.Set<T>().ToListAsync();
        }
    }
}
