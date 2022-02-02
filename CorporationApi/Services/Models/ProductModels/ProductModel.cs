using Services.Models.DepartmentModels;
using Services.Models.ProductModels;
using Services.Models.UserModels.FactoryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }
        public ManufacturerModel Manufacturer { get; set; }
        public CategoryModel Category { get; set; }
        public UnitModel Unit { get; set; }
        public bool IsBanned { get; set; }
    }
}
