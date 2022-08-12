using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class Product : BaseEntity
    {
        public string Title { get; set; }
        public CategoryProduct Category { get; set; }
        public int CategoryId { get; set; }
        public UnitProduct Unit { get; set; }
        public int UnitId { get; set; }
        public ManufacturerProduct Manufacture { get; set; }
        public int ManufactureId { get; set; }
        public decimal Price { get; set; }
        public ICollection< HistoryProduct> Histories { get; set; }
        public bool IsBanned { get; set; }
        public ICollection<ProductStorage> ProductStorages { get; set; }

    }
}
