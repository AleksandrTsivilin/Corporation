using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities
{
    public class Region
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Factory> Factories { get; set; }
    }
}
