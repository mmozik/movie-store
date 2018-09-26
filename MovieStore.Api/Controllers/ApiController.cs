using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace MovieStore.Api.Controllers
{
    public class ApiController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        //public async Task<string> Execute()
        //{
        //    string apiKey = !HttpContext.IsDebuggingEnabled
        //        ? System.Environment.GetEnvironmentVariable("SendGridApi")
        //        : "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";

        //    var client = new SendGridClient(apiKey);
        //    var msg = new SendGridMessage()
        //    {
        //        From = new EmailAddress("adp.team@sokigo.com", "ADP Team"),
        //        Subject = "It's alive",
        //        PlainTextContent = "Hello, Email!",
        //        HtmlContent = "<strong>Hello, Email!</strong>"
        //    };
        //    msg.AddTo(new EmailAddress("agata.vincan@sokigo.com", "Agata"));
        //    msg.AddCcs(
        //        new List<MailAddress> {
        //            new EmailAddress("dusan.jerinic@sokigo.com", "Dule"),
        //            new EmailAddress("predrag.milosavljevic@sokigo.com", "Pedja")
        //        }
        //    );
        //    var response = await client.SendEmailAsync(msg);

        //    return response.StatusCode.ToString();
        //}

        public ActionResult DragDropTest()
        {
            return View();
        }

        [HttpPost]
        public JsonResult HandleUpload()
        {
            HttpFileCollectionBase files = Request.Files;
            int size = 0;
            if (files.Count > 0)
            {
                // full path to file in temp location
                var filePath = Path.Combine(Server.MapPath("~/"), @"..\Tmp\");

                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);

                foreach (HttpPostedFileBase formFile in Enumerable.Range(0, files.Count).Select(i => files[i]))
                {
                    if (formFile.ContentLength > 0)
                    {
                        String newFilePath = String.Format("{0}{2}-{1}", filePath, formFile.FileName, Guid.NewGuid().ToString());

                        size += formFile.ContentLength;

                        using (var stream = new FileStream(newFilePath, FileMode.Create))
                        {
                            formFile.InputStream.CopyTo(stream);
                        }
                    }
                }

                return Json(new { msg = String.Format("Uploaded {0} bytes from {1} files.", size, files.Count) });
            }

            return Json(new { msg = "no files" });
        }
    }
}