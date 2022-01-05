using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.ProductRepositories
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> Get();
        Task<IEnumerable<T>> GetByTitle();

    }
}
