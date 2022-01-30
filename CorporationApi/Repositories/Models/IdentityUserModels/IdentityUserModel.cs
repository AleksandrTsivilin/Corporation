using Repositories.Models.IdentityUserModels;

namespace Repositories.Specifications
{
    public class IdentityUserModel
    {
        public int UserId { get; set; }
        public string Access { get; set; }
        public UserLocation Location { get; set; }
    }
}