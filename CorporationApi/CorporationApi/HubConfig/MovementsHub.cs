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
        public void MoveProducts(MoveProductModel model)
        {

            var movements = _service.MovedProducts(model);

            Clients.All.SendAsync("movementsProduct", movements);

        }
    }
}
