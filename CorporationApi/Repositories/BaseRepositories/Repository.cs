using DataBase;
using DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.BaseRepositories
{
    public class Repository<T> : IRepository<T>  where T : BaseEntity
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

        public async Task<int> GetCount()
        {
            return await _context.Set<T>()
                .CountAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(entity => entity.Id == id);
        }

        protected async Task<T2> GetEntityById<T2>(int id) where T2 : BaseEntity
        {
            return await _context.Set<T2>().FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}
