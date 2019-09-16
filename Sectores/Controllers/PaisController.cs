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


        public ActionResult Editar(int? id)
        {
            var pais = db.Pais.SingleOrDefault(p => p.PaisId == id);
            if (pais != null){
                return View(pais);
            }
            return View();
        }

        [HttpPost]
        public ActionResult Editar(Pais pais)
        {
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Guardar(Pais pais)
        {
            if (pais != null)
            {
                db.Pais.Add(pais);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public JsonResult listarPaises()
        {
            //var lista = new List<Pais>();
            //lista.Add(new Pais() { PaisId = 1, Nombre = "Argentina", Estado = true });
            var listado = db.Pais.ToList();
            return Json(listado, JsonRequestBehavior.AllowGet);
        }


    }
}