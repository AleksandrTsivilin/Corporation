using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Specifications
{
    public class BaseSpecification<T>
    {
        public Expression<Func<T, bool>> Expression { get; set; }
    }
}
