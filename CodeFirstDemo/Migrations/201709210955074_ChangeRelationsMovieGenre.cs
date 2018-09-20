namespace CodeFirstDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeRelationsMovieGenre : DbMigration
    {
        public override void Up()
        {
            Sql("delete from dbo.Movies");
            Sql("delete from dbo.Genres");

            DropForeignKey("dbo.Genres", "MovieID", "dbo.Movies");
            DropIndex("dbo.Genres", new[] { "MovieID" });
            DropPrimaryKey("dbo.Genres");
            CreateTable(
                "dbo.MovieGenres",
                c => new
                    {
                        Movie_ID = c.Long(nullable: false),
                        Genre_Name = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Movie_ID, t.Genre_Name })
                .ForeignKey("dbo.Movies", t => t.Movie_ID, cascadeDelete: true)
                .ForeignKey("dbo.Genres", t => t.Genre_Name, cascadeDelete: true)
                .Index(t => t.Movie_ID)
                .Index(t => t.Genre_Name);
            
            AddColumn("dbo.Genres", "Desc", c => c.String());
            AlterColumn("dbo.Genres", "Name", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Genres", "Name");
            DropColumn("dbo.Genres", "ID");
            DropColumn("dbo.Genres", "MovieID");

            Sql("insert into dbo.Genres values('comedy', 'Comedy'), ('action', 'Action'), ('advanture', 'Avanture'), ('bio', 'Biography'), ('fantasy', 'Fantasy'), ('scf', 'Science Fiction')");
        }
        
        public override void Down()
        {
            Sql("delete from dbo.Genres");//delete all genres because of foregin key

            DropForeignKey("dbo.MovieGenres", "Genre_Name", "dbo.Genres");
            DropForeignKey("dbo.MovieGenres", "Movie_ID", "dbo.Movies");
            DropIndex("dbo.MovieGenres", new[] { "Genre_Name" });
            DropIndex("dbo.MovieGenres", new[] { "Movie_ID" });
            DropPrimaryKey("dbo.Genres");
            AddColumn("dbo.Genres", "MovieID", c => c.Long(nullable: false));
            AddColumn("dbo.Genres", "ID", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.Genres", "Name", c => c.String());
            DropColumn("dbo.Genres", "Desc");
            DropTable("dbo.MovieGenres");
            AddPrimaryKey("dbo.Genres", "ID");
            CreateIndex("dbo.Genres", "MovieID");
            AddForeignKey("dbo.Genres", "MovieID", "dbo.Movies", "ID", cascadeDelete: true);            
        }
    }
}
