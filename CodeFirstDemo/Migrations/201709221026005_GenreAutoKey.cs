namespace CodeFirstDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GenreAutoKey : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.MovieGenres", "Genre_Name", "dbo.Genres");
            DropIndex("dbo.MovieGenres", new[] { "Genre_Name" });
            RenameColumn(table: "dbo.MovieGenres", name: "Genre_Name", newName: "Genre_GenreID");
            DropPrimaryKey("dbo.Genres");
            DropPrimaryKey("dbo.MovieGenres");
            AddColumn("dbo.Genres", "GenreID", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.Genres", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.MovieGenres", "Genre_GenreID", c => c.Long(nullable: false));
            AddPrimaryKey("dbo.Genres", "GenreID");
            AddPrimaryKey("dbo.MovieGenres", new[] { "Movie_ID", "Genre_GenreID" });
            CreateIndex("dbo.MovieGenres", "Genre_GenreID");
            AddForeignKey("dbo.MovieGenres", "Genre_GenreID", "dbo.Genres", "GenreID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MovieGenres", "Genre_GenreID", "dbo.Genres");
            DropIndex("dbo.MovieGenres", new[] { "Genre_GenreID" });
            DropPrimaryKey("dbo.MovieGenres");
            DropPrimaryKey("dbo.Genres");
            AlterColumn("dbo.MovieGenres", "Genre_GenreID", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Genres", "Name", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.Genres", "GenreID");
            AddPrimaryKey("dbo.MovieGenres", new[] { "Movie_ID", "Genre_Name" });
            AddPrimaryKey("dbo.Genres", "Name");
            RenameColumn(table: "dbo.MovieGenres", name: "Genre_GenreID", newName: "Genre_Name");
            CreateIndex("dbo.MovieGenres", "Genre_Name");
            AddForeignKey("dbo.MovieGenres", "Genre_Name", "dbo.Genres", "Name", cascadeDelete: true);
        }
    }
}
