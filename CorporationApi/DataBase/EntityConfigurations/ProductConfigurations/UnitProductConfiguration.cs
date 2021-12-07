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
    public class UnitProductConfiguration
        : IEntityTypeConfiguration<UnitProduct>
    {
        public void Configure(EntityTypeBuilder<UnitProduct> builder)
        {
            builder.ToTable("UnitsProduct");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
