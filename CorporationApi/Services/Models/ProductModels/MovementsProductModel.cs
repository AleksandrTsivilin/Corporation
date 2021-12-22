using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels
{
    public class MovementsProductModel
    {
        public string Storage { get; set; }
        public ICollection<ProductModel> Products { get; set; }
    }
}
