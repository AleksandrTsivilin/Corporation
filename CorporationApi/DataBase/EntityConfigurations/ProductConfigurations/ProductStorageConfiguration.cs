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
    public class ProductStorageConfiguration
        : IEntityTypeConfiguration<ProductStorage>
    {
        public void Configure(EntityTypeBuilder<ProductStorage> builder)
        {
            builder.ToTable("ProductStorage");

            builder.HasKey(_ => _.Id);

            builder.HasOne(ps => ps.Product)
               .WithMany(p => p.ProductStorages)
               .HasForeignKey(ps => ps.ProductId);

            builder.HasOne(ps => ps.Storage)
               .WithMany(s => s.StorageProducts)
               .HasForeignKey(ps => ps.StorageId);
        }

    }
}
