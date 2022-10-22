using DataBase.Entities.ProductEntities;
using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using Repositories.ProductRepositories.ProductTemplatesRepositories;
using Repositories.Specifications;
using Services.Models.ProductModels;
using Services.Models.ProductModels.ProductTemplateModels;
using Services.Models.UserModels.FactoryModels;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ProductTemplatesServices
{
    public class ProductTemplatesService : IProductTemplatesService
    {

        private readonly IProductTemplatesRepository _repository;

        public ProductTemplatesService(IProductTemplatesRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ProductTemplateModel>> GetByUser(IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var templates = await _repository.GetByUser(userId);
            return GetProductTemplatesModels(templates);
        }

        //public async Task<ProductTemplateModel> GetById(int id, IdentityUserModel identity)
        //{
        //    return null;
        //    //var userId = identity.UserId;
        //    //var template = await _repository.GetById(id, userId);
        //    //return template is null
        //    //    ? null
        //    //    : GetProductTemplateModel(template);
        //}

        public async Task<ProductTemplateInfoByUserModel> GetByIdWithUsers(int id, IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var templateUsers = await _repository.GetByIdWithUsers(id);
            if (templateUsers is null) return null;

            var templateUser = templateUsers.FirstOrDefault(tpu => tpu.UserId == userId);

            var isSaved = templateUser is not null;
            var isOwner = templateUser is not null ? templateUser.IsOwner : false;
            var countUser = templateUsers.Count;

            var templateModel = GetProductTemplateModel(templateUsers[0]);
            return new ProductTemplateInfoByUserModel
            {
                Id = templateModel.Id,
                Title = templateModel.Title,
                IsOwner = isOwner,
                Owner = templateModel.Owner,
                Criteria = templateModel.Criteria,
                IsSaved = isSaved,
                CountUser = countUser
            };
            //return null;



            //var templateUser = templateProduct_User.FirstOrDefault(tpu => tpu.UserId ==  userId);
            //if (templateProduct_User.User.Id != userId)
            //{
            //    templateProduct_User.IsOwner = false;
            //}

            //var templateModel = GetProductTemplateModel(templateProduct_User);
            //var isSaved = IsHasUser(templateProduct_User, userId);
            //var countUser = templateProduct_User.Template.Users.Count;
            //return new ProductTemplateInfoByUserModel
            //{
            //    Id = templateModel.Id,
            //    Title = templateModel.Title,
            //    IsOwner = templateModel.IsOwner,
            //    Owner = templateModel.Owner,
            //    Criteria = templateModel.Criteria,
            //    IsSaved = isSaved,
            //    CountUser = countUser

            //};
            //return null;
        }

        public async Task<ResponceInfo<int>> Add(FilterProductModel filter, IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var responce = await _repository.Add(filter, userId);
            return responce;
        }

        public async Task<ProductTemplateWithDetailModel> GetDetail(int id, IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var template = await _repository.GetDetail(id, userId);
            return new ProductTemplateWithDetailModel 
            {
                Id = template.Id,
                Title = template.Title,
                Owner = template.Owner,
                IsOwner = template.IsOwner,
                Region = template.Region is null
                    ? null
                    : new RegionModel
                    {
                        Id = template.Region.Id,
                        Title = template.Region.Title
                    },
                Factory = template.Factory is null 
                    ? null 
                    : new FactoryModel 
                    {
                        Id = template.Factory.Id,
                        Title = template.Factory.Title
                    },
                Storage = template.Storage is null 
                    ? null 
                    : new StorageModel
                    {
                        Id = template.Storage.Id,
                        Title = template.Storage.Title
                    },
                Manufacturer = template.Manufacturer is null
                    ? null
                    : new ManufacturerModel
                    {
                        Id = template.Manufacturer.Id,
                        Title = template.Manufacturer.Title
                    },
                Category = template.Category is null
                    ? null
                    : new CategoryModel
                    {
                        Id = template.Category.Id,
                        Title = template.Category.Title
                    },
                Unit = template.Unit is null 
                    ? null 
                    :  new UnitModel
                    {
                        Id = template.Unit.Id,
                        Title = template.Unit.Title
                    },
                StartCount = template.StartCount,
                EndCount = template.EndCount,
                StartPrice = template.StartPrice,
                EndPrice = template.EndPrice

            };
        }

        public async Task<ResponceInfo<int>> Delete(int id)
        {
            var responce = await _repository.Delete(id);
            return responce;
        }

        public async Task<ResponceInfo<int>> Update(int id, FilterProductModel filter)
        {
            var responce = await _repository.Update(id, filter);
            return responce;
        }

        public async Task<ResponceInfo<bool>> AddUser(int templateId, IdentityUserModel identity)
        {
            var userId = identity.UserId;
            var responce = await _repository.AddUser(templateId, userId);
            return responce;
        }
        private List<ProductTemplateModel> GetProductTemplatesModels(List<ProductTemplateUser> templates)
        {
            return templates.Select(templateUser => GetProductTemplateModel(templateUser))
                .ToList();
        }

        private ProductTemplateModel GetProductTemplateModel(ProductTemplateUser templateUser)
        {
            var template = templateUser.Template;
            var user = templateUser.User;

            return new ProductTemplateModel
            {
                Id = template.Id,
                Title = template.Title,
                IsOwner = templateUser.IsOwner,
                Owner = user.UserName,
                Criteria = new ProductCriteria
                {
                    RegionId = template.RegionId,
                    FactoryId = template.FactoryId,
                    StorageId = template.StorageId,
                    ManufacturerId = template.ManufacturerId,
                    CategoryId = template.CategoryId,
                    UnitId = template.UnitId,
                    StartCount = template.StartCount,
                    EndCount = template.EndCount,
                    StartPrice = template.StartPrice,
                    EndPrice = template.EndPrice
                }
            };
        }

        private bool IsHasUser(ProductTemplateUser template, int userId)
        {
            var user = template.Template.Users
                .FirstOrDefault(user => user.UserId == userId);

            return user is not null;
        }

        
        //private int TryGetInt(int value)
        //{
        //    return value == 0 ? 0 : value;
        //}
    }
}
