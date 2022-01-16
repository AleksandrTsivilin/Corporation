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
    public class PermissionConfiguration
    : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.ToTable("Permissions");
            builder.HasKey(_ => _.Id);
            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);


            builder.HasOne(_ => _.AvaiableUser)
                .WithMany(_ => _.Permissions)
                .HasForeignKey(_ => _.AvaiableUserId);
        }
    }
}
