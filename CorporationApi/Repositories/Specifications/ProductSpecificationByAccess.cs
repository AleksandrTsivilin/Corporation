using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class ProductSpecificationByAccess : BaseSpecification<Product>
    {
        public ProductSpecificationByAccess(IdentityUserModel identity)
        {
            switch (identity.Access)
            {
                case "Full":
                    Expression = product => true;
                    break;
                case "Region":
                    Expression = product => product.ProductStorages
                       .Any<ProductStorage>(ps => ps.Storage.Department.Factory.Region.Id == identity.Location.RegionId);
                    break;
                case "Factory":
                    Expression = product => product.ProductStorages
                        .Any<ProductStorage>(ps => ps.Storage.Department.FactoryId == identity.Location.FactoryId);
                    break;
                case "Department":
                    Expression = product => product.ProductStorages
                         .Any<ProductStorage>(ps => ps.Storage.DepartmentId == identity.Location.DepartmentId);
                    break;
            }
        }
    }
}
