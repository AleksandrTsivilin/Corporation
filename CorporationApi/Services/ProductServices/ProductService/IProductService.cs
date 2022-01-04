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
        Task<List<ProductModel>> GetProductsByAccess(string access);
        List<ProductModel> GetProductsByUser(int id);
        Task<List<string>> AddProduct(NewProductModel model);
        Task <List<string>> UpdateProduct(NewProductModel model, int id);
        Task <List<string>> RemoveProduct(int id);
    }
}
