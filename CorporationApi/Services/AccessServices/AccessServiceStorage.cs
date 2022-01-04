using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AccessServices
{
    public class AccessServiceStorage : AccessServiceBase<Storage>
    {
        public AccessServiceStorage(string access)
        {
            switch (access)
            {
                case "full":
                    Expression = storage => true;
                    break;
                case "region":
                    Expression = storage => storage.Department.Factory.Region.Id == 1;
                    break;
                case "factory":
                    Expression = storage => storage.Department.Factory.Id == 3;
                    break;
                case "department":
                    Expression = storage => storage.Department.Id == 14;
                    break;
            }
        }
    }
}
