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
        private readonly IMovementProductRepository _repository;
        public MovementsService(IMovementProductRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<int>> MovedProducts(MoveProductModel model)
        {
            return await _repository.MovedProduct(model);
        }
    }
}
