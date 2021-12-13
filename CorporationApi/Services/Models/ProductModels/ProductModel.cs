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
        public string Manufacturer { get; set; }
        public string Category { get; set; }
        public string Unit { get; set; }
        public bool IsBanned { get; set; }
    }
}
