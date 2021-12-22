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
    public class ProductServiceTemplate : IProductServiceTemplate
    {
        private readonly DBContext _context;
        public ProductServiceTemplate(DBContext context)
        {
            _context = context;
        }
        public  List<ProductModel> Get()
        {
            return _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p=>p.ProductStorages)
                .Select((product)=>new ProductModel()
                {
                    Id=product.Id,
                    Title=product.Title,
                    Price=product.Price,
                    Count=product.ProductStorages
                    .Sum(ps=>ps.CountProduct),
                    Manufacturer=product.Manufacture.Title,
                    Category=product.Category.Title,
                    Unit=product.Unit.Title,
                    IsBanned=product.IsBanned
                    
                })
                .ToList();

            
            //return new List<ProductModel>();
            
        }

        public List<ProductModel> GetProductsByUser(int id)
        {
            
            return _context.Product_Storage
                .Include(ps => ps.Product)
                .Where(ps => ps.StorageId == 1)                
                .Select(ps => new ProductModel()
                {
                    Id=ps.Product.Id,
                    Title=ps.Product.Title,
                    Price=ps.Product.Price,
                    Count=ps.CountProduct,
                    Manufacturer=ps.Product.Manufacture.Title,
                    Category=ps.Product.Category.Title,
                    Unit=ps.Product.Unit.Title,
                    IsBanned=ps.Product.IsBanned

                }).ToList();
            

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
            var storage = _context.Storages
                .FirstOrDefault(s => s.Title == model.Storage);
            if (storage is null) return null;

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
                ManufactureId = manufacturer.Id,
                CategoryId = category.Id,
                UnitId = unit.Id,
                ProductStorages=new List<ProductStorage>
                {
                    new ProductStorage
                    {
                        StorageId=storage.Id,
                        CountProduct=model.AvaiableCount
                    }
                }
                
            });

            

            

            _context.SaveChanges();

            var newProduct = _context.Products
                .Include(p => p.Manufacture)
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .FirstOrDefault(p => p.Title == model.Title);

            

            return new ProductModel()
            {
                Title = newProduct.Title,
                Price = newProduct.Price,
                Manufacturer = newProduct.Manufacture.Title,
                Category = newProduct.Category.Title,
                Unit = newProduct.Unit.Title,
                IsBanned = newProduct.IsBanned

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
                //Count = newProduct.AvaiableCount,
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

        public List<StorageModel> GetStorages()
        {
            return _context.Storages
                .Select((storage) => new StorageModel()
                {
                    Title = storage.Title
                }).ToList();
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

        public StorageModel GetStorageByUser(int userId)
        {
            return new StorageModel
            {
                Title = "Storage 1"
            };
        }

        public List<MovementsProductModel> MovedProducts(MoveProductModel model)
        {
            var toStorage = _context.Storages
                .FirstOrDefault(s => s.Title == model.To);

            if (toStorage is null) return null;

            var fromStorage = _context.Storages
                .FirstOrDefault(s => s.Title == model.From);

            if (fromStorage is null) return null;

            
            var movementsFrom = new MovementsProductModel();
            var movementsTo = new MovementsProductModel();
            movementsFrom.Storage = fromStorage.Title;
            movementsTo.Storage = toStorage.Title;
            var resultMovements = new List<MovementsProductModel>();
            resultMovements.Add(new MovementsProductModel
            {
                Storage = fromStorage.Title,
                Products=new List<ProductModel>()
            });
            resultMovements.Add(new MovementsProductModel
            {
                Storage = toStorage.Title,
                Products=new List<ProductModel>()
            });

            foreach (var product in model.MovedProducts)
            {
                var product_storage = _context.Product_Storage
                    .Where(ps => ps.Storage.Id == fromStorage.Id)
                    .FirstOrDefault(ps => ps.Product.Id == product.Id);

                if (product_storage is null) continue;


                var productOnToStorage = _context.Product_Storage
                    .Where(ps => ps.StorageId == toStorage.Id)
                    .FirstOrDefault(ps => ps.Product.Id == product.Id);
                    
                if (productOnToStorage is null)
                {
                    _context.Product_Storage.Add(new ProductStorage{
                        ProductId=product.Id,
                        StorageId=toStorage.Id,
                        CountProduct=product.CountMoved
                    });

                    product_storage.CountProduct -= product.CountMoved;
                    _context.SaveChanges();
                }
                else
                {
                    productOnToStorage.CountProduct += product.CountMoved;
                    product_storage.CountProduct -= product.CountMoved;
                    _context.SaveChanges();
                }

                


            }
            var updatedProductsFrom = _context.Product_Storage
                .Include(ps => ps.Storage)
                .Include(ps => ps.Product)
                .Where(ps => ps.Storage.Id == fromStorage.Id)
                .Select(ps => new ProductModel
                {
                    Id=ps.Product.Id,
                    Title=ps.Product.Title,
                    Price=ps.Product.Price,
                    Count=ps.CountProduct,
                    Manufacturer=ps.Product.Manufacture.Title,
                    Category=ps.Product.Category.Title,
                    Unit=ps.Product.Unit.Title,
                    IsBanned=ps.Product.IsBanned
                })
                .ToList();

            resultMovements[0].Products = updatedProductsFrom;

            var updatedProductsTo = _context.Product_Storage
                .Include(ps => ps.Storage)
                .Include(ps => ps.Product)
                .Where(ps => ps.Storage.Id == toStorage.Id)
                .Select(ps => new ProductModel
                {
                    Id = ps.Product.Id,
                    Title = ps.Product.Title,
                    Price = ps.Product.Price,
                    Count = ps.CountProduct,
                    Manufacturer = ps.Product.Manufacture.Title,
                    Category = ps.Product.Category.Title,
                    Unit = ps.Product.Unit.Title,
                    IsBanned = ps.Product.IsBanned
                })
                .ToList();
            resultMovements[1].Products = updatedProductsTo;
            return resultMovements;
        }

        
    }
}
