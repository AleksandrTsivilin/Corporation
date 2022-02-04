using DataBase;
using DataBase.Entities;
using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.UserEntities;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Repositories.DepartmentRepositories;
using Repositories.EmployeeRepositories;
using Repositories.Models.UserManagerModels;
using Repositories.Specifications;
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
        public async Task<User> GetTryUser(LoginModel model)
        {
            var user = await _context.Users
                .Include(user => user.Department)
                    .ThenInclude(department => department.Factory)
                        .ThenInclude(factory => factory.Region)
                .Include(user => user.Employee)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiable => avaiable.Access)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.Role)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.AvaiablesUser_Permissions)
                        .ThenInclude(ap => ap.Permission)
                .FirstOrDefaultAsync(user => user.Username == model.Username);

            if (user is null) return null;

            var hashedPassword = GetHashedPassword(model.Password, user.Salt);

            return !hashedPassword.Equals(user.HashedPassword)
                ? null
                : user;

        }

        public async Task<List<User>> GetByAccess(UserSpecificationByAccess specification)
        {
            return await _context.Users
                .Include(user => user.Department)
                .Include(user => user.Employee)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiable => avaiable.Access)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.Role)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.AvaiablesUser_Permissions)
                        .ThenInclude(ap => ap.Permission)
                .Where(specification.Expression)
                .ToListAsync();
        }
        public async Task<int> AddUserWithAvaiables(NewUserWithAvaiables model)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var employee = await GetEntityById<Employee>(model.EmployeeId);

                var salt = new byte[512 / 8];
                _cryptoServiceProvider.GetNonZeroBytes(salt);

                var hashedPassword = GetHashedPassword(model.Password, salt);

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

                    if (access is null) throw new Exception();

                    var role = await GetEntityById<Role>(avaiable.RoleId);

                    if (role is null) throw new Exception();
                    await AddAvaiableUser(addedUser.Id, role.Id, access.Id);

                    var addedAvaiables = await GetAvaiblesByUserRole(addedUser.Id, avaiable.RoleId);

                    if (addedAvaiables is null) throw new Exception();

                    await AddNewPermissions(addedAvaiables,avaiable);
                }
                transaction.Commit();
                return employee.DepartmentId;

            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                Console.WriteLine(ex.InnerException.Message);
                transaction.Rollback();
                return 0;
            } 
        }

        public async Task<int> UpdateUserAvaiables(NewAvaiable[] avaiables, int userId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = await GetUserByIdWithAvaiables(userId);

                if (user is null) throw new Exception();

                if (avaiables.Length < user.Avaiables.Count)
                {
                    await RemoveAvaiablesUser(user.Avaiables.ToList(), avaiables.ToList());
                }
                foreach (var addedAvaiable in avaiables)
                {
                    var avaiable = user.Avaiables
                        .FirstOrDefault(avaiable => 
                        avaiable.RoleId == addedAvaiable.RoleId);

                    if (avaiable is null)
                    {
                        await AddAvaiableUser(userId, addedAvaiable.RoleId, addedAvaiable.AccessId);

                        var avaiableUser = await GetAvaiblesByUserRole(userId, addedAvaiable.RoleId);

                        if (avaiableUser is null) throw new Exception();
                        await AddNewPermissions(avaiableUser,addedAvaiable);
                    }
                    else
                    {
                        var avaiablesUser = await _context.AvaiablesUser
                            .Include(a => a.AvaiablesUser_Permissions)
                            .FirstOrDefaultAsync(a => a.UserId == userId);

                        var addedRole = await GetEntityById<Role>(addedAvaiable.RoleId);
                        if (addedRole is null) throw new Exception();

                        avaiablesUser.RoleId = addedAvaiable.RoleId;

                        var addedAccess = await GetEntityById<Access>(addedAvaiable.AccessId);
                        if (addedAccess is null) throw new Exception();

                        avaiablesUser.AccessId = addedAvaiable.AccessId;
                        await _context.SaveChangesAsync();
                        await AddNewPermissions(avaiablesUser, addedAvaiable);

                    }
                }
                transaction.Commit();
                return user.DepartmentId;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return 0;
            }

        }
        public async Task<int> BanUser(int userId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = await GetEntityById<User>(userId);
                if (user is null) throw new Exception();
                user.IsBanned = !user.IsBanned;
                await _context.SaveChangesAsync();
                transaction.Commit();
                return user.DepartmentId;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return 0;
            }
        }
        public async Task<User> AddUserWithRegistrationId(NewUserWithRegistrationId model)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var employee = await GetEntityById<Employee>(model.RegistrationId);
                if (employee is null) throw new Exception();
                var salt = new byte[512 / 8];
                _cryptoServiceProvider.GetNonZeroBytes(salt);

                var hashedPassword = GetHashedPassword(model.Password, salt);
                await _context.Users.AddAsync(new User
                {
                    EmployeeId = employee.Id,
                    Username = model.Username,
                    HashedPassword = hashedPassword,
                    Salt = salt,
                    DepartmentId = employee.DepartmentId
                });
                await _context.SaveChangesAsync();
                var newUser = await _context.Users
                    .Include(user => user.Department)
                        .ThenInclude(department => department.Factory)
                            .ThenInclude(factory => factory.Region)
                    .FirstOrDefaultAsync(user => user.EmployeeId == employee.Id);
                if (newUser is null) throw new Exception();

                transaction.Commit();
                return newUser;
    
            }
            catch ( Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }
        private async Task<User> GetUserByIdWithAvaiables(int userId)
        {
            return await _context.Users
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiable => avaiable.Access)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.Role)
                .Include(user => user.Avaiables)
                    .ThenInclude(avaiables => avaiables.AvaiablesUser_Permissions)
                        .ThenInclude(ap => ap.Permission)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        private async Task AddNewPermissions(AvaiableUser avaiableUser, NewAvaiable newAvaiable)
        {
            var addedPermissions = new List<AvaiablesUserPermission>();
            foreach (var addedPermissionId in newAvaiable.PermissionsId)
            {
                var permission = await GetEntityById<Permission>(addedPermissionId);

                if (permission is null) 
                    throw new Exception();
                var avaiablePermission = new AvaiablesUserPermission
                {
                    AvaiablesUserId = avaiableUser.Id,
                    PermissionId = addedPermissionId
                };

                addedPermissions.Add(avaiablePermission);
            }
            avaiableUser.AvaiablesUser_Permissions = addedPermissions;
            await _context.SaveChangesAsync();

        }

        private async Task AddAvaiableUser(int userId, int roleId, int accessId)
        {
            await _context.AvaiablesUser.AddAsync(
                new AvaiableUser
                {
                    UserId = userId,
                    RoleId = roleId,
                    AccessId = accessId,
                });
            await _context.SaveChangesAsync();
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

        private async Task RemoveAvaiablesUser
            (List<AvaiableUser> avaiablesUser, List<NewAvaiable> avaiables)
        {
            foreach (var avaiableUser in avaiablesUser)
            {
                var hasAvaiable = avaiables
                    .FirstOrDefault(a => a.RoleId == avaiableUser.RoleId);
                if (hasAvaiable is null)
                    _context.AvaiablesUser.Remove(avaiableUser);
            }
            await _context.SaveChangesAsync();
        }

        
    }
}

