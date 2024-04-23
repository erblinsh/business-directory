using server.DTOs.UserAccess;
using server.Models;

namespace server.DTOs.UserAccess
{
    public class LoginResponseDTO
    {
        public UserDTO User { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
