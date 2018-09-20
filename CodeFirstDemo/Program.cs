using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeFirstDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var _db = new Models.Data())
            {
                var _movies = _db.Movies.Include("Genres");

                if (_movies.Count() > 0)
                {
                    Console.WriteLine("--- Movies in DB ---");
                    foreach (var _movie in _movies)
                    {
                        if (_movie.Genres.Count > 0)
                        {
                            String[] _movie_genres = _movie.Genres.Select(g => g.Desc).ToArray();
                            String _genres_print = String.Join(",", _movie_genres);
                            Console.WriteLine(String.Format("[{0}] {1} ({2})", _movie.ReleseDate.Year, _movie.Name, _genres_print));
                        }
                        else
                            Console.WriteLine(String.Format("[{0}] {1}", _movie.ReleseDate.Year, _movie.Name));
                    }
                }
                else
                    Console.WriteLine("No movies in DB.");

                Console.Write("Add new movie [Y/n]: ");
                ConsoleKeyInfo _continue = Console.ReadKey();

                Console.Write(System.Environment.NewLine);

                if (_continue.Key == ConsoleKey.Y || _continue.Key == ConsoleKey.Enter)
                {

                    Console.WriteLine("--- Insert new Movie ---");
                    Console.Write("Enter name: ");
                    String _name = Console.ReadLine();
                    Console.Write("Enter release date: ");
                    String _rdate = Console.ReadLine();
                    Console.Write("Enter duration: ");
                    String _duration = Console.ReadLine();

                    foreach (var _genre in _db.Genres)
                    {
                        Console.WriteLine(String.Format("{0} - {1}", _genre.GenreID, _genre.Desc));
                    }

                    Console.Write("Enter genres number (separated by ','):");
                    String[] _genres = Console.ReadLine().Split(',');

                    _db.Movies.Add(new Models.Movie
                    {
                        Name = _name,
                        Duration = TimeSpan.Parse(_duration),
                        ReleseDate = DateTime.Parse(_rdate),
                        Genres = _db.Genres.Where(g => _genres.Contains(g.GenreID.ToString())).ToList()
                    });

                    int _done = _db.SaveChanges();

                    Console.Write(String.Format("Done inserting new movie, witch affected {0} rows in db. Press any key to continue ...", _done));

                }
                else
                    Console.Write("Press any key to continue ...");

                ConsoleKeyInfo _char = Console.ReadKey(true);
            }
        }
    }
}
