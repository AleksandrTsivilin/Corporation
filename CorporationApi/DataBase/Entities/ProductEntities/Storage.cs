using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class Storage : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<ProductStorage> StorageProducts { get; set; }
        public Department Department { get; set; }
        public int DepartmentId { get; set; }

    }
}
