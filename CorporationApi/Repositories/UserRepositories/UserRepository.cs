using DataBase;
using DataBase.Entities;
using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.UserEntities;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Repositories.DepartmentRepositories;
using Repositories.EmployeeRepositories;
using Repositories.Models.UserManagerModels;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.UserRepositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DBContext _context;
        private readonly RNGCryptoServiceProvider _cryptoServiceProvider;

        public UserRepository(
            DBContext context,
            RNGCryptoServiceProvider cryptoServiceProvider)
        {
            _context = context;
            _cryptoServiceProvider = cryptoServiceProvider;
        }

        public async Task AddUserWithAvaiables(NewUser model)
        {
            var employee = await GetEntityById<Employee>(model.EmployeeId);
            
            var salt = new byte[512 / 8];
            _cryptoServiceProvider.GetNonZeroBytes(salt);

            var hashedPassword = GetHashedPassword(model.Password, salt);

            using var transaction = _context.Database.BeginTransaction();
            try
            {

                await _context.AddAsync(
                    new User
                    {
                        EmployeeId = employee.Id,
                        Username = model.Username,
                        HashedPassword = hashedPassword,
                        Salt = salt,
                        DepartmentId = employee.DepartmentId

                    }
                );
                await _context.SaveChangesAsync();

                var addedUser = await GetUserByEmployeeId(employee.Id);

                if (addedUser is null) throw new Exception();

                foreach (var avaiable in model.Avaiables)
                {
                    var access = await GetEntityById<Access>(avaiable.AccessId);

                    var role = await GetEntityById<Role>(avaiable.RoleId);

                    if (access is null || role is null) throw new Exception();
                    await _context.AvaiablesUser.AddAsync(new AvaiableUser
                    {
                        UserId = addedUser.Id,
                        RoleId = role.Id,
                        AccessId = access.Id

                    });
                    await _context.SaveChangesAsync();

                    var addedAvaiables = await GetAvaiblesByUserRole(addedUser.Id, avaiable.RoleId);

                    if (addedAvaiables is null) throw new Exception();

                    var avaiablesUserPermissions = new List<AvaiablesUserPermission>();
                    foreach (var permissionId in avaiable.PermissionsId)
                    {

                        var permission = await GetEntityById<Permission>(permissionId);

                        if (permission is null) throw new Exception();

                        avaiablesUserPermissions.Add(new AvaiablesUserPermission()
                        {
                            AvaiablesUserId = addedAvaiables.Id,
                            PermissionId = permission.Id
                        });

                    }

                    await _context.AddRangeAsync(avaiablesUserPermissions);
                    await _context.SaveChangesAsync();
                    transaction.Commit();

                }


            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
        }



        public async Task<UserModelRep> GetTryUser(LoginModel model)
        {
            var a = _context.Users
                .Include(u => u.Employee)
                .Include(u => u.Avaiables);
            return null;

        }


        private string GetHashedPassword(string password, byte[] salt)
        {

            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA512,
                100000,
                1024 / 8));

        }

        //private async Task<Employee> GetEmployeeById(int id)
        //{
        //    return await _context.Employees
        //        .FirstOrDefaultAsync(e => e.Id == id);
        //}
        //private async Task<Department> GetDepartmentById(int id)
        //{
        //    return await _context.Departments
        //        .FirstOrDefaultAsync(d => d.Id == id);
        //}
        //private async Task<Access> GetAccessById(int id)
        //{
        //    return await _context.Accesses
        //        .FirstOrDefaultAsync(a => a.Id == id);
        //}
        private async Task<T> GetEntityById<T>(int id) where T : BaseEntity
        {
            return await _context.Set<T>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        private async Task<User> GetUserByEmployeeId(int id)
        {
            return await _context.Users
                   .FirstOrDefaultAsync(u => u.EmployeeId == id);
        }

        private async Task<AvaiableUser> GetAvaiblesByUserRole(int userId, int roleId)
        {
            return await _context.AvaiablesUser
                .FirstOrDefaultAsync(a => a.UserId == userId && a.RoleId == roleId);
        }
        //private async T
    }
}

