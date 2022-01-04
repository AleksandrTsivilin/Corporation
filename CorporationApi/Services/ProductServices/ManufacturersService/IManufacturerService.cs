using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ManufacturerService
{
    public interface IManufacturerService
    {
        Task<List<ManufacturerModel>> GetManufacturers();
    }
}
