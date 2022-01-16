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
    public class AvaiableUserConfiguration
    : IEntityTypeConfiguration<AvaiableUser>
    {
        public void Configure(EntityTypeBuilder<AvaiableUser> builder)
        {
            builder.ToTable("AvaiablesUser");
            builder.HasKey(_ => _.Id);

            builder.HasOne(a => a.Role)
                .WithMany(r => r.AvaiablesUser)
                .HasForeignKey(a => a.RoleId);

            builder.HasOne(a => a.Access)
                .WithMany(a => a.AvaiablesUser)
                .HasForeignKey(a => a.AccessId);

            builder.HasOne(_ => _.User)
                .WithMany(_ => _.Avaiables)
                .HasForeignKey(_ => _.UserId);
        }
    }
}
