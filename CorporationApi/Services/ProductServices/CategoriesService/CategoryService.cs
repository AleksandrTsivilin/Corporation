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
        private readonly IRepository<CategoryProduct> _repository;

        public CategoryService(IRepository<CategoryProduct> repository)
        {
            _repository = repository;
        }

        public async Task<CategoryModel> GetById(int id)
        {
            var category = await _repository.GetById(id);

            return category is null ? null : GetCategoryModel(category);
        }

        public async Task<List<CategoryModel>> GetCategories()
        {
            var categories = await _repository.Get();
            return categories
                .Select(c => new CategoryModel()
                {
                    Id = c.Id,
                    Title = c.Title
                }).ToList();
        }

        private CategoryModel GetCategoryModel(CategoryProduct category)
        {
            return new CategoryModel
            {
                Id = category.Id,
                Title = category.Title
            };
        }

    }
}
