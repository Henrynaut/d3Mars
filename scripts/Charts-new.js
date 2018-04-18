var rover1;
var rover2;
var rover3;
var rover4;

var line;
var line1;
var line3;
var line4;

/////// Horizontal Wind  ///////
var svg1 = d3.select("#svg1"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg1.attr("width") - margin.left - margin.right,
    height = svg1.attr("height") - margin.top - margin.bottom,
    g1 = svg1.append("g")
        .attr("id", "wind")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
line1 = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.hour); })
    .y(function(d) { return y(d.windspeed); });


/////////////////// load the csv data ////////
d3.csv("./data/windspeed.csv", function(error, data1) {
    if (error) throw error;

    var rovers1 = data1.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data1.map(function(d) {
                return {hour: d.hour, windspeed: d[id]};
            })
        };

    });
    //console.log(rovers)

//////////////// set the range of the data////////////
    x.domain([0,24]);
    y.domain([0,11]);
    z.domain(rovers1.map(function(c) { return c.id; }));


    /// append x axis//////
    g1.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(25));

    ///// add x label//////
    svg1.append("text")
        .attr("transform", "translate("+ (width/2+50) +","+(height+50)+")")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Mars Hour");

    /// append y axis/////
    g1.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(8));

    //// add y label/////
    svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Wind Speed(m/s)");

    rover1 = g1.selectAll(".rover")
        .data(rovers1)
        .enter().append("g")
        .attr("class", "rover");

    rover1.append("path")
        .attr("class", "line")
        .attr("d",line)
        .attr("d", function(d) { return line1(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .on ('mouseover',HighlightLines1)
        .on ('mouseout',NoHighlightLines1)
        .style("stroke-linecap", "round");


    rover1.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.windspeed) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "15px sans-serif")
        .text(function(d) { return d.id; });
})

//////////////// SOLAR FLUX CODE /////////////////
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
line = d3.line()
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
        .text("Solar Flux (W/m^2*hz)");

    rover2 = g2.selectAll(".rover")
        .data(rovers)
        .enter().append("g")
        .attr("class", "rover");

    rover2.append("path")
        .attr("class", "line")
        .attr("d",line)
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .on ('mouseover',HighlightLines2)
        .on ('mouseout',NoHighlightLines2)
        .style("stroke-linecap", "round");


    rover2.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.solarflux) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });
});

//////////////// TEMPERATURE CODE /////////////////
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
line3 = d3.line()
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

    rover3 = g3.selectAll(".rover")
        .data(rovers3)
        .enter().append("g")
        .attr("class", "rover");

    rover3.append("path")
        .attr("class", "line")
        .attr("d",line)
        .attr("d", function(d) { return line3(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .on ('mouseover',HighlightLines3)
        .on ('mouseout',NoHighlightLines3)
        .style("stroke-linecap", "round");


    rover3.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.temperature) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "15px sans-serif")
        .text(function(d) { return d.id; });



});


//////////////// PRESSURE CODE /////////////////

var svg4 = d3.select("#svg4"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg4.attr("width") - margin.left - margin.right,
    height = svg4.attr("height") - margin.top - margin.bottom,
    g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
line4 = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.hour); })
    .y(function(d) { return y(d.pressure); });


/////////////////// load the csv data ////////
d3.csv("./data/pressure.csv", function(error, data) {
    if (error) throw error;

     var rovers4 = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d) {
                return {hour: d.hour, pressure: d[id]};
            })
        };

    });
    //console.log(rovers)

//////////////// set the range of the data////////////
    x.domain([0,24]);
    y.domain([
        d3.min(rovers4, function(c) { return d3.min(c.values, function(d) { return d.pressure; }); }),
        d3.max(rovers4, function(c) { return d3.max(c.values, function(d) { return d.pressure; }); })
    ]);
    z.domain(rovers4.map(function(c) { return c.id; }));


/// append x axis//////
    g4.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(25));

///// add x label//////
    svg4.append("text")
        .attr("transform", "translate("+ (width/2+50) +","+(height+50)+")")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Mars Hour");

/// append y axis/////
    g4.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))

//// add y label/////
    svg4.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Pressure(Pa)");

    rover4 = g4.selectAll(".rover")
        .data(rovers4)
        .enter().append("g")
        .attr("class", "rover");

    rover4.append("path")
        .attr("class", "line")
        .attr("d",line)
        .attr("d", function(d) { return line4(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .on ('mouseover',HighlightLines4)
        .on ('mouseout',NoHighlightLines4)
        .style("stroke-linecap", "round");


    rover4.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.pressure) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "15px sans-serif")
        .text(function(d) { return d.id; });

})


//////////////////////////////////////////linking function///////////////////////////////////

function HighlightLines1(d){

    var Currentname=d.id;
    //console.log(Currentname)
    //
    d3.select(this).style('stroke-width','8px');

//////////////// SOLAR FLUX CODE ////////////////////////////////////////////////
    var svg2 = d3.select("#svg2"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg2.attr("width") - margin.left - margin.right,
        height = svg2.attr("height") - margin.top - margin.bottom,
        g2 = svg2.append("g")
            .attr("id", "flux")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//define line generator
    line = d3.line()
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

        x.domain([0,24]);
        y.domain([0,500]);
        z.domain(rovers.map(function(c) { return c.id; }));


        rover2 = g2.selectAll(".rover")
            .data(rovers)
            .enter().append("g")
            .attr("class", "rover");

        rover2.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id==Currentname }) //filter the line with same id
            .style('stroke-width','8px')

    });
//////// ///////////////////////// TEMPERATURE CODE /////////////////
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
    line3 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.temperature); });


/////////////////// load the csv data ////////
    d3.csv("./data/temperature.csv", function(error, data) {
        if (error) throw error;

        rovers3 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, temperature: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers3, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
            d3.max(rovers3, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
        ]);
        z.domain(rovers3.map(function(c) { return c.id; }));
        rover3 = g3.selectAll(".rover")
            .data(rovers3)
            .enter().append("g")
            .attr("class", "rover");

        rover3.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line3(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')


    });


/////////////////////////Pressure code //////////////////////////////////////

    var svg4 = d3.select("#svg4"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg4.attr("width") - margin.left - margin.right,
        height = svg4.attr("height") - margin.top - margin.bottom,
        g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line4 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.pressure); });


/////////////////// load the csv data ////////
    d3.csv("./data/pressure.csv", function(error, data) {
        if (error) throw error;

        rovers4 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, pressure: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers4, function(c) { return d3.min(c.values, function(d) { return d.pressure; }); }),
            d3.max(rovers4, function(c) { return d3.max(c.values, function(d) { return d.pressure; }); })
        ]);
        z.domain(rovers4.map(function(c) { return c.id; }));

        rover4 = g4.selectAll(".rover")
            .data(rovers4)
            .enter().append("g")
            .attr("class", "rover");

        rover4.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line4(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

}

function HighlightLines2(d){

    var Currentname=d.id;
    //console.log(Currentname)
    //
    d3.select(this).style('stroke-width','8px');

/////// Horizontal Wind  ////////////////////////
    var svg1 = d3.select("#svg1"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg1.attr("width") - margin.left - margin.right,
        height = svg1.attr("height") - margin.top - margin.bottom,
        g1 = svg1.append("g")
            .attr("id", "wind")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line1 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.windspeed); });


/////////////////// load the csv data ////////
    d3.csv("./data/windspeed.csv", function(error, data1) {
        if (error) throw error;

        var rovers1 = data1.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data1.map(function(d) {
                    return {hour: d.hour, windspeed: d[id]};
                })
            };

        });
        //console.log(rovers)

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([0,11]);
        z.domain(rovers1.map(function(c) { return c.id; }));

        rover1 = g1.selectAll(".rover")
            .data(rovers1)
            .enter().append("g")
            .attr("class", "rover");

        rover1.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line1(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

//////// ///////////////////////// TEMPERATURE CODE /////////////////
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
    line3 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.temperature); });


/////////////////// load the csv data ////////
    d3.csv("./data/temperature.csv", function(error, data) {
        if (error) throw error;

        rovers3 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, temperature: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers3, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
            d3.max(rovers3, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
        ]);
        z.domain(rovers3.map(function(c) { return c.id; }));
        rover3 = g3.selectAll(".rover")
            .data(rovers3)
            .enter().append("g")
            .attr("class", "rover");

        rover3.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line3(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')


    });


/////////////////////////Pressure code //////////////////////////////////////

    var svg4 = d3.select("#svg4"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg4.attr("width") - margin.left - margin.right,
        height = svg4.attr("height") - margin.top - margin.bottom,
        g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line4 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.pressure); });


/////////////////// load the csv data ////////
    d3.csv("./data/pressure.csv", function(error, data) {
        if (error) throw error;

        rovers4 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, pressure: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers4, function(c) { return d3.min(c.values, function(d) { return d.pressure; }); }),
            d3.max(rovers4, function(c) { return d3.max(c.values, function(d) { return d.pressure; }); })
        ]);
        z.domain(rovers4.map(function(c) { return c.id; }));

        rover4 = g4.selectAll(".rover")
            .data(rovers4)
            .enter().append("g")
            .attr("class", "rover");

        rover4.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line4(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

}

function HighlightLines3(d){

    var Currentname=d.id;
    //console.log(Currentname)
    //
    d3.select(this).style('stroke-width','8px');

/////// Horizontal Wind  ////////////////////////
    var svg1 = d3.select("#svg1"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg1.attr("width") - margin.left - margin.right,
        height = svg1.attr("height") - margin.top - margin.bottom,
        g1 = svg1.append("g")
            .attr("id", "wind")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line1 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.windspeed); });


/////////////////// load the csv data ////////
    d3.csv("./data/windspeed.csv", function(error, data1) {
        if (error) throw error;

        var rovers1 = data1.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data1.map(function(d) {
                    return {hour: d.hour, windspeed: d[id]};
                })
            };

        });
        //console.log(rovers)

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([0,11]);
        z.domain(rovers1.map(function(c) { return c.id; }));

        rover1 = g1.selectAll(".rover")
            .data(rovers1)
            .enter().append("g")
            .attr("class", "rover");

        rover1.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line1(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

//////////////// SOLAR FLUX CODE ////////////////////////////////////////////////
    var svg2 = d3.select("#svg2"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg2.attr("width") - margin.left - margin.right,
        height = svg2.attr("height") - margin.top - margin.bottom,
        g2 = svg2.append("g")
            .attr("id", "flux")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//define line generator
    line = d3.line()
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

        x.domain([0,24]);
        y.domain([0,500]);
        z.domain(rovers.map(function(c) { return c.id; }));


        rover2 = g2.selectAll(".rover")
            .data(rovers)
            .enter().append("g")
            .attr("class", "rover");

        rover2.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id==Currentname }) //filter the line with same id
            .style('stroke-width','8px')

    });

/////////////////////////Pressure code //////////////////////////////////////

    var svg4 = d3.select("#svg4"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg4.attr("width") - margin.left - margin.right,
        height = svg4.attr("height") - margin.top - margin.bottom,
        g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line4 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.pressure); });


/////////////////// load the csv data ////////
    d3.csv("./data/pressure.csv", function(error, data) {
        if (error) throw error;

        rovers4 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, pressure: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers4, function(c) { return d3.min(c.values, function(d) { return d.pressure; }); }),
            d3.max(rovers4, function(c) { return d3.max(c.values, function(d) { return d.pressure; }); })
        ]);
        z.domain(rovers4.map(function(c) { return c.id; }));

        rover4 = g4.selectAll(".rover")
            .data(rovers4)
            .enter().append("g")
            .attr("class", "rover");

        rover4.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line4(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

}


function HighlightLines4(d){

    var Currentname=d.id;
    //console.log(Currentname)
    //
    d3.select(this).style('stroke-width','8px');

/////// Horizontal Wind  ////////////////////////
    var svg1 = d3.select("#svg1"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg1.attr("width") - margin.left - margin.right,
        height = svg1.attr("height") - margin.top - margin.bottom,
        g1 = svg1.append("g")
            .attr("id", "wind")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define scale
    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10); // color scale


//define line generator
    line1 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.windspeed); });


/////////////////// load the csv data ////////
    d3.csv("./data/windspeed.csv", function(error, data1) {
        if (error) throw error;

        var rovers1 = data1.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data1.map(function(d) {
                    return {hour: d.hour, windspeed: d[id]};
                })
            };

        });
        //console.log(rovers)

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([0,11]);
        z.domain(rovers1.map(function(c) { return c.id; }));

        rover1 = g1.selectAll(".rover")
            .data(rovers1)
            .enter().append("g")
            .attr("class", "rover");

        rover1.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line1(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')
    })

//////////////// SOLAR FLUX CODE ////////////////////////////////////////////////
    var svg2 = d3.select("#svg2"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg2.attr("width") - margin.left - margin.right,
        height = svg2.attr("height") - margin.top - margin.bottom,
        g2 = svg2.append("g")
            .attr("id", "flux")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//define line generator
    line = d3.line()
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

        x.domain([0,24]);
        y.domain([0,500]);
        z.domain(rovers.map(function(c) { return c.id; }));


        rover2 = g2.selectAll(".rover")
            .data(rovers)
            .enter().append("g")
            .attr("class", "rover");

        rover2.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id==Currentname }) //filter the line with same id
            .style('stroke-width','8px')

    });
//////// ///////////////////////// TEMPERATURE CODE /////////////////
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
    line3 = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.temperature); });


/////////////////// load the csv data ////////
    d3.csv("./data/temperature.csv", function(error, data) {
        if (error) throw error;

        rovers3 = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {hour: d.hour, temperature: d[id]};
                })
            };

        });

//////////////// set the range of the data////////////
        x.domain([0,24]);
        y.domain([
            d3.min(rovers3, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
            d3.max(rovers3, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
        ]);
        z.domain(rovers3.map(function(c) { return c.id; }));
        rover3 = g3.selectAll(".rover")
            .data(rovers3)
            .enter().append("g")
            .attr("class", "rover");

        rover3.append("path")
            .attr("class", "line")
            .attr("d",line)
            .attr("d", function(d) { return line3(d.values); })
            .style("stroke", function(d) { return z(d.id); })
            .filter(function (d) {return d.id == Currentname}) //filter the line with same id
            .style('stroke-width', '8px')


    });


}



/////////////////////////////////// Do not highlighted the lines/////////////////////////////////////////////////////////////
function NoHighlightLines1() {

    d3.select(this).style('stroke-width','3px');// reset the selected line
    rover2.remove(); // remove the highlighted line in chart2
    rover3.remove(); // remove the highlighted line in chart3
    rover4.remove(); // remove the highlighted line in chart4
}

function NoHighlightLines2() {

    d3.select(this).style('stroke-width','3px');// reset the selected line
    rover1.remove(); // remove the highlighted line in chart1
    rover3.remove(); // remove the highlighted line in chart3
    rover4.remove(); // remove the highlighted line in chart4
}

function NoHighlightLines3() {

    d3.select(this).style('stroke-width','3px');// reset the selected line
    rover1.remove(); // remove the highlighted line in chart1
    rover2.remove(); // remove the highlighted line in chart2
    rover4.remove(); // remove the highlighted line in chart4
}

function NoHighlightLines4() {

    d3.select(this).style('stroke-width','3px');// reset the selected line
    rover1.remove(); // remove the highlighted line in chart1
    rover2.remove(); // remove the highlighted line in chart2
    rover3.remove(); // remove the highlighted line in chart3
}
