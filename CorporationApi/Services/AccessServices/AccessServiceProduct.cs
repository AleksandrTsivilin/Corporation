using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AccessServices
{
    public class AccessServiceProduct : AccessServiceBase<Product>
    {
        public AccessServiceProduct(string access)
        {
            var a = "region";
            switch (a)
            {
                case "full":
                    Expression = product => true;
                    break;
                case "region":
                    Expression = product => product.ProductStorages
                        .Any<ProductStorage>(ps => ps.Storage.Department.Factory.Region.Id == 1);
                    break;
                case "factory":
                    Expression = product => product.ProductStorages
                        .Any<ProductStorage>(ps => ps.Storage.Department.FactoryId == 4);
                    break;
                case "department":
                    Expression = product => product.ProductStorages
                        .Any<ProductStorage>(ps => ps.Storage.DepartmentId == 1);
                    break;
            }
        }
    }
}
