/// <reference path="vendor/knockout.js" />

// Constructor for an object with two properties
var Patient = function (name) {
  this.patientName = name;
};

var Tooth = function (location, idx) {
  this.location = location;
  this.idx = idx;
  this.present = ko.observable(true);
  this.decay = ko.observable(false);
  this.filling = ko.observable(false);
  this.score = function () {
    return (this.filling() || this.decay() || !this.present()) ? 1 : 0;
  };
};

var Mouth = function () {
  this.createMouth = function () {
    for (var i = 0; i < 16; i++) {
      this.mouthTop().push(new Tooth("Upper", i + 1));
    }
    for (var i = 0; i < 16; i++) {
      this.mouthBottom().push(new Tooth("Lower", i + 1));
    }
  };
  this.mouthTop = ko.observableArray();
  this.mouthBottom = ko.observableArray();
  this.dmtf = function () {
    var score = 0;
    for (var i = 0; i < 16; i++) {
      score += this.mouthTop()[i].score();
    }
    for (var i = 0; i < 16; i++) {
      score += this.mouthBottom()[i].score();
    }

    return score;
  };
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
  },
  addDecay: function () {
    if (this.selectedTooth() == undefined) {
      return;
    }
    this.selectedTooth().decay(true);
  },
  addFilling: function () {
    if (this.selectedTooth() == undefined) {
      return;
    }
    this.selectedTooth().filling(true);
  }

};

//var mySecondViewModel = {
//  something: "this is the second view model"
//};

viewModel.mouth().createMouth();
ko.applyBindings(viewModel, document.getElementById("firstVM"));
//ko.applyBindings(mySecondViewModel, document.getElementById("secondVM"));
viewModel.gotoView("exam");
viewModel.selectedTooth();


//dmft = missing + decayed + filled