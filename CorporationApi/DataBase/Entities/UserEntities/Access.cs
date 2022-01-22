﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataBase.Entities.UserEntities
{
    public class Access : BaseEntity
    {
        public string Title { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public ICollection<AvaiableUser> AvaiablesUser { get; set; }
    }
}
