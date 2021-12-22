using Services.Models;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductService
{
    public interface IProductService
    {
        List<ProductModel> Get();
        List<ProductModel> GetProductsByUser(int id);
        List<MovementsProductModel> AddProduct(AddProductModel model);
        ProductModel UpdateProduct(AddProductModel model, int id);
        ProductModel RemoveProduct(int id);
    }
}
