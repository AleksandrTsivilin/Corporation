using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.CategoriesService
{
    public interface ICategoryService
    {
        Task<List<CategoryModel>> GetCategories();
        Task<CategoryModel> GetById(int id);
    }
}
