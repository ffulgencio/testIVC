using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sectores.Domain
{
    public class Sector
    {
        [Key]
        public int SectorId { get; set; }
        [MaxLength(100)]
        public string Nombre { get; set; }

        public int CiudadId { get; set; }

        public virtual Ciudad Ciudad { get; set; }
    }
}
