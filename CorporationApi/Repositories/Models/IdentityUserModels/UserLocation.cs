using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.IdentityUserModels
{
    public class UserLocation
    {
        public int RegionId { get; set; }
        public int FactoryId { get; set; }
        public int DepartmentId { get; set; }
    }
}
