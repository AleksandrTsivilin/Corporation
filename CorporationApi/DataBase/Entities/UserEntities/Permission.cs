using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class Permission : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<AvaiablesUserPermission> AvaiablesUser_Permission { get; set; }
    }
}
