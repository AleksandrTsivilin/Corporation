using DataBase.Entities.ProductEntities;
using Services.Models;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Services.ProductService
{
    public interface IProductService
    {
        List<ProductModel> Get();

        List<ManufacturerModel> GetManufacturers();

        List<CategoryModel> GetCategories();

        List<UnitModel> GetUnits();

        ProductModel AddProduct(AddProductModel model);

        ProductModel UpdateProduct(AddProductModel model, int id);
        ManufacturerModel AddManufacturer(ManufacturerModel model);

        CategoryModel AddCategory(CategoryModel model);
        UnitModel AddUnit(UnitModel model);
        ProductModel RemoveProduct(int id);
        List<StorageModel> GetStorages();
        StorageModel GetStorageByUser(int userId);
        List<ProductModel> MovedProducts(MoveProductModel model);

        //ManufacturerModel AddManufacturer(ManufacturerModel model);

    }
}
