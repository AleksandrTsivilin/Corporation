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
            var changedDepartment = await Task.Run(() => _service.AddUserWithAvaiables(model));
            await onNotifyUser(changedDepartment);
        }

        public async Task UpdateUserAvaiables(NewAvaiable[] avaiables, int userId)
        {
            var changedDepartment = await Task.Run(() => _service.UpdateAvaiables(avaiables, userId));
            await onNotifyUser(changedDepartment);
        }
        public async Task BanUser(int userId)
        {
            var changedDepartment = await _service.BanUser(userId);
            await onNotifyUser(changedDepartment);
        }
        private async Task onNotifyUser(int changedDepartment)
        {
            if (changedDepartment != 0)
                await Clients.All.SendAsync("newUser", changedDepartment);
        } 
    }

}
