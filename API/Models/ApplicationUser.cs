using Microsoft.AspNetCore.Identity;

namespace server.models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}

