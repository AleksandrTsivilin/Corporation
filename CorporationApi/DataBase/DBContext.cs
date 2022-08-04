using DataBase.Entities;
using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.ProductEntities;
using DataBase.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase
{
    public class DBContext:DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<CategoryProduct> Categoties { get; set; }
        public DbSet<CreatorRecord> Creators { get; set; }
        public DbSet<HistoryProduct> Histories { get; set; }
        public DbSet<ManufacturerProduct> Manufactures { get; set; }
        public DbSet<TypeRecord> Types { get; set; }
        public DbSet<UnitProduct> Units { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<ProductStorage> Product_Storage { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Factory> Factories { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<AvaiableUser> AvaiablesUser { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Access> Accesses { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<AvaiablesUserPermission> AvaiablesUser_Permissions { get; set; }
        public DbSet<ProductTemplate> ProductTemplates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = @"Data Source=DESKTOP-ABUB89D\SQLEXPRESS;Initial Catalog=Coorporation;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DBContext).Assembly);


            base.OnModelCreating(modelBuilder);
        }
    }
}
