using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.EntityConfigurations.ProductConfigurations
{
    public class CreatorRecordConfiguration
        : IEntityTypeConfiguration<CreatorRecord>
    {
        public void Configure(EntityTypeBuilder<CreatorRecord> builder)
        {
            builder.ToTable("CreatorsRecord");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.LastName)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.FirstName)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.Position)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
