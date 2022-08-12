using DataBase.Entities;
using Repositories.RegionRepositories;
using Repositories.Specifications;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.RegionServices
{
    public class RegionService : IRegionService
    {
        private readonly IRegionRepository _repository;
        public RegionService(IRegionRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<RegionModel>> GetRegionByAccess(IdentityUserModel identity)
        {
            var specification = new RegionSpecificationByAccess(identity);
            var regions = await _repository.GetByAccess(specification);
            return regions.Select(region => new RegionModel
            {
                Id = region.Id,
                Title = region.Title
            }).ToList();
        }

        public async Task<RegionModel> GetById(int id)
        {
            var region = await _repository.GetById(id);
            return region is null ? null : GetRegionModel(region);
        }

        private RegionModel GetRegionModel(Region region)
        {
            return new RegionModel
            {
                Id = region.Id,
                Title = region.Title
            };
        }
    }
}
