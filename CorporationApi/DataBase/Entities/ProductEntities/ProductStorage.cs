using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class ProductStorage
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int StorageId { get; set; }
        public Product Product { get; set; }
        public Storage Storage { get; set; }

        //added for migration MoveColumnCountToProductStorage
        public int CountProduct { get; set; }
    }
}
