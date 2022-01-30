using Repositories.Specifications;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.IdentityUserServices
{
    public interface IIdentityUserService
    {
        IdentityUserModel GetIdentity(ClaimsIdentity claims, string role);
    }
}
