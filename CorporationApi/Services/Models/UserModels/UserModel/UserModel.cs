﻿using DataBase.Entities.UserEntities;
using Repositories.Models.UserManagerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.UserModels.UserModel
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public ICollection<AvaiableUserModel> Avaiables { get; set; }
    }
}