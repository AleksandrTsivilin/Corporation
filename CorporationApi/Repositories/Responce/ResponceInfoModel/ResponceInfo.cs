using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.ResponceInfoModel
{

    public class ResponceInfo<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public TypeOperation Type { get; set; }
    }
}
