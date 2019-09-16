using Sectores.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sectores.Controllers
{
    public class SectorController : Controller
    {
        // GET: Sector
        ContextoDb db = new ContextoDb();
        public ActionResult Index()
        {
           
            return View();
        }
        [HttpGet]
        public JsonResult getAllSectores()
        {
            var sectores = db.Sector.ToList();
            return Json(sectores, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getSectorById (int id)
        {
            var sector = db.Sector.SingleOrDefault(s => s.SectorId == id);
            return Json(sector, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getSectoresByName(string nombre)
        {
            var sectores = db.Sector.Include("Ciudad")
                    .Where(s => s.Nombre.Contains(nombre));
            return Json(sectores, JsonRequestBehavior.AllowGet);
        }


    }
}