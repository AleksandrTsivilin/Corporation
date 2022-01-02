using DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.EntityConfigurations.ProductConfigurations
{
    class FactoryConfiguration
        : IEntityTypeConfiguration<Factory>
    {
        public void Configure(EntityTypeBuilder<Factory> builder)
        {
            builder.ToTable("Factories");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);
            builder.HasOne(_ => _.Region)
                .WithMany(_ => _.Factories)
                .HasForeignKey(_ => _.RegionId);
        }
    }
}
