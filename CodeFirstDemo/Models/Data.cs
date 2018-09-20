using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeFirstDemo.Models
{
    public class Data : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
    }
    
    public class Movie
    {
        public long ID { get; set; }
        public String Name { get; set; }
        public DateTime ReleseDate { get; set; }
        public TimeSpan Duration { get; set; }
        public virtual List<Genre> Genres { get; set; }        

        public Movie()
        {
            this.Genres = new List<Genre>();
        }
    }

    public class Genre
    {
        [Key]
        public long GenreID { get; set; }

        [Required(AllowEmptyStrings = false)]
        public String Name { get; set; }
        public String Desc { get; set; }
        public virtual List<Movie> Movies { get; set; }
        public Genre()
        {
            this.Movies = new List<Movie>();
        }
    }

}
