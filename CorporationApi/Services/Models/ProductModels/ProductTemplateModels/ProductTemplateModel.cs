using Services.Models.ProductModels.ProductTemplateModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels
{
    public class ProductTemplateModel : BaseTemplateModel
    {
        public ProductCriteria Criteria { get; set; }
    }
}
