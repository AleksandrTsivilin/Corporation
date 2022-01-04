using DataBase;
using Microsoft.EntityFrameworkCore;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.CategoriesService
{
    public class CategoryService : ICategoryService
    {
        private readonly DBContext _context;

        public CategoryService(DBContext context)
        {
            _context = context;
        }
        public async Task<List<CategoryModel>> GetCategories()
        {
            return await _context.Categoties
                .Select((category) => new CategoryModel()
                {
                    Title = category.Title
                }).ToListAsync();
        }
    }
}
