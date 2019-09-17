using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;

namespace Sectores.Domain
{
    public class ContextoDb: DbContext
    {
        public DbSet<Pais> Pais { get; set; }

        public DbSet<Ciudad> Ciudad { get; set; }

        public DbSet<Sector> Sector { get; set; }

        public ContextoDb()
        {
            
        }
    }
}
