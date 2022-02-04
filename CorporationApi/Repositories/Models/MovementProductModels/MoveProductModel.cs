using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ProductModels
{
    public class MoveProductModel
    {
        public int From { get; set; }
        public int To { get; set; }
        public ICollection<MovementProduct> MovementProducts { get; set; }
    }

    public class MovementProduct
    {
        public int ProductId { get; set; }
        public int MovedCount { get; set; }
    }
}
