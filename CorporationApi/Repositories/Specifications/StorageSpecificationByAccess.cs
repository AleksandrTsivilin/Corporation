using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class StorageSpecificationByAccess : BaseSpecification<Storage>
    {
        public StorageSpecificationByAccess(IdentityUserModel identity)
        {
            switch (identity.Access)
            {
                case "Full":
                    Expression = storage => true;
                    break;
                case "Region":
                    Expression = storage => storage.Department.Factory.RegionId == identity.Location.RegionId;
                    break;
                case "Factory":
                    Expression = storage => storage.Department.FactoryId == identity.Location.FactoryId;
                    break;
                case "Department":
                    Expression = storage => storage.DepartmentId == identity.Location.DepartmentId;
                    break;
            }
        }
    }
}
