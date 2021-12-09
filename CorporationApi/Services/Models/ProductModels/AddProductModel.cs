using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels
{
    public class AddProductModel
    {
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int AvaiableCount { get; set; }
        public string Manufacturer { get; set; }
        public string Category { get; set; }
        public string Unit { get; set; }
        
    }

    public class ManufacturerModel
    {
        public string Title { get; set; }
    }

    public class CategoryModel
    {
        public string Title { get; set; }
    }

    public class UnitModel
    {
        public string Title { get; set; }
    }
}
