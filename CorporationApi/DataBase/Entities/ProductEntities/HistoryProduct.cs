using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class HistoryProduct
    {
        public int Id { get; set; }
        public CreatorRecord Creator { get; set; }
        public TypeRecord Type { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public Product product { get; set; }
    }
}
