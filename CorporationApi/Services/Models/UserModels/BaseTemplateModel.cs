using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models
{
    public class BaseTemplateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsOwner { get; set; }
        public string Owner { get; set; }
    }
}
