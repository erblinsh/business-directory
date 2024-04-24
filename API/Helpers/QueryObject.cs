namespace server.Helpers
{
    public class QueryObject
    {
        public string Name { get; set; } = "";
        public string CategoryName { get; set; } = "";
        public string SortBy { get; set; } = "";
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
