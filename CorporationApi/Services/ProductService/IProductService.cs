using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductService
{
    public interface IProductService
    {
        List<ProductModel> Get();
    }
}
