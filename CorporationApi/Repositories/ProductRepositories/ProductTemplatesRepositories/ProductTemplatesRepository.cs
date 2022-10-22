using DataBase;
using DataBase.Entities;
using DataBase.Entities.ProductEntities;
using DataBase.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.Models.ProductModels;
using Repositories.Models.ResponceInfoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories.ProductTemplatesRepositories
{
    public class ProductTemplatesRepository : Repository<ProductTemplate>, IProductTemplatesRepository
    {
        //private readonly defaultMessage {get;} = "Operation was canceled, template is not avaible.Try again later";
        //private int A { get; set; } = 5;
        //private string _defaultMessage { get; } = "";

        public ProductTemplatesRepository(DBContext context)
            : base(context) { }

        public async Task<ResponceInfo<int>> Add(FilterProductModel filter, int userId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);

                if (user is null)
                    return new ResponceBuilder<int>(0, BadResponce.INVALID_USER).Responce;

                await _context.ProductTemplates.AddAsync(
                    new ProductTemplate
                    {
                        Title = filter.Title,
                        RegionId = filter.RegionId,
                        FactoryId = filter.FactoryId,
                        StorageId = filter.StorageId,
                        ManufacturerId = filter.ManufacturerId,
                        CategoryId = filter.CategoryId,
                        UnitId = filter.UnitId,
                        StartCount = filter.StartCount,
                        EndCount = filter.EndCount,
                        StartPrice = filter.StartPrice,
                        EndPrice = filter.EndPrice,
                        Users = new List<ProductTemplateUser>
                        {
                            new ProductTemplateUser
                            {
                                IsOwner = true,
                                UserId = userId
                            }
                        }
                    });
                await _context.SaveChangesAsync();

                var template = await _context.ProductTemplates
                    .FirstOrDefaultAsync(template => template.Title == filter.Title);

                if (template is null)
                {
                    transaction.Rollback();
                    return new ResponceBuilder<int>(0, BadResponce.INVALID_TEMPLATE).Responce;
                }

                //throw new Exception();
                transaction.Commit();


                var publisher = template.Title;
                var responce = new ResponceBuilder<int>(template.Id, publisher, TypeOperation.CREATE).Responce;
                return responce;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return new ResponceBuilder<int>(0, BadResponce.INVALID_TEMPLATE).Responce;
            }

        }

        public async Task<List<ProductTemplateUser>> GetByIdWithUsers(int id)
        {
            try
            {
                var templateUsers = await _context.ProductTemplates_Users
                    .Include(ptu => ptu.User)
                    .Include(ptu => ptu.Template)
                    .Where(ptu => ptu.TemplateId == id)
                    .ToListAsync();
                return templateUsers;
            }
            catch (Exception ex)
            {
                return null;
            };
        }

        public async Task<List<ProductTemplateUser>> GetByUser(int userId)
        {
            var templates = await _context.ProductTemplates_Users
                .Include(ptu => ptu.User)
                .Include(ptu => ptu.Template)
                .Where(templateUser => templateUser.UserId == userId)
                .ToListAsync();
            return templates;
        }

        public async Task<ProductTemplateWithDetail>GetDetail(int id, int userId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                //var templateUser = await _context.ProductTemplates_Users
                //    .Include(ptu => ptu.User)
                //    .Include(ptu => ptu.Template)
                //    .FirstOrDefaultAsync(template => template.Id == id && template.User.Id == userId);
                var templateUser = await GetQueryDefault()
                    .FirstOrDefaultAsync(template => template.Template.Id == id && template.User.Id == userId);

                if (templateUser is null) return null;

                var template = templateUser.Template;

                var region = await GetEntityById<Region>(template.RegionId);

                var factory = await GetEntityById<Factory>(template.FactoryId);

                var storage = await GetEntityById<Storage>(template.StorageId);

                var manufacturer = await GetEntityById<ManufacturerProduct>(template.ManufacturerId);

                var category = await GetEntityById<CategoryProduct>(template.CategoryId);

                var unit = await GetEntityById<UnitProduct>(template.UnitId);

                transaction.Commit();
                return new ProductTemplateWithDetail
                {
                    Id = template.Id,
                    Title = template.Title,
                    Owner = templateUser.User.Username,
                    IsOwner = templateUser.IsOwner,
                    Region = region,
                    Factory = factory,
                    Storage = storage,
                    Manufacturer = manufacturer,
                    Category = category,
                    Unit = unit,
                    StartCount = template.StartCount,
                    EndCount = template.EndCount,
                    StartPrice = template.StartPrice,
                    EndPrice = template.EndPrice
                };
            }
            catch
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<ResponceInfo<int>> Delete(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var templateUser = await GetTemplateUserById(id);

                if (templateUser is null)
                    return new ResponceBuilder<int>(0, BadResponce.INVALID_TEMPLATE).Responce;

                if (!templateUser.IsOwner)
                    return new ResponceBuilder<int>(0, BadResponce.DECLINED).Responce;

                var responce = new ResponceBuilder<int>(
                    templateUser.Template.Id,
                    templateUser.Template.Title,
                    TypeOperation.DELETE)
                    .Responce;

                _context.ProductTemplates.Remove(templateUser.Template);

                await _context.SaveChangesAsync();

                transaction.Commit();
                return responce;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return new ResponceBuilder<int>(0, BadResponce.INVALID_TEMPLATE).Responce;
            }
        }

       

        public async Task<ResponceInfo<int>> Update(int id, FilterProductModel filter)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var templateUser = await GetTemplateUserById(id);
                if (templateUser is null) throw new Exception();
                if (!templateUser.IsOwner) throw new Exception();

                var responce = new ResponceBuilder<int>(
                        templateUser.Template.Id,
                        templateUser.Template.Title,
                        TypeOperation.UPDATE
                    ).Responce;
                var template = templateUser.Template;

                template.Title = filter.Title;
                template.RegionId = filter.RegionId;
                template.FactoryId = filter.FactoryId;
                template.StorageId = filter.StorageId;
                template.ManufacturerId = filter.ManufacturerId;
                template.CategoryId = filter.CategoryId;
                template.UnitId = filter.UnitId;
                template.StartCount = filter.StartCount;
                template.EndCount = filter.EndCount;
                template.StartPrice = filter.StartPrice;

                await _context.SaveChangesAsync();
                transaction.Commit();
                return responce;
            }
            catch
            {
                transaction.Rollback();
                return null;
            }
        }

        public async Task<ResponceInfo<bool>> AddUser(int templateId, int userId)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = await GetEntityById<User>(userId);
                if (user is null)
                {
                    var message = "user does not excist, try login again";
                    var responce = new ResponceBuilder<bool>(
                    false, message)
                    .Responce;

                    return responce;
                }

                var template = await GetEntityById<ProductTemplate>(templateId);

                if (template is null)
                {
                    var message = "template has not founded";
                    var responce = new ResponceBuilder<bool>(
                        false, message).Responce;
                    return responce;
                }

                var newTemplateProduct_User = new ProductTemplateUser
                {
                    IsOwner = false,
                    UserId = user.Id,
                    TemplateId = template.Id
                };
                await _context.ProductTemplates_Users.AddAsync(newTemplateProduct_User);
                //var templateUser = await _context.ProductTemplates_Users
                //   .Include(ptu => ptu.User)
                //   .Include(ptu => ptu.Template)
                //   .FirstOrDefaultAsync(template => template.Id == templateId);

                //if (templateUser is null)
                //{
                //    var message = "template has not founded";
                //    var responce = new ResponceBuilder<bool>(
                //        false, message, TypeOperation.DEFAULT).Responce;
                //    return responce;
                //}



                await _context.SaveChangesAsync();
                var publisher = template.Title;
                var successResponce = new ResponceBuilder<bool>(
                    true, publisher, TypeOperation.SUBSCRIBE).Responce;


                transaction.Commit();
                return successResponce;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                var message = "operation was failed, try again later";
                var responce = new ResponceBuilder<bool>(
                false, message)
                .Responce;

                return responce;
            }
        }


        //private async Task<T> GetEntityById<T>(int id) where T : BaseEntity
        //{
        //    return await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
        //}

        private async Task<ProductTemplateUser> GetTemplateUserById(int id)
        {
            return await _context.ProductTemplates_Users
                    .Include(tpu => tpu.Template)
                    .FirstOrDefaultAsync(templateUser => templateUser.Template.Id == id);
        }

        private IQueryable<ProductTemplateUser> GetQueryDefault()
        {
            return _context.ProductTemplates_Users
                    .Include(ptu => ptu.User)
                    .Include(ptu => ptu.Template);
        }

        

        //private string GetMessage(ProductTemplateUser templateUser)
        //{
        //    return "template " + templateUser.Template.Title + "has been deleted by owner";
        //}

        //private string GetMessage(string title, ActionType action)
        //{
        //    var raw = "template " + title;
        //    switch (action)
        //    {
        //        case ActionType.UPDATE: return raw + " has been updated by owner";
        //        case ActionType.DELETE: return raw + " has been deleted by owner";
        //        case ActionType.CREATE: return raw + " has been created by owner";
        //        default: return "";
        //    }
        //}
    }
}
