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
    public class ProductTemplateUserConfiguration

         : IEntityTypeConfiguration<ProductTemplateUser>
    {
        public void Configure(EntityTypeBuilder<ProductTemplateUser> builder)
        {
            builder.ToTable("ProductTemplatesUser");

            builder.HasKey(_ => _.Id);

            builder.Property(_ => _.IsOwner)
                .IsRequired();

            builder.HasOne(ptu => ptu.Template)
               .WithMany(pt => pt.Users)
               .HasForeignKey(ptu => ptu.TemplateId);

            builder.HasOne(ptu => ptu.User)
                .WithMany(u => u.ProductTemplates)
                .HasForeignKey(ptu => ptu.UserId);

        }
    }
}
