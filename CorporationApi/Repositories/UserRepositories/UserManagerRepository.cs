using DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.UserRepositories
{
    public class UserManagerRepository<T> : IUserManagerRepository<T> where T : class
    {
        protected readonly DBContext _context;

        public UserManagerRepository(DBContext context)
        {
            _context = context;
        }
    }
}
