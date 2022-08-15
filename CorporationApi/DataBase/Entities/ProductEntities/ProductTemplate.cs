using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class ProductTemplate : BaseEntity
    {
        public string Title { get; set; }
        public int RegionId { get; set; }
        public int FactoryId { get; set; }
        public int StorageId { get; set; }
        public int ManufacturerId { get; set; }
        public int CategoryId { get; set; }
        public int UnitId { get; set; }
        public int StartCount { get; set; }
        public int EndCount { get; set; }
        public decimal StartPrice { get; set; }
        public decimal EndPrice { get; set; }
        public List<ProductTemplateUser> Users { get; set; }
    }
}
