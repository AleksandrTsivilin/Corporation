using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductService.MovementsService
{
    public interface IMovementsServive
    {
        List<MovementsProductModel> MovedProducts(MoveProductModel model);
    }
}
