
    var svg3 = d3.select("#svg3"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg3.attr("width") - margin.left - margin.right,
    height = svg3.attr("height") - margin.top - margin.bottom,
    g3 = svg3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
var line3 = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.hour); })
    .y(function(d) { return y(d.temperature); });


/////////////////// load the csv data ////////
d3.csv("./data/temperature.csv", function(error, data) {
    if (error) throw error;

    var rovers3 = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d) {
                return {hour: d.hour, temperature: d[id]};
            })
        };

    });
        //console.log(rovers)

//////////////// set the range of the data////////////
    x.domain([0,24]);
    y.domain([
        d3.min(rovers3, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
        d3.max(rovers3, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
    ]);
    z.domain(rovers3.map(function(c) { return c.id; }));


    /// append x axis//////
    g3.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(25));


    ///// add x label//////
    svg3.append("text")
        .attr("transform", "translate("+ (width/2+50) +","+(height+50)+")")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Mars Hour");

    /// append y axis/////
    g3.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))

    //// add y label/////
    svg3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Temperature(K)");

    var rover3 = g3.selectAll(".rover3")
        .data(rovers3)
        .enter().append("g")
        .attr("class", "rover3");

    rover3.append("path")
        .attr("class", "line")
        //.attr("d",line)
        .attr("d", function(d) { return line3(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .style("stroke-linecap", "round");


    rover3.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.temperature) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "15px sans-serif")
        .text(function(d) { return d.id; });


        // ///// add Title//////
        // svg3.append("text")
        // .attr("x", (width / 2))             
        // .attr("y", 0 - (margin.top / 2))
        // .attr("text-anchor", "middle")  
        // .style("font-size", "30px") 
        // .style("text-decoration", "underline")  
        // .text("Value vs Date Graph");

});

/////////////////////////svg 2///////


//     var svg2 = d3.select("svg2"),
//         margin = {top: 20, right: 80, bottom: 30, left: 50},
//         width = svg.attr("width") - margin.left - margin.right,
//         height = svg.attr("height") - margin.top - margin.bottom,
//         g2 = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     // Define scale
//     var x = d3.scaleLinear().range([0, width]),
//         y = d3.scaleLinear().range([height, 0]),
//         z = d3.scaleOrdinal(d3.schemeCategory10); // color scale
//
//
//     //define line generator
//     var line = d3.line()
//         .curve(d3.curveBasis)
//         .x(function(d) { return x(d.hour); })
//         .y(function(d) { return y(d.pressure); });
//
//
//     /////////////////// load the csv data ////////
//     d3.csv("./data/pressure.csv", function(error, data) {
//         if (error) throw error;
//
//         var rovers = data.columns.slice(1).map(function(id) {
//             return {
//                 id: id,
//                 values: data.map(function(d) {
//                     return {hour: d.hour, pressure: d[id]};
//                 })
//             };
//
//         });
//         //console.log(rovers)
//
// //////////////// set the range of the data////////////
//         x.domain([0,24]);
//         y.domain([
//             d3.min(rovers, function(c) { return d3.min(c.values, function(d) { return d.pressure; }); }),
//             d3.max(rovers, function(c) { return d3.max(c.values, function(d) { return d.pressure; }); })
//         ]);
//         z.domain(rovers.map(function(c) { return c.id; }));
//
//
//         /// append x axis//////
//         g2.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x).ticks(25));
//
//         ///// add x label//////
//         svg2.append("text")
//             .attr("transform", "translate("+ (width/2+50) +","+(height+50)+")")
//             .style("text-anchor", "middle")
//             .style("font-size","16px")
//             .text("Mars Hour");
//
//         /// append y axis/////
//         g2.append("g")
//             .attr("class", "axis axis--y")
//             .call(d3.axisLeft(y))
//
//         //// add y label/////
//         svg2.append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("x",0 - (height / 2))
//             .attr("dy", "1em")
//             .style("text-anchor", "middle")
//             .style("font-size","16px")
//             .text("Pressure(Pa)");
//
//         var rover = g.selectAll(".rover")
//             .data(rovers)
//             .enter().append("g")
//             .attr("class", "rover");
//
//         rover.append("path")
//             .attr("class", "line")
//             //.attr("d",line)
//             .attr("d", function(d) { return line(d.values); })
//             .style("stroke", function(d) { return z(d.id); })
//             .style("stroke-linecap", "round");
//
//
//         rover.append("text")
//             .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
//             .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.pressure) + ")"; })
//             .attr("x", 3)
//             .attr("dy", "0.35em")
//             .style("font", "15px sans-serif")
//             .text(function(d) { return d.id; });
//     });
//



