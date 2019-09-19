

$(document).ready(function () {

    function PaisModel(data) {
        var self    = this;
        self.paisId = ko.observable(data !== null && data !== undefined ? data.paisId : null);
        self.paisId = ko.observable(data !== null && data !== undefined ? data.nombre : null);
    }

    function SectorModel(data) {
        var self        = this;
        self.ciudadId   = ko.observable(data !== null && data !== undefined ? data.ciudadId : null);
        self.sectorId   = ko.observable(data !== null && data !== undefined ? data.sectorId : null);
        self.nombre     = ko.observable(data !== null && data !== undefined ? data.nombre   : null);
        self.ciudad     = ko.observable(data !== null && data !== undefined ? data.ciudad   : null);
    }

    function CiudadModel(data) {
        var self        = this;
        self.ciudadId   = ko.observable(data.ciudadId);
        self.nombre     = ko.observable(data.nombre);
        self.paisId     = ko.observable(data.paisId);
    }

    function ViewModel() {
        var self        = this;
        self.ciudadId   = ko.observable();
        self.sectorId   = ko.observable('');
        self.nombre     = ko.observable('');
        self.ciudad     = ko.observable('');

        self.pais       = ko.observableArray([]);
        self.ciudades   = ko.observableArray([]);
        self.sectores   = ko.observableArray([]);

        self.sector     = ko.observable(new SectorModel());

        self.refresh = function () {
            self.getCiudades();
            $.getJSON('/sector/getAllSectores', function (data) {
                self.sectores.removeAll();
                $.map(data, function (d) {
                    self.sectores.push(new SectorModel(d));
                });
            });
        };

        self.borrarSector = function (sector) {
            if (confirm("Seguro que desea borrar?")) {
                $.getJSON('/sector/BorrarSector/' + sector.sectorId(), function (data) {
                    self.refresh();
                    console.log(data);
                });
            }
        };

        self.close = function () {
            self.sector(new SectorModel());
        };

        self.editar = function (sector) {
           
            $.getJSON('/sector/getSectorById/' + sector.sectorId(), function (data) {
                self.sector(new SectorModel(data));
                console.log(ko.toJS(self.sector()));
            });
        };

        self.updateSector = function () {
            $.post("/sector/UpdateSector", ko.toJS(self.sector()), function (data, status) {
                self.refresh();
                self.sector(new SectorModel());
                console.log(ko.toJS(self.sector()));
             
            });
        };

        self.createSector = function () {
            $.post("/sector/CreateSector", ko.toJS(self.sector()), function (data, status) {
                self.refresh();
            });

        };

        self.getCiudades = function () {
            $.get("/ciudad/getCiudades", function (data) {
                self.ciudades.removeAll();
               
                $.map(data, function (ciudad) {
                    self.ciudades.push(new CiudadModel(ciudad));
                });
                console.log(ko.toJS(self.ciudades));
            });
        };

    }
    var viewModel = new ViewModel();
    viewModel.refresh();
    ko.applyBindings(viewModel);
});