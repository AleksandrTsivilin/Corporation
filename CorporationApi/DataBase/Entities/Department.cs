﻿using DataBase.Entities.ProductEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase.Entities
{
    public class Department
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Storage Storage { get; set; }
        public Factory Factory { get; set; }
        public int FactoryId { get; set; }
    }
}