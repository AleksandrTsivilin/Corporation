using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.ProductModels
{
    public class NewProductModel
    {
        public int StorageId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int ManufacturerId { get; set; }
        public int CategoryId { get; set; }
        public int UnitId { get; set; }
        public int Count { get; set; }

    }
}
