using Services.Models.UserModels.FactoryModels;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels.ProductTemplateModels
{
    public class ProductTemplateWithDetailModel : BaseTemplateModel
    {
        public RegionModel Region { get; set; }
        public FactoryModel Factory { get; set; }
        public StorageModel Storage { get; set; }
        public ManufacturerModel Manufacturer { get; set; }
        public CategoryModel Category { get; set; }
        public UnitModel Unit { get; set; }
        public int StartCount { get; set; }
        public int EndCount { get; set; }
        public decimal StartPrice { get; set; }
        public decimal EndPrice { get; set; }
    }
}
