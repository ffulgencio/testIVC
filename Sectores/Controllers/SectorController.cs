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
        [HttpPost]
        public JsonResult CreateSector(Sector sector)
        {
            if (sector != null)
            {
                db.Sector.Add(sector);
                db.SaveChanges();
            }

            return Json(sector, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getAllSectores()
        {
            var sectores = db.Sector.Select(s => new { sectorId = s.SectorId, nombre = s.Nombre, ciudad = s.Ciudad.Nombre, ciudadId = s.CiudadId });
            return Json(sectores, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getSectorById(int id)
        {
            var sector = db.Sector
                         .Where(s => s.SectorId == id)
                         .Select(s => new { sectorId = s.SectorId, nombre = s.Nombre, ciudad = s.Ciudad.Nombre, ciudadId = s.CiudadId })
                         .SingleOrDefault();
            return Json(sector, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getSectoresByName(string nombre)
        {
            var sectores = db.Sector
                        .Where(s => s.Nombre.Contains(nombre))
                        .Select(s => new { sectorId = s.SectorId, nombre = s.Nombre, ciudad = s.Ciudad.Nombre, ciudadId = s.CiudadId });
            return Json(sectores, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateSector(Sector sec)
        {
            // sec.Ciudad = db.Ciudad.SingleOrDefault(c => c.CiudadId == sec.CiudadId);

            db.Entry(sec).State = EntityState.Modified;
            db.SaveChanges();


            return Json(sec, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BorrarSector(int id)
        {
            var sector = db.Sector.Find(id);
            db.Sector.Remove(sector);
            db.SaveChanges();

            return Json(sector, JsonRequestBehavior.AllowGet);

        }
    }
}