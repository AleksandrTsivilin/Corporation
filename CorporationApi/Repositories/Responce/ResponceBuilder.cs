using Repositories.Models.ResponceInfoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{



    public class ResponceBuilder<T>
    {
        public ResponceInfo<T> Responce { get; }
        public ResponceBuilder(T data, string builder = null, ActionType action = ActionType.DEFAULT) 
        {
            Responce = new ResponceInfo<T>
            {
                Data = data,
                Message = CreateMessage(builder, action)
            };
        }

        private string CreateMessage(string builder, ActionType action)
        {
            if (builder is null) return "";

            var raw = "template " + builder;
            switch (action)
            {
                case ActionType.UPDATE: return raw + " has been updated by owner";
                case ActionType.DELETE: return raw + " has been deleted by owner";
                case ActionType.CREATE: return raw + " has been created by owner";
                default: return "";
            }
        }
    }
}
