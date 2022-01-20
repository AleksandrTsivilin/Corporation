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
    public class AvaiablesUserPermissionConfiguration
        : IEntityTypeConfiguration<AvaiablesUserPermission>
    {
        public void Configure(EntityTypeBuilder<AvaiablesUserPermission> builder)
        {
            builder.ToTable("AvaiablesUserPermissions");
            builder.HasKey(_ => _.Id);

            builder.HasOne(ap => ap.AvaiableUser)
                .WithMany(a => a.AvaiablesUser_Permissions)
                .HasForeignKey(ap => ap.AvaiablesUserId);

            builder.HasOne(ap => ap.Permission)
                .WithMany(p => p.AvaiablesUser_Permission)
                .HasForeignKey(ap => ap.PermissionId);
        }
    }
}
