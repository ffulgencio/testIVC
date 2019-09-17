using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sectores.Domain
{
    public class Ciudad
    {
        [Key]
        public int CiudadId { get; set; }

        [MaxLength(100)]
        public string Nombre { get; set; }

        public int PaisId { get; set; }

        public virtual Pais Pais { get; set; }

        public bool Estado { get; set; }

        public virtual List<Sector> Sectores { get; set; }
    }
}
