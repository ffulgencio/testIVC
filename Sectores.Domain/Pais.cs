using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sectores.Domain
{
    class Pais
    {
        [Key]
        public int PaisId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }
        public bool Estado { get; set; }

        public virtual List<Ciudad> Ciudades { get; set; }


    }
}
