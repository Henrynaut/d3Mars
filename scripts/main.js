;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 1200;
	var height =800;



//     var x=d3.scaleLinear()
// 		.domain([0,width])
// 		.range([0,width]);
//
//     var y=d3.scaleLinear()
//         .domain([0,height-margin.top-margin.bottom])
//         .range([0,height-margin.top-margin.bottom]);
//
// 	var svg = d3.select("#chartDiv").append("svg")
// 			.attr("width", width)
// 			.attr("height", height)
//         	.style("margin-left", -margin.left + "px")
//         	.style("margin.right", -margin.right + "px")
//         	.append("g")
// 			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//
//     var grandparent = svg.append("g")  // create objects that contain rect and text
// 						.attr("class", "grandparent");
//
// 		// grandparent.append("rect")
// 		// 			.attr("y", -margin.top)
// 		// 			.attr("width", width)
// 		// 			.attr("height", margin.top)
// 		// 			.style('fill','steelblue');
//
//
//     var Rect1=grandparent.append("rect")
//     		.attr("x",0)
//     		.attr("y",-margin.top)
//             .attr("width", 570)
//             .attr("height", 395)
//             .style('fill','brown')
// 		.on("click",Zoom2Full);
//     grandparent.append("text")
//         		.attr("dx", function(d) { return 500/2 })
//         		.attr("dy", function(d) { return 395 / 2})
//         		.attr("font-family", "sans-serif")
// 				.attr("font-size", "30px")
// 				.text("Maps");
//
//     var Rect2=grandparent.append("rect")
//         .attr("x",0)
//         .attr("y",-margin.top+395)
//         .attr("width", 570)
//         .attr("height", 395)
//         .style('fill','Green');
//
//     grandparent.append("text")
//         .attr("dx", function(d) { return 500/2 })
//         .attr("dy", function(d) { return 395 / 2+395})
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "30px")
//         .text("Graphs");
//
//     var Rect3=grandparent.append("rect")
//         .attr("x",575)
//         .attr("y",-margin.top)
//         .attr("width", 570)
//         .attr("height", 395)
//         .style('fill','red');
//     grandparent.append("text")
//         .attr("dx", function(d) { return 500/2+550 })
//         .attr("dy", function(d) { return 395 / 2})
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "30px")
//         .text("Choropleth");
//
//
//     var Rect4=grandparent.append("rect")
//         .attr("x",575)
//         .attr("y",-margin.top+395)
//         .attr("width", 570)
//         .attr("height", 395)
//         .style('fill','steelblue');
//      grandparent.append("text")
//         .attr("dx", function(d) { return 500/2+570 })
//         .attr("dy", function(d) { return 395 / 2+395})
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "30px")
//         .text("Text");
//
//
//
// function Zoom2Full() {
// 	console.log("the rect is selected")
//
// 	var SelectedRect=d3.select(this)
//         .attr("x",0)
//         .attr("y",-margin.top)
//         .attr("width", width)
//         .attr("height", height)
//         .style('fill','steelblue');
// }
//



////////////////////////// Bar charts//////////////////////////////

    var svg = d3.select("#chartDiv").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("margin-left", -margin.left + "px")
        .style("margin.right", -margin.right + "px")

    var  g=svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	var x=d3.scaleBand().rangeRound([0,width]).padding(0.1)
	var y=d3.scaleLinear().rangeRound([height,0]);



// // import the csv data
// 	d3.csv("./data/Rovers_temperature.csv",function (error,data) {
//
// 			if (error) {
// 				return console.warn(error);
// 			}
//
//     });
//
// 	data.forEach(function (d) { d.Rovers =+d.Rovers;  })
//
//
// //
// 	x.domain(data.map(function (d) { return d.Rovers;}))
//     y.domain([0, d3.max(data, function(d) { return d.Pressure; })]);


    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));







    // DrawSection1();
    //
    // function DrawSection1() {
    //
		// var Rect1=svg.selectAll("rect")
		// 	.attr("x",0)
		// 	.attr("y",-2*margin.top)
    //         .attr("width", 250)
    //         .attr("height", 195)
    //         .style('fill','yellow')
    //
    //
    //
    //
    // }










// 	init();
//
// 	function init() {
//
// 		chartWidth = width - margin.left - margin.right;
// 		chartHeight = height - margin.top - margin.bottom;
//
// 		// load data from json
// 		d3.json("./data/stream_1.json", function(error, json) {
// 			if (error) {
// 				return console.warn(error);
// 			} else {
// 				data = json;
// 				console.log("JSON loaded");
//                 //console.log(data);
// 				initializeChart();
// 				//createAxes();
//
//
//
// 			/////////////////////////timer////////////////////////////////////////////////////////
//                 var tick=0;
//
//
//
//                 function timerCallback(elapsed) {
//
//
// 					if(elapsed>500) {                   // the time step is 1 second
//                         tick++;
//                         //console.log(tick);
//
//
//                         var UpdataDomain = { min:tick, max: tick+40 }; // the domain of the updated x-axis
//                         //console.debug(UpdataDomain.min)
//
//
//
//
// ///////////////////////////////////// update x axis /////////////////////////////////////////////////////////////
//                        chart.xScale = d3.scaleLinear() // update the scale
//                             .domain([UpdataDomain.min, UpdataDomain.max]) // the number value
//                             .range([0, chartWidth]); // the pixel value
//
//                         chart.xAxis                  // update the x-axis
//                             .scale(chart.xScale);
//
//                         chart.xAxisContainer.transition().duration(1000)
//                             .call(chart.xAxis);
//
//
//                         var MyJsonData=[]; // clear the array each time step
//                         for (var n=0;n<data.length;n++){
//
//                             if(data[n].xVal>UpdataDomain.min && data[n].xVal<UpdataDomain.max){ // to check the data in the domain
//
//                         		MyJsonData.push(data[n])// only add the dots in the domain range be pushed
//
// 							}
//
// 						}
//
//                        // console.log(MyJsonData);
//                         drawDots(MyJsonData); // draw the dots and move dots
//                         timer.restart(timerCallback);
//
//                     }
//
//                 }
//
//                 var timer=d3.timer(timerCallback);
//
//
// 			}
// 		});
//
//
// 	}//end init
//
// 	function initializeChart() {
// 		svg = d3.select("#chartDiv").append("svg")
// 		chart=svg.attr("width", width)
// 			.attr("height", height);
//
// 		chart.plotArea = chart.append("g")
// 			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// 	}
//
// 	// function createAxes() {
//     //
// 	// 	// x axis
// 	// 	chart.xScale = d3.scaleLinear()
// 	// 		.domain([0,40]) // the number value
// 	// 		.range([0, chartWidth]); // the pixel value
//     //
// 	// 	chart.xAxis = d3.axisBottom()
// 	// 		.tickSizeOuter(0)
// 	// 		.scale(chart.xScale);
//     //
// 	// 	chart.xAxisContainer = chart.append("g")
// 	// 		.attr("class", "x axis scatter-xaxis")
// 	// 		.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
// 	// 		.call(chart.xAxis);
//     //
// 	// 	// x axis header label
// 	// 	chart.append("text")
// 	// 		.attr("class", "x axis scatter-xaxis")
// 	// 		.style("font-size", "12px")
// 	// 		.attr("text-anchor", "middle")
// 	// 		.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
// 	// 		.text(xAxisLabelHeader);
//     //
// 	// 	// y axis labels
// 	// 	chart.yScale = d3.scaleLinear()
// 	// 		.domain([dataYRange.min, dataYRange.max])
// 	// 		.range([chartHeight, 0]);
//     //
// 	// 	chart.yAxis = d3.axisLeft()
// 	// 		.scale(chart.yScale);
//     //
// 	// 	chart.yAxisContainer = chart.append("g")
// 	// 		.attr("class", "y axis scatter-yaxis")
// 	// 		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
//     //
// 	// 		.call(chart.yAxis);
//     //
// 	// 	// y axis header label
// 	// 	chart.append('text')
// 	// 		.style("font-size", "12px")
// 	// 		.attr("class", "heatmap-yaxis")
// 	// 		.attr("text-anchor", "middle")
// 	// 		.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
// 	// 		.text(yAxisLabelHeader);
// 	// }
//
// 	function drawDots(MyJsonData) {
// 		// do something with the data here!
//
// 		// plot dots
// 		 var dots = chart.plotArea.selectAll(".dot")
// 			.data(MyJsonData,function(d,i){return d.id}) // create an unique key
//
//         dots.enter().append("circle")
// 				.attr("class", "dot")
// 				.attr("cx", function(d) { return chart.xScale(d.xVal); })
// 				.attr("cy", function(d) { return chart.yScale(d.yVal); })
// 				.attr("r", circleRadius)
// 				.style('fill','steelblue')
// 			.on('mouseover',function () {
//
//                 var position = d3.mouse(svg.node());
//                 var ripples = svg.append("circle")
//                         .attr("class", "ripple")
//                         .attr("cx", position[0])
//                         .attr("cy", position[1])
//                         .attr("r", 0)
// 						.style('fill','none')
//                         .style("stroke-width", 3)
// 						.style("stroke",'purple')
//                         .transition()
//                         .duration(1500)
//                         .ease(d3.easeQuadIn)
//                         .attr("r", 200)
//                         .style("stroke-opacity", 0)
//                         .on("end", function () {
//                             d3.select(this).remove();
//                         });
//
//
//             })
// 				.on("click", function(d) {
// 					console.log("circle: ", d.xVal, ", ", d.yVal);
// 						})
// 				.merge(dots)
// 				.attr("cx", function (d) {return chart.xScale(d.xVal)}) // change the x-value
//
//
// 				dots.exit()
// 					.remove();
// 	}
})();



