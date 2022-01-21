using DataBase.Entities.UserEntities;
using Repositories;
using Services.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserServices.AccessServices
{
    public class AccessService : IAccessService
    {
        private readonly IRepository<Access> _repository;
        public AccessService(IRepository<Access> repository)
        {
            _repository = repository;
        }
        public async Task<List<AccessModel>> GetAccesses()
        {
            var accesses = await _repository.Get();
            return accesses.Select(access => new AccessModel()
            {
                Id = access.Id,
                Title = access.Title
            }).ToList();
        }
    }
}
