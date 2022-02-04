using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.MovementRepositories;
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
        //private readonly DBContext _context;
        private readonly IMovementProductRepository _repository;
        public MovementsService(DBContext context, IMovementProductRepository repository)
        {
            //_context = context;
            _repository = repository;
        }
        public async Task<List<int>> MovedProducts(MoveProductModel model)
        {
            return await _repository.MovedProduct(model);
        }

        //private List<ProductModel> GetProductsByStorage(Storage storage)
        //{
        //    return _context.Product_Storage
        //        .Include(ps => ps.Storage)
        //        .Include(ps => ps.Product)
        //        .Where(ps => ps.Storage.Id == storage.Id)
        //        .Select(ps => new ProductModel
        //        {
        //            Id = ps.Product.Id,
        //            Title = ps.Product.Title,
        //            Price = ps.Product.Price,
        //            Count = ps.CountProduct,
        //            Manufacturer = new ManufacturerModel
        //            {
        //                Id = ps.Product.Manufacture.Id,
        //                Title = ps.Product.Manufacture.Title
        //            },//ps.Product.Manufacture,
        //            Category = new CategoryModel 
        //            {
        //                Id = ps.Product.Category.Id,
        //                Title = ps.Product.Category.Title
        //            }, //ps.Product.Category.Title,
        //            Unit = new UnitModel 
        //            {
        //                Id = ps.Product.Unit.Id,
        //                Title = ps.Product.Unit.Title
        //            }, //ps.Product.Unit.Title,
        //            IsBanned = ps.Product.IsBanned
        //        })
        //        .ToList();
        //}

        //private List<MovementsProductModel> StartMovements(MoveProductModel model)
        //{
        //    return new List<MovementsProductModel>
        //    {
        //        //new MovementsProductModel
        //        //{
        //        //    Storage=model.From,
        //        //    Products=new List<ProductModel>()
        //        //},
        //        //new MovementsProductModel
        //        //{
        //        //    Storage=model.To,
        //        //    Products=new List<ProductModel>()
        //        //}

        //    };
        //}

        private Storage GetStorageByTitle(string title)
        {
            return _context.Storages.FirstOrDefault(s => s.Title == title);
        }
    }
}



        

//            var resultMovements = StartMovements(model);
            
//            
//            resultMovements[0].Products = GetProductsByStorage(storageFrom);   
       
//            resultMovements[1].Products = GetProductsByStorage(storageTo);
//            //return resultMovements;