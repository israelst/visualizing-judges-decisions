var d3 = require("d3"),
    Hist = require("./hist").Hist;

window.addEventListener("load", function(){
    var svg = d3.select("#histogram").append("svg"),
        histogram = new Hist(svg),

        slide = document.getElementById("slide"),
        chosen = document.getElementById("chosen");

    slide.onchange = function(){
        chosen.textContent = this.value;
    };
    slide.onchange();

    document.forms.search.addEventListener("submit", function(event){
        event.preventDefault();
        histogram.setBrush(function(brushedDecisions){
            var decisionsContainer = d3.select("#decisions"),
                pre = decisionsContainer
                    .selectAll("pre")
                    .data(brushedDecisions);

            decisionsContainer.html("<div class='alert alert-success'>" +
                                    "Mostrando <strong>" + brushedDecisions.length + "</strong> " +
                                        "decisões.");

            pre.enter().append("pre");
            pre.exit().remove();
            pre.text(function(d){ return d.text;});
        });

        histogram.plot([], slide.value);
        d3.json("where-is?q=" + this.q.value, function(response){
            histogram.plot(response.decisions, slide.value);
        });
    });
});
