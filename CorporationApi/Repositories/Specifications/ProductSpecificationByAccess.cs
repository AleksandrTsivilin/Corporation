using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class ProductSpecificationByAccess : BaseSpecification<ProductStorage>
    {
        public ProductSpecificationByAccess(IdentityUserModel identity)
        {
            switch (identity.Access)
            {
                case "Full":
                    Expression = productStorage => true;
                    break;
                case "Region":
                    Expression = productStorage => productStorage
                        .Storage.Department.Factory.RegionId == identity.Location.RegionId;
                    break;
                case "Factory":
                    Expression = productStorage => productStorage.Storage.Department.FactoryId == identity.Location.FactoryId;
                    break;
                case "Department":
                    Expression = productStorage => productStorage
                    .Storage.DepartmentId == identity.Location.DepartmentId;
                    break;
            }
        }
    }
}
