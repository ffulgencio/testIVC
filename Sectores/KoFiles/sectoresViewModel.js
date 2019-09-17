

    $(document).ready(function () {

        function Ciudad() {
            var self = this;
            self.ciudadId = 0;
            self.nombre = '';
            self.paisId = 0;
            self.estado = 0;
        }

        function SectorModel(data) {
            
            var self = this;
            if (data !== null) {
                self.sectorId = ko.observable(data.sectorId);
                self.nombre = ko.observable(data.nombre);
                self.ciudad = ko.observable(data.ciudad);
                self.Estado = ko.observable(data.estado);
            }
           
        }

        function ViewModel() {
            var self = this;
            self.sectorId = ko.observable('');
            self.nombre = ko.observable('');
            self.ciudad = ko.observable('');
            self.sector = ko.observable();

            self.borrarSector = function (sector) {
                
            };

            self.sectores = ko.observableArray([]);

            $.getJSON('/sector/getAllSectores', function (data) {
                self.sectores(data);
            });
    
            self.editar = function (sector) {
                self .sector(sector);
                console.log(sector);
            };

        }
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel, document.getElementById("listado"));
});