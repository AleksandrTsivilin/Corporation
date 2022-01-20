﻿// <auto-generated />
using System;
using DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataBase.Migrations
{
    [DbContext(typeof(DBContext))]
    partial class DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("DataBase.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("FactoryId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("FactoryId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("DataBase.Entities.EmployeeEntities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid>("RegistrationToken")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("DataBase.Entities.Factory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("RegionId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.ToTable("Factories");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.CategoryProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("CategoriesProduct");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.CreatorRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("CreatorsRecord");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.HistoryProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("CreatorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("TypeId")
                        .HasColumnType("int");

                    b.Property<int?>("productId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("TypeId");

                    b.HasIndex("productId");

                    b.ToTable("HistoriesProduct");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.ManufacturerProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("ManufacturesProduct");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<bool>("IsBanned")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<int>("ManufactureId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("UnitId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ManufactureId");

                    b.HasIndex("UnitId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.ProductStorage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("CountProduct")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(0);

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("StorageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("StorageId");

                    b.ToTable("ProductStorage");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Storage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId")
                        .IsUnique();

                    b.ToTable("Storages");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.TypeRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("TypesRecord");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.UnitProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("UnitsProduct");
                });

            modelBuilder.Entity("DataBase.Entities.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Access", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accesses");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.AvaiableUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("AccessId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccessId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AvaiablesUser");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.AvaiablesUserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("AvaiablesUserId")
                        .HasColumnType("int");

                    b.Property<int>("PermissionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AvaiablesUserId");

                    b.HasIndex("PermissionId");

                    b.ToTable("AvaiablesUserPermissions");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<byte[]>("Salt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("EmployeeId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DataBase.Entities.Department", b =>
                {
                    b.HasOne("DataBase.Entities.Factory", "Factory")
                        .WithMany("Departments")
                        .HasForeignKey("FactoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Factory");
                });

            modelBuilder.Entity("DataBase.Entities.EmployeeEntities.Employee", b =>
                {
                    b.HasOne("DataBase.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("DataBase.Entities.Factory", b =>
                {
                    b.HasOne("DataBase.Entities.Region", "Region")
                        .WithMany("Factories")
                        .HasForeignKey("RegionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Region");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.HistoryProduct", b =>
                {
                    b.HasOne("DataBase.Entities.ProductEntities.CreatorRecord", "Creator")
                        .WithMany("Histories")
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.ProductEntities.TypeRecord", "Type")
                        .WithMany("Histories")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.ProductEntities.Product", "product")
                        .WithMany("Histories")
                        .HasForeignKey("productId");

                    b.Navigation("Creator");

                    b.Navigation("product");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Product", b =>
                {
                    b.HasOne("DataBase.Entities.ProductEntities.CategoryProduct", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.ProductEntities.ManufacturerProduct", "Manufacture")
                        .WithMany("Products")
                        .HasForeignKey("ManufactureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.ProductEntities.UnitProduct", "Unit")
                        .WithMany("Products")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Manufacture");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.ProductStorage", b =>
                {
                    b.HasOne("DataBase.Entities.ProductEntities.Product", "Product")
                        .WithMany("ProductStorages")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.ProductEntities.Storage", "Storage")
                        .WithMany("StorageProducts")
                        .HasForeignKey("StorageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Storage");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Storage", b =>
                {
                    b.HasOne("DataBase.Entities.Department", "Department")
                        .WithOne("Storage")
                        .HasForeignKey("DataBase.Entities.ProductEntities.Storage", "DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.AvaiableUser", b =>
                {
                    b.HasOne("DataBase.Entities.UserEntities.Access", "Access")
                        .WithMany("AvaiablesUser")
                        .HasForeignKey("AccessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.UserEntities.Role", "Role")
                        .WithMany("AvaiablesUser")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.UserEntities.User", "User")
                        .WithMany("Avaiables")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Access");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.AvaiablesUserPermission", b =>
                {
                    b.HasOne("DataBase.Entities.UserEntities.AvaiableUser", "AvaiableUser")
                        .WithMany("AvaiablesUser_Permissions")
                        .HasForeignKey("AvaiablesUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.UserEntities.Permission", "Permission")
                        .WithMany("AvaiablesUser_Permission")
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AvaiableUser");

                    b.Navigation("Permission");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.User", b =>
                {
                    b.HasOne("DataBase.Entities.Department", "Department")
                        .WithMany("Users")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataBase.Entities.EmployeeEntities.Employee", "Employee")
                        .WithOne("User")
                        .HasForeignKey("DataBase.Entities.UserEntities.User", "EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("DataBase.Entities.Department", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Storage");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("DataBase.Entities.EmployeeEntities.Employee", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("DataBase.Entities.Factory", b =>
                {
                    b.Navigation("Departments");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.CategoryProduct", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.CreatorRecord", b =>
                {
                    b.Navigation("Histories");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.ManufacturerProduct", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Product", b =>
                {
                    b.Navigation("Histories");

                    b.Navigation("ProductStorages");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.Storage", b =>
                {
                    b.Navigation("StorageProducts");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.TypeRecord", b =>
                {
                    b.Navigation("Histories");
                });

            modelBuilder.Entity("DataBase.Entities.ProductEntities.UnitProduct", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("DataBase.Entities.Region", b =>
                {
                    b.Navigation("Factories");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Access", b =>
                {
                    b.Navigation("AvaiablesUser");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.AvaiableUser", b =>
                {
                    b.Navigation("AvaiablesUser_Permissions");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Permission", b =>
                {
                    b.Navigation("AvaiablesUser_Permission");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.Role", b =>
                {
                    b.Navigation("AvaiablesUser");
                });

            modelBuilder.Entity("DataBase.Entities.UserEntities.User", b =>
                {
                    b.Navigation("Avaiables");
                });
#pragma warning restore 612, 618
        }
    }
}
