using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductService
{
    public class ProductService : IProductService
    {
        public List<ProductModel> Get()
        {
            return  new List<ProductModel>
            {
                new ProductModel{Id=1, Title="product 1", Count=3.5},
                new ProductModel{Id=1, Title="product 2", Count=500},
                new ProductModel{Id=1, Title="product 3", Count=80.4},
                new ProductModel{Id=1, Title="product 4", Count=0.5}
            };
        }
    }
}
