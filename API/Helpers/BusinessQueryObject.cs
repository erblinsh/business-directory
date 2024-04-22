namespace server.Helpers
{
    public class BusinessQueryObject
    {
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public string SortBy { get; set; }
        public bool IsDescending { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
