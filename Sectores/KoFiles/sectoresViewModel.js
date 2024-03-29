﻿

$(document).ready(function () {

    function PaisModel(data) {
        var self    = this;
        self.paisId = ko.observable(data !== null && data !== undefined ? data.paisId : null);
        self.nombre = ko.observable(data !== null && data !== undefined ? data.nombre : null);
        self.ciudades = ko.observableArray([]);
    }

    function SectorModel(data, vm) {
        var self        = this;
        self.ciudadId   = ko.observable(data !== null && data !== undefined ? data.ciudadId : null);
        self.sectorId   = ko.observable(data !== null && data !== undefined ? data.sectorId : null);
        self.nombre     = ko.observable(data !== null && data !== undefined ? data.nombre   : null);
        self.ciudad     = ko.observable(data !== null && data !== undefined ? data.ciudad : null);
        self.paisSelectedId = ko.observable(data !== null && data !== undefined ? data.paisSelectedId : null);
        self.paisSelectedId.subscribe(function (p) {
            if (p > 0) {
                vm.getCiudadesPorPais(p);
            }
        });
    }

    function CiudadModel(data) {
        var self        = this;
        self.ciudadId   = ko.observable(data.ciudadId);
        self.nombre     = ko.observable(data.nombre);
        self.paisId = ko.observable(data.paisId);
    }

    function ViewModel() {
        var self        = this;
        self.ciudadId   = ko.observable();
        self.sectorId   = ko.observable('');
        self.nombre     = ko.observable('');
        self.ciudad     = ko.observable('');

        self.paises     = ko.observableArray([]);
        self.ciudades   = ko.observableArray([]);
        self.sectores   = ko.observableArray([]);

        self.sector = ko.observable();

        self.refresh = function () {
            self.getPaises();
            //self.getCiudades();
            $.getJSON('/sector/getAllSectores', function (data) {
                self.sectores.removeAll();
                $.map(data, function (d) {
                    self.sectores.push(new SectorModel(d, self));
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
            self.sector(new SectorModel(null, self));
        };

        self.editar = function (sector) {
            self.getCiudadesPorPais(sector.paisSelectedId()).then(function () {
                $.getJSON('/sector/getSectorById/' + sector.sectorId(), function (data) {
                    //self.getCiudadesPorPais(data.paisSelectedId); // revisar
                    self.sector(new SectorModel(data, self));
                    console.log(ko.toJS(self.sector()));
                });
            });
         
        };

        self.updateSector = function () {
            $.post("/sector/UpdateSector", ko.toJS(self.sector()), function (data, status) {
                self.refresh();
                self.sector(new SectorModel(null, self));
                console.log(ko.toJS(self.sector()));
             
            });
        };

        self.createSector = function () {
            self.sector(new SectorModel(null, self));
        };

        self.guardarSector = function () {
            $.post("/sector/CreateSector", ko.toJS(self.sector()), function (data, status) {
                self.refresh();
            });
        };

        self.getCiudades = function (id) {
            $.get("/ciudad/getCiudades/", function (data) {
                self.ciudades.removeAll();

                $.map(data, function (ciudad) {
                    self.ciudades.push(new CiudadModel(ciudad));
                });
                //console.log(ko.toJS(self.ciudades));
            });
        };

        self.getCiudadesPorPais = function (id) {
            return $.get("/ciudad/getCiudadesPorPais/" + id, function (data) {
                self.ciudades.removeAll();
               
                $.map(data, function (ciudad) {
                    self.ciudades.push(new CiudadModel(ciudad));
                });
                console.log(ko.toJS(self.ciudades));
            });
        };

        self.getPaises = function () {
            $.get("/pais/getPaises", function (data) {
                self.paises.removeAll();
                $.map(data, function (pais) {
                    self.paises.push(new PaisModel(pais));
                });
                console.log(ko.toJS(self.paises));
            });
        };
    }

    var viewModel = new ViewModel();
    viewModel.refresh();
    ko.applyBindings(viewModel);
});