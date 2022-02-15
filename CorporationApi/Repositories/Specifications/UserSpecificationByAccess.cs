using DataBase.Entities;
using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class UserSpecificationByAccess : BaseSpecification<User>
    {
        public UserSpecificationByAccess(IdentityUserModel identity)
        {
            switch (identity.Access)
            {
                case "Full":
                    Expression = user => user.Id != identity.UserId;
                    break;
                case "Region":
                    Expression = user => 
                        user.Department.Factory.Region.Id == identity.Location.RegionId
                        && user.Id != identity.UserId;
                    break;
                case "Factory":
                    Expression = user =>
                        user.Department.Factory.Id == identity.Location.FactoryId
                        && user.Id != identity.UserId;
                    break;
                case "Department":
                    Expression = user =>
                        user.DepartmentId == identity.Location.DepartmentId
                        && user.Id != identity.UserId;
                    break;
            }
        }

        private Region GetRegionByUser(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
