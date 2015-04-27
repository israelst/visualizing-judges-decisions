var d3 = require("d3"),
    Hist = require("./hist").Hist;

window.addEventListener("load", function(){
    document.forms.search.addEventListener("submit", function(event){
        event.preventDefault();
        var svg = d3.select("#histogram").append("svg"),
            histogram = new Hist(svg);
        d3.json("where-is?q=" + this.q.value, function(response){
            histogram.plot(response.decisions);
        });
    });
});
