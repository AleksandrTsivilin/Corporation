using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Models.UserManagerModels
{
    public class NewUserWithRegistrationId : LoginModel
    {
        public int RegistrationId { get; set; }
    }
}
