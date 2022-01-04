using DataBase.Entities.ProductEntities;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AccessService
    {
        //public Expression<Func<ProductModel, bool>> Expression { get; set; }
        public Expression<Func<Product, bool>> Expression { get; set; }
        public AccessService(string access)
        {
            switch (access)
            {
                case "full":
                    Expression = product => true;
                    //Expression = product => product.ProductStorages
                    //.Any<ProductStorage>(ps => ps.Storage.Department.Title == "12");
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
