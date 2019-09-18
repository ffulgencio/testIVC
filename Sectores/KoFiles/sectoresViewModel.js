

$(document).ready(function () {


    function SectorModel(data) {

        var self = this;

        self.sectorId = ko.observable(data !== null && data !== undefined ? data.sectorId : null);
        self.nombre = ko.observable(data !== null && data !== undefined ? data.nombre : null);
        self.ciudad = ko.observable(data !== null && data !== undefined ? data.ciudad : null);

    }

    function ViewModel() {
        var self = this;
        self.sectorId = ko.observable('');
        self.nombre = ko.observable('');
        self.ciudad = ko.observable('');

        self.sectores = ko.observableArray([]);

        self.sector = ko.observable(new SectorModel());

        $.getJSON('/sector/getAllSectores', function (data) {
            for (var i = 0; i < data.length; i++) {
                self.sectores.push(new SectorModel(data[i]));
            }
        });

        self.borrarSector = function (sector) {
            var sect = ko.toJS(sector);
            console.log(sect);
        };

        self.editar = function (sector) {
            var sect = ko.toJS(sector);
            var id = sect.sectorId;
            $.getJSON('/sector/getSectorById/' + id, function (data) {
                self.sector(new SectorModel(data));
                console.log(self.sector);
                console.log(data);
            });
               
                
            };

            self.updateSector = function () {

            };
        }
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});