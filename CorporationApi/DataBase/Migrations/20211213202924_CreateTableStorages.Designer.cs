﻿// <auto-generated />
using System;
using DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataBase.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20211213202924_CreateTableStorages")]
    partial class CreateTableStorages
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

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

                    b.Property<int>("AvaiableCount")
                        .HasColumnType("int");

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

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

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
#pragma warning restore 612, 618
        }
    }
}
