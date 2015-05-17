/// <reference path="vendor/knockout.js" />

// Constructor for an object with two properties
var Patient = function (name) {
  this.patientName = name;
};

var Tooth = function () {
  this.present = ko.observable(true)
};

var Mouth = function () {
  this.mouthTop = ko.observableArray([new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth()]);
  this.mouthBottom = ko.observableArray([new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth(), new Tooth()]);
};

var viewModel = {
  selectedPage: ko.observable(),
  selectedTooth: ko.observable(),
  isSelected: function (id) {
    return id == this.selectedPage();
  },
  gotoView: function (page) {
    this.selectedPage(page);
  },
  availablePatients: ko.observableArray([
      new Patient("Bob"),
      new Patient("Sue"),
      new Patient("Charlie")
  ]),
  selectedPatient: ko.observable(),
  mouth: ko.observable(new Mouth()),
  selectTooth: function (row, idx) {
    if (this.selectedPatient() == undefined) {
      return;
    }
    var tooth;
    if (row == "top") {
      tooth = this.mouth().mouthTop()[idx - 1];
    } else {
      tooth = this.mouth().mouthBottom()[idx - 1];
    }
    this.selectedTooth(tooth);
    console.info(tooth);
  },
  removeTooth: function () {
    if (this.selectedTooth() == undefined) {
      return;
    }
    this.selectedTooth().present(false);
    console.info("removing tooth");
  }
};

//var mySecondViewModel = {
//  something: "this is the second view model"
//};

ko.applyBindings(viewModel, document.getElementById("firstVM"));
//ko.applyBindings(mySecondViewModel, document.getElementById("secondVM"));
viewModel.gotoView("exam");
viewModel.selectedTooth();


//dmft = missing + decayed + filled