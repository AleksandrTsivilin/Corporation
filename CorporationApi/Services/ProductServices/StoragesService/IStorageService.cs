using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.StoragesService
{
    public interface IStorageService
    {
        Task<List<StorageModel>> GetStorages();
        Task<StorageModel> GetStorageByUser(int userId);
        Task<List<StorageModel>> GetStorageByAccess(string access);
    }
}
