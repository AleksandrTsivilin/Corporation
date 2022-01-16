using DataBase.Entities.EmployeeEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.EntityConfigurations.EmployeeConfigurations
{
    public class EmployeeConfiguration
    : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("Employees");
            builder.HasKey(_ => _.Id);
            builder.Property(_ => _.Lastname)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.Firstname)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.RegistrationToken);

            builder.HasOne(_ => _.Department)
                .WithMany(_ => _.Employees)
                .HasForeignKey(_ => _.DepartmentId);
        }
    }
}
