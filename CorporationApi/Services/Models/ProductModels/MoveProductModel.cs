using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels
{
    public class MoveProductModel
    {
        public string From { get; set; }
        public string To { get; set; }
        public ICollection<MovedProduct> MovedProducts { get; set; }
    }

    public class MovedProduct
    {
        public int Id { get; set; }
        public int CountMoved { get; set; }
    }
}
