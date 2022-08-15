using DataBase.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.ProductEntities
{
    public class ProductTemplateUser : BaseEntity
    {
        public bool IsOwner { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public ProductTemplate Template { get; set; }
        public int TemplateId { get; set; }
    }
}
