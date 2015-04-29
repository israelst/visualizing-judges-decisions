var d3 = require("d3");

function concatPositions(positions, decision){
    return positions.concat(decision.positions);
}

function decisionsInside(range, decisions){
    return decisions.filter(function(decision){
        return decision.positions.some(function(pos){
            return pos >= range[0] && pos <= range[1];
        });
    });
}

exports.Hist = function(svg){
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 960 - margin.left - margin.right,
        height = 500/2 - margin.top - margin.bottom,

        x = d3.scale.linear()
            .domain([0, 1])
            .range([0, width]),

        xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.format(".0%"))
            .orient("bottom"),

        brush = d3.svg.brush().x(x),

        container = svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
        bars = container.append("g").attr("class", "bars");

    container.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height + 7);

    container.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    this.setBrush = function(brushend){
        var that = this;
        brush.on("brushend", function (){
            var range = brush.extent();
            brushend(decisionsInside(range, that.decisions));
        });
    };

    this.plot = function(decisions){
        this.decisions = decisions;
        var positions = decisions.reduce(concatPositions, []),

            data = d3.layout.histogram()
                .bins(x.ticks(50))
                (positions),

            y = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.y; })])
                .range([height, 0]),

            barGroup = bars.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        barGroup.append("rect")
            .attr("width", x(data[0].dx))
            .attr("height", function(d) { return height - y(d.y); });

        barGroup.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", x(data[0].dx) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return d3.format(",.0f")(d.y); });
    };

};

