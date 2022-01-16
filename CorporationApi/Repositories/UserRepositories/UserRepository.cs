using DataBase;
using DataBase.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.Models.UserManagerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.UserRepositories
{
    public class UserRepository : UserManagerRepository<User>, IUserRepository
    {
        public UserRepository(DBContext context)
            : base(context)
        {

        }
        public async Task<UserModelRep> GetTryUser(LoginModel model)
        {
            var a = _context.Users
                .Include(u => u.Employee)
                .Include(u => u.Avaiables);
            return null;

        }
    }
}
