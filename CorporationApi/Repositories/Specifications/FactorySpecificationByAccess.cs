using DataBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class FactorySpecificationByAccess : BaseSpecification<Factory>
    {
        public FactorySpecificationByAccess(IdentityUserModel identity)
        {
            switch (identity.Access)
            {
                case "Full":
                    Expression = factory => true;
                    break;
                case "Region":
                    Expression = factory => factory.RegionId == identity.Location.RegionId;
                    break;
                case "Factory":
                    Expression = factory => factory.Id == identity.Location.FactoryId;
                    break;
                case "Department":
                    Expression = factory => factory.Id == identity.Location.FactoryId;
                    break;
            }
        }
    }
}
