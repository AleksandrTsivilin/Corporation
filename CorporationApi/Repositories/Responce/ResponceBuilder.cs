using Repositories.Models.ResponceInfoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{

    public enum BadResponce
    {
        INVALID_USER,
        DECLINED,
        INVALID_TEMPLATE
    }

    public class ResponceBuilder<T>
    {
        public ResponceInfo<T> Responce { get; }

        public ResponceBuilder(T data, string publisher = null, TypeOperation action = TypeOperation.DEFAULT) 
        {
            Responce = new ResponceInfo<T>
            {
                Data = data,
                Message = CreateMessage(publisher, action),
                Type = action
            };
        }

        public ResponceBuilder(T data, BadResponce code)
        {
            Responce = new ResponceInfo<T>
            {
                Data = data,
                Message = GetMessage(code)
            };
        }

        private string CreateMessage(string publisher, TypeOperation action)
        {
            if (publisher is null) return "";

            switch (action)
            {
                case TypeOperation.DEFAULT: return publisher;
                case TypeOperation.UPDATE: return $"{publisher} has been updated ";
                case TypeOperation.DELETE: return $"{publisher} has been deleted ";
                case TypeOperation.CREATE: return $"{publisher} has been created ";
                case TypeOperation.SUBSCRIBE: return $"{publisher} has been added";
                default: return "";
            }
        }

        private string GetMessage (BadResponce code)
        {
            var message = string.Empty;
            switch ((int)code)
            {
                case (int)(BadResponce.INVALID_USER):
                    message = "Operation was canceled. User isn't valid. Try login again";
                    break;

                case (int)(BadResponce.DECLINED):
                    message = "Operation was declined.";
                    break;

                case (int)(BadResponce.INVALID_TEMPLATE):
                    message = GetDefault("template");
                    break;

                default: message = "";
                    break;
            }

            return message;
        }

        private string GetDefault(string publisher)
        {
            return $"Operation was canceled, {publisher} is not avaible.Try again later";
        }
    }
}
