function hist(response){
    var decisions = response.decisions;
    var values = decisions.reduce(function(x, y){
        var positions = x.positions || x;
        return positions.concat(y.positions);
    });

    function brushed(){
        var range = brush.extent();
        var brushed_decisions = decisions.filter(function(decision, index, array){
            return decision.positions.some(function(pos){
                return pos >= range[0] && pos <= range[1];
            });
        });
        document.getElementById('decisions').innerHTML = ('<div class="alert alert-success">Mostrando <strong>' +
                                                         brushed_decisions.length + '</strong> decisões.</div>');

        var pre = d3.select('#decisions').selectAll('pre').data(brushed_decisions);
        pre.enter().append('pre');
        pre.exit().remove();
        pre.text(function(d){ return d.text;});
    }

    // A formatter for counts.
    var formatCount = d3.format(",.0f");

    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 960 - margin.left - margin.right,
        height = 500/2 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, width]);

    var brush = d3.svg.brush()
        .x(x)
        .on("brushend", brushed);

    // Generate a histogram using twenty uniformly-spaced bins.
    var data = d3.layout.histogram()
        .bins(x.ticks(50))
        (values);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.format(".0%"))
        .orient("bottom");

    var svg = d3.select("#histogram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function(d) { return height - y(d.y); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", x(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height + 7);
}
