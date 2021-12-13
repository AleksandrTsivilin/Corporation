using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Services.Models;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using ManufacturerModel = Services.Models.ManufacturerModel;

namespace Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly DBContext _context;
        public ProductService(DBContext context)
        {
            _context = context;
        }
        public  List<ProductModel> Get()
        {
            return _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Select((product)=>new ProductModel()
                {
                    Id=product.Id,
                    Title=product.Title,
                    Price=product.Price,
                    Count=product.AvaiableCount,
                    Manufacturer=product.Manufacture.Title,
                    Category=product.Category.Title,
                    Unit=product.Unit.Title,
                    IsBanned=product.IsBanned
                    
                })
                .ToList();

            
            //return new List<ProductModel>();
            
        }

        public List<ManufacturerModel> GetManufacturers()
        {
            
            return _context.Manufactures                
                .Select((manufacturer)=>new Models.ProductModels.ManufacturerModel()
                {
                   Title=manufacturer.Title
                }).ToList();
        }

        public List<CategoryModel> GetCategories()
        {
            return _context.Categoties
                .Select((category) => new CategoryModel()
                {
                    Title = category.Title
                }).ToList();
        }

        public List<UnitModel> GetUnits()
        {
            return _context.Units
                .Select((unit) => new UnitModel()
                {
                    Title = unit.Title
                }).ToList();
        }

        public  ProductModel AddProduct(AddProductModel model)
        {
            var manufacturer = _context.Manufactures
                .FirstOrDefault(m => m.Title == model.Manufacturer);

            if (manufacturer is null) return null;

            var category = _context.Categoties
                .FirstOrDefault(c => c.Title == model.Category);

            if (category is null) return null;

            var unit = _context.Units
                .FirstOrDefault(u => u.Title == model.Unit);

            if (unit is null) return null;

            _context.Products.Add(new Product
            {
                Title = model.Title,
                Price = model.Price,
                AvaiableCount = model.AvaiableCount,
                ManufactureId = manufacturer.Id,                
                CategoryId = category.Id,
                UnitId = unit.Id
            });

            _context.SaveChanges();

            var newProduct = _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .FirstOrDefault(p => p.Title == model.Title);

            return new ProductModel()
                {
                    Title= newProduct.Title,
                    Price= newProduct.Price,
                    Count= newProduct.AvaiableCount,
                    Manufacturer=newProduct.Manufacture.Title,
                    Category=newProduct.Category.Title,
                    Unit=newProduct.Unit.Title,
                    IsBanned=newProduct.IsBanned

                };
                

        }

        public ProductModel UpdateProduct(AddProductModel model, int id)
        {
            //var tempProduct = new AddProductModel();
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product is null) return null;

            var manufacturerId = GetIdManufacturer(model.Manufacturer);

            if (manufacturerId is null)
                return null;
            else product.ManufactureId =(int) manufacturerId;

            var categoryId = GetIdCategory(model.Category);

            if (categoryId is null)
                return null;
            else product.CategoryId = (int)categoryId;

            var unitId = GetIdUnit(model.Unit);

            if (unitId is null)
                return null;
            else product.UnitId = (int)unitId;

            product.Title = model.Title;
            product.Price = model.Price;
            product.AvaiableCount = model.AvaiableCount;
            
            

            _context.SaveChanges();
            return new ProductModel
            {
                Id=id,
                Title = model.Title,
                Price = model.Price,
                Count = model.AvaiableCount,
                Category = model.Category,
                Manufacturer = model.Manufacturer,
                Unit = model.Unit
            };
        }
        public ProductModel RemoveProduct(int id)
        {
            var product = _context.Products
                .FirstOrDefault(p => p.Id == id);
            if (product is null) return null;
            product.IsBanned = !product.IsBanned;
            _context.SaveChanges();

            var newProduct = _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .FirstOrDefault(p => p.Id == product.Id);
            return  new ProductModel
            {
                Id = id,
                Title = newProduct.Title,
                Price = newProduct.Price,
                Count = newProduct.AvaiableCount,
                Category = newProduct.Category.Title,
                Manufacturer = newProduct.Manufacture.Title,
                Unit = newProduct.Unit.Title,
                IsBanned=newProduct.IsBanned
            }; 
        }
        public ManufacturerModel AddManufacturer(ManufacturerModel model)
        {
            _context.Manufactures.Add(new ManufacturerProduct
            {
                Title = model.Title
            });

            _context.SaveChanges();

            var newManufacturer = _context.Manufactures
                .FirstOrDefault((m) => m.Title == model.Title);

            if (newManufacturer is null) return null;

            return new ManufacturerModel
            {
                Title = newManufacturer.Title
            };
        }

        public CategoryModel AddCategory(CategoryModel model)
        {
            _context.Categoties.Add(new CategoryProduct
            {
                Title = model.Title
            });

            _context.SaveChanges();

            var newCategory = _context.Categoties
                .FirstOrDefault((c) => c.Title == model.Title);

            if (newCategory is null) return null;

            return new CategoryModel
            {
                Title = newCategory.Title
            };
        }
        public UnitModel AddUnit(UnitModel model)
        {
            _context.Units.Add(new UnitProduct
            {
                Title = model.Title
            });

            _context.SaveChanges();

            var newUnit = _context.Units
                .FirstOrDefault((u) => u.Title == model.Title);

            if (newUnit is null) return null;

            return new UnitModel
            {
                Title = newUnit.Title
            };
        }
        private int? GetIdManufacturer(string title)
        {
            return _context.Manufactures
                .FirstOrDefault(m => m.Title == title)?.Id;
           
                
        }

        private int? GetIdCategory(string title)
        {
            return _context.Categoties
                .FirstOrDefault(c => c.Title == title)?.Id;
        }

        private int? GetIdUnit(string title)
        {
            return _context.Units
                .FirstOrDefault(u => u.Title == title)?.Id;
        }

        
    }
}
