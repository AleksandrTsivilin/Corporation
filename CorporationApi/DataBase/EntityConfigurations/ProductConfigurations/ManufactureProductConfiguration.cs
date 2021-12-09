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
    public class ManufactureProductConfiguration
        : IEntityTypeConfiguration<ManufacturerProduct>
    {
        public void Configure(EntityTypeBuilder<ManufacturerProduct> builder)
        {
            builder.ToTable("ManufacturesProduct");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
