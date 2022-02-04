using Microsoft.AspNetCore.SignalR;
using Services.Models.ProductModels;
using Services.ProductService;
using Services.ProductService.MovementsService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporationApi.HubConfig
{
    public class MovementsHub : Hub
    {
        private readonly IMovementsServive _service;
        public MovementsHub(IMovementsServive service)
        {
            _service = service;
        }
        public async Task MoveProducts(MoveProductModel model)
        {

            var storages = await Task.Run(() => _service.MovedProducts(model));
            if (storages is not null)
                await Clients.All.SendAsync("changeProducts", storages);

        }
    }
}
