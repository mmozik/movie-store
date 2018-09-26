using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MovieStore.Api.Controllers
{
    public class MoviesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public FileContentResult ShowFile(String n = "default")
        {
            String baseFolder = "~/Content/Base64", pathFormat = "{0}/{1}.txt";

            String filePath = Server.MapPath(String.Format(pathFormat, baseFolder, n));
            if (!System.IO.File.Exists(filePath)) filePath = Server.MapPath(String.Format(pathFormat, baseFolder, "default"));

            String fileString = System.IO.File.ReadAllText(filePath);

            String[] fileStringArr = fileString.Replace("data:", String.Empty).Replace("base64,", String.Empty).Split(';');

            byte[] content = Convert.FromBase64String(fileStringArr[1]);

            return File(content, fileStringArr[0]);
        }
    }
}