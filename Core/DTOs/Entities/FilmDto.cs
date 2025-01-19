namespace Core.DTOs.Entities
{
    public class FilmDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int ReleaseYear { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
    }
}