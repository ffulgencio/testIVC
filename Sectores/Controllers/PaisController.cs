using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sectores.Domain;

namespace Sectores.Controllers
{
    public class PaisController : Controller
    {
        // GET: Pais
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Editar()
        {
            return View();
        }
    }
}