﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities
{
    public class Factory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Department> Departments { get; set; }
        public Region Region { get; set; }
        public int RegionId { get; set; }
    }
}
