using DataBase.Entities;
using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.ProductModels
{
    public class ProductTemplateWithDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsOwner { get; set; }
        public string Owner { get; set; }
        public Region Region { get; set; }
        public Factory Factory { get; set; }
        public Storage Storage { get; set; }
        public ManufacturerProduct Manufacturer { get; set; }
        public CategoryProduct Category { get; set; }
        public UnitProduct Unit { get; set; }
        public int StartCount { get; set; }
        public int EndCount { get; set; }
        public decimal StartPrice { get; set; }
        public decimal EndPrice { get; set; }
    }
}
