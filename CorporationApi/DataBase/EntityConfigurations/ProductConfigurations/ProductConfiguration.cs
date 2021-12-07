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
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {         
            //public ICollection<HistoryProduct> Histories { get; set; }            

            builder.ToTable("Products");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.Title)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasOne(_ => _.Category)
                .WithMany(_ => _.Products)
                .HasForeignKey(_ => _.CategoryId);

            builder.HasOne(_ => _.Unit)
                .WithMany(_ => _.Products)
                .HasForeignKey(_ => _.UnitId);

            builder.HasOne(_ => _.Manufacture)
                .WithMany(_ => _.Products)
                .HasForeignKey(_ => _.ManufactureId);

            builder.Property(_ => _.Price)
                .IsRequired();

            builder.Property(_ => _.AvaiableCount)
                .IsRequired();

            builder.Property(_ => _.IsBanned)
                .HasDefaultValue(false);
        }
    }    
}
