using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.EntityConfigurations.UserConfigurations
{
    public class UserConfiguration
    : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(_ => _.Id);
            builder.Property(_ => _.Username)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(_ => _.Email)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(_ => _.Salt)
                .IsRequired();

            builder.Property(_ => _.HashedPassword)
                .IsRequired()
                .HasMaxLength(255);
            builder.HasOne(_ => _.Employee)
                .WithOne(_ => _.User)
                .HasForeignKey<User>(_ => _.EmployeeId);
        }
    }
}
