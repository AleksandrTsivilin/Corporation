using Microsoft.AspNetCore.SignalR;
using Repositories.Models.UserManagerModels;
using Services.Models.UserModels;
using Services.UserServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class UserHub : Hub
    {
        private readonly IUserService _service;
        public UserHub(IUserService service)
        {
            _service = service;
        }
        public async Task AddUserWithAvaiables(NewUser model)
        {

            Console.Write(model);
            await Task.Run(() => _service.AddUserWithAvaiables(model));
            //var storages = await Task.Run(() => _service.MovedProducts(model));
            //if (storages is not null)
            //    await Clients.All.SendAsync("movementsProduct", storages);

        }
    }

}
