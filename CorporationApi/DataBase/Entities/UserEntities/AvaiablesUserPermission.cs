using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class AvaiablesUserPermission
    {
        public int Id { get; set; }
        public int AvaiablesUserId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public AvaiableUser AvaiableUser { get; set; }
        public int PermissionId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public Permission Permission { get; set; }
    }
}
