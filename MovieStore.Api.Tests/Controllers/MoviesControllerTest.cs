using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MovieStore.Api;
using MovieStore.Api.Controllers;

namespace MovieStore.Api.Tests.Controllers
{
    [TestClass]
    public class MoviesControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            MoviesController controller = new MoviesController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
