using System.IO;
using System.Web;
using System.Web.Mvc;

namespace MovieStore.Api.Helpers
{
    public static class UrlExtensions
    {
        public static string LatestContent(this UrlHelper helper, string contentPath)
        {
            string file = HttpContext.Current.Server.MapPath(contentPath);
            if (File.Exists(file))
            {
                var dateTime = File.GetLastWriteTime(file);
                contentPath = string.Format("{0}?v={1}", contentPath, dateTime.Ticks);
            }

            return helper.Content(contentPath);
        }
    }
}