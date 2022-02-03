﻿using Repositories.Models.ProductModels;
using Repositories.Specifications;
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
        Task<List<ProductModel>> GetProductsByAccess(IdentityUserModel identity);
        List<ProductModel> GetProductsByUser(int id);
        Task<List<int>> AddProduct(NewProductModel model);
        Task <List<int>> UpdateProduct(NewProductModel model, int id);
        Task <List<string>> RemoveProduct(int id);
    }
}
