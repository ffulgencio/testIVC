using Sectores.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sectores.Controllers
{
    public class CiudadController : Controller
    {
        private ContextoDb db = new ContextoDb();
        // GET: Ciudad
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getCiudades()
        {
            var ciudades = db.Ciudad
                            .Select(s => new { ciudadId = s.CiudadId, nombre = s.Nombre, paisId = s.PaisId });
            return Json(ciudades.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getCiudadesPorPais(int paisId)
        {
            var ciudades = db.Ciudad
                            .Where(s => s.PaisId == paisId)
                            .Select(s => new { ciudadId = s.CiudadId, nombre = s.Nombre, paisId = s.PaisId });
            return Json(ciudades.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}