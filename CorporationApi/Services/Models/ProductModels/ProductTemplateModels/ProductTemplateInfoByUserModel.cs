using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels.ProductTemplateModels
{
    public class ProductTemplateInfoByUserModel : ProductTemplateModel
    {
        public int CountUser { get; set; }
        public bool IsSaved { get; set; }
    }
}
