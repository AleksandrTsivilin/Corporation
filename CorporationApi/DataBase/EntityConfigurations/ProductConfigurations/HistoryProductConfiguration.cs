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
    class HistoryProductConfiguration
        : IEntityTypeConfiguration<HistoryProduct>
    {
        public void Configure(EntityTypeBuilder<HistoryProduct> builder)
        {         
            //public Product product { get; set; }
            builder.ToTable("HistoriesProduct");

            builder.HasKey(_ => _.Id);

            builder.HasOne(_ => _.Creator)
                .WithMany(_ => _.Histories)
                .HasForeignKey(_ => _.CreatorId);

            builder.HasOne(_ => _.Type)
                .WithMany(_ => _.Histories)
                .HasForeignKey(_ => _.TypeId);

            builder.Property(_ => _.Date)
                .ValueGeneratedOnAdd();

            builder.Property(_ => _.Description)
                .IsRequired()
                .HasMaxLength(255);

        }
    }
}
