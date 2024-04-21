using server.DTOs.UserAccess;
using server.Models;

namespace server.DTOs.UserAccess
{
    public class LoginResponseDTO
    {
        public LocalUser User { get; set; }
        public string Token { get; set; }
    }
}
