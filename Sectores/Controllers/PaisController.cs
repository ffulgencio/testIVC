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
        private ContextoDb db = new ContextoDb();

        public ActionResult Index()
        {
           
            return View(db.Pais.ToList());
        }


        public JsonResult getPaises()
        {
            var listado = db.Pais
                        .Select (p => new { paisId= p.PaisId, nombre =  p.Nombre})
                        .ToList();
            return Json(listado, JsonRequestBehavior.AllowGet);
        }


    }
}