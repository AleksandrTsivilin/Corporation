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
    public class TypeRecordConfiguration
        : IEntityTypeConfiguration<TypeRecord>
    {
        public void Configure(EntityTypeBuilder<TypeRecord> builder)
        {
            builder.ToTable("TypesRecord");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Type)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
