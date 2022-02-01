using DataBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class RegionSpecificationByAccess : BaseSpecification<Region>
    {
        public RegionSpecificationByAccess(IdentityUserModel identity)
        {
            Expression = identity.Access == "Full"
                    ? region => true
                    : region => region.Id == identity.Location.RegionId;
        }
    }
}
