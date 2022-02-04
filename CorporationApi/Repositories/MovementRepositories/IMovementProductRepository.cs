﻿using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.MovementRepositories
{
    public interface IMovementProductRepository
    {
        Task<List<int>> MovedProduct(MoveProductModel model);
    }
}
