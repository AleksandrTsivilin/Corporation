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
    class ProductTemplateConfiguration
         : IEntityTypeConfiguration<ProductTemplate>
    {
        public void Configure(EntityTypeBuilder<ProductTemplate> builder)
        {
            builder.ToTable("ProductTemplates");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(_ => _.RegionId)
                .IsRequired();

            builder.Property(_ => _.FactoryId)
                .IsRequired();

            builder.Property(_ => _.StorageId)
                .IsRequired();

            builder.Property(_ => _.ManufacturerId)
                .IsRequired();

            builder.Property(_ => _.CategoryId)
                .IsRequired();

            builder.Property(_ => _.UnitId)
                .IsRequired();

            builder.Property(_ => _.StartCount)
                .IsRequired();

            builder.Property(_ => _.EndCount)
                .IsRequired();

            builder.Property(_ => _.StartPrice)
                .IsRequired();

            builder.Property(_ => _.EndPrice)
                .IsRequired();

            builder.HasOne(_ => _.User)
                .WithMany(_ => _.ProductTemplates)
                .HasForeignKey(_ => _.UserId);
        }
    }
}
