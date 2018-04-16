
    var svg2 = d3.select("#svg2"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg2.attr("width") - margin.left - margin.right,
    height = svg2.attr("height") - margin.top - margin.bottom,
    g2 = svg2.append("g")
        .attr("id", "flux")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.hour); })
    .y(function(d) { return y(d.solarflux); });


/////////////////// load the csv data ////////
d3.csv("./data/solarflux.csv", function(error, data) {
    if (error) throw error;

    var rovers = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d) {
                return {hour: d.hour, solarflux: d[id]};
            })
        };

    });
        //console.log(rovers)

//////////////// set the range of the data////////////
    x.domain([0,24]);
    y.domain([0,500]);
    z.domain(rovers.map(function(c) { return c.id; }));


    /// append x axis//////
    g2.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(25));

    ///// add x label//////
    svg2.append("text")
        .attr("transform", "translate("+ (width/2+50) +","+(height+50)+")")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Mars Hour");

    /// append y axis/////
    g2.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))

    //// add y label/////
    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Solar Flux (W/m^2)");

    var rover = g2.selectAll(".rover")
        .data(rovers)
        .enter().append("g")
        .attr("class", "rover");

    rover.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .style("stroke-linecap", "round");


    rover.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.solarflux) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });
});
