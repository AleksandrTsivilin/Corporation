using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories;
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
        //private readonly DBContext _context;
        private readonly IRepository<CategoryProduct> _repository;

        public CategoryService(/*DBContext context,*/ IRepository<CategoryProduct> repository)
        {
           // _context = context;
            _repository = repository;
        }
        public async Task<List<CategoryModel>> GetCategories()
        {
            var categories = await _repository.Get();
            return categories
                .Select(c => new CategoryModel()
                {
                    Title = c.Title
                }).ToList();
            //return await _context.Categoties
            //    .Select((category) => new CategoryModel()
            //    {
            //        Title = category.Title
            //    }).ToListAsync();
        }
    }
}
