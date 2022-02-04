using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.ProductModels
{
    public class SpecificationProduct
    {
        public ManufacturerProduct Manufacturer { get; set; }
        public CategoryProduct Category { get; set; }
        public UnitProduct Unit { get; set; }
    }
}
