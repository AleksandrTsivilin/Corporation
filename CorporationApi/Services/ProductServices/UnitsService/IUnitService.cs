using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.UnitsService
{
    public interface IUnitService
    {
        Task<List<UnitModel>> GetUnits();
    }
}
