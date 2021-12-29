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

namespace Services.ProductService.MovementsService
{
    public class MovementsService : IMovementsServive
    {
        private readonly DBContext _context;
        public MovementsService(DBContext context)
        {
            _context = context;
        }
        public async Task<List<string>> MovedProducts(MoveProductModel model)
        {          
            var storageFrom = GetStorageByTitle(model.From);
            var storageTo = GetStorageByTitle(model.To);
            if (storageFrom is null || storageTo is null) return null;          

            var resultMovements = StartMovements(model);
            
            foreach (var product in model.MovedProducts)
            {              

                var productStorageFrom = _context.Product_Storage
                    .Where(ps => ps.Storage.Title == model.From)
                    .FirstOrDefault(ps => ps.Product.Id == product.Id);

                if (productStorageFrom is null) continue;


                var productStorageTo = _context.Product_Storage
                    .Where(ps => ps.Storage.Title == model.To)
                    .FirstOrDefault(ps => ps.Product.Id == product.Id);

                if (productStorageTo is null)
                {
                    _context.Product_Storage.Add(new ProductStorage
                    {
                        ProductId = product.Id,
                        StorageId = storageTo.Id,
                        CountProduct = product.CountMoved
                    });

                    productStorageFrom.CountProduct -= product.CountMoved;
                    _context.SaveChanges();
                }
                else
                {
                    productStorageTo.CountProduct += product.CountMoved;
                    productStorageFrom.CountProduct -= product.CountMoved;
                    _context.SaveChanges();
                }
            }

            resultMovements[0].Products = GetProductsByStorage(storageFrom);   
       
            resultMovements[1].Products = GetProductsByStorage(storageTo);
            //return resultMovements;
            return new List<string> { storageFrom.Title, storageTo.Title };
        }

        private List<ProductModel> GetProductsByStorage(Storage storage)
        {
            return _context.Product_Storage
                .Include(ps => ps.Storage)
                .Include(ps => ps.Product)
                .Where(ps => ps.Storage.Id == storage.Id)
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
        }

        private List<MovementsProductModel> StartMovements(MoveProductModel model)
        {
            return new List<MovementsProductModel>
            {
                new MovementsProductModel
                {
                    Storage=model.From,
                    Products=new List<ProductModel>()
                },
                new MovementsProductModel
                {
                    Storage=model.To,
                    Products=new List<ProductModel>()
                }

            };
        }

        private Storage GetStorageByTitle(string title)
        {
            return _context.Storages.FirstOrDefault(s => s.Title == title);
        }
    }
}
