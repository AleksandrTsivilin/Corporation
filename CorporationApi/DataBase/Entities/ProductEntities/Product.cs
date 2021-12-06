using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class Product
    {
        
        public int Id { get; set; }
        public string Title { get; set; }
        public CategotyProduct Categoty { get; set; }
        public UnitProduct Unit { get; set; }
        public ManufactureProduct Manufacture { get; set; }
        public decimal Price { get; set; }
        public int AvaiableCount { get; set; }
        public ICollection< HistoryProduct> Histories { get; set; }
        public bool IsBanned { get; set; }
            

        
    }
}
