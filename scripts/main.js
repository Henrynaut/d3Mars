//Edited by Neil McHenry, Feb 12th, 2018
// VIZA  689 D3 HW#2

//Global Variables for Pausing
var duration = 1000;
var pause_flag = 0;

//Global settings for the transition type and duration
var ease_transition = d3.easeLinear;
var transition_time = 10000;
var transition_time_shape = transition_time;
var transition_dist = 5;
var transition_dist2 = transition_dist;
var transition_plot = 20;
var chart;



		var margin = { top: 10, right: 10, bottom: 80, left: 50 };
		var width = 450;
		var height = 300;

//define margins for data
		var dataMargin = {
			top: 10,
			right: 10,
			bottom: 100,
			left: margin.left + 55 };


		var dataXRange = { min: 40, max: 100 };
		var dataYRange = { min: 0, max: 100 };
		var xAxisLabelHeader = "Time";
		var yAxisLabelHeader = "Y Header";
		var circleRadius = 4;
		var circleColor = 'blue';

		var squareColor = 'green';

		var data;

		var chartWidth;
		var chartHeight;

		// Width and height of data

		var dataWidth = width - 100;
		var dataHeight = height + 10;

		//Timer setup
		var tick = 0;
		jsonData1 = []
		jsonData2 = []
		// var timer = d3.timer(timerCallback);

		//Enables Symbols to be used
		var symbol = d3.symbol();


		init();

		var timer = d3.timer(timerCallback);

/* 		var timer = d3.timer(function(duration) {
            console.log(duration);
			if (duration > 50) timer.stop();
			}, 100); */
			// If data <= duration
				//Then plot the points



		// transition();
		// setInterval(transition, 10000);

		function init() {

			chartWidth = width - margin.left - margin.right;
			chartHeight = height - margin.top - margin.bottom;

			// load data from json
			d3.json("./data/stream_1.json",  function(error, stream1) {
				if (error) {
					return console.warn(error);
				} else {
					data1 = stream1;
					console.log("JSON loaded");
					//initializeChart();
					//createAxes();
					drawDots();

				}
			});

					// you could load more data here using d3.json() again...

			d3.json("./data/stream_2.json", function(error, stream2) {
				if (error) {
					return console.warn(error);
				} else {
					data2 = stream2;
					console.log("JSON loaded");
					initializeChart();
					createAxes();

					drawSquares();
// Scale Axis in x, with a transition
					updateAxes();



				}
			});

		}//end init

		function initializeChart() {
			chart = d3.select("#chartDiv").append("svg")
				.attr("width", width)
				.attr("height", height);

			chart.plotArea = chart.append("g")
				.attr("transform", "translate(" + dataMargin.left + "," + margin.top + ")");
		}

		function createAxes() {

			// x axis
			chart.xScale = d3.scaleLinear()
				.domain([dataXRange.min, dataXRange.max])
				.range([0, chartWidth]);

			chart.xAxis = d3.axisBottom()
				.tickSizeOuter(0)
				.scale(chart.xScale);

			chart.xAxisContainer = chart.append("g")
				.attr("class", "xaxiscon")
				.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
				.call(chart.xAxis);

			// x axis header label
			chart.append("text")
				.attr("class", "x axis scatter-xaxis")
				.style("font-size", "12px")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
				.text(xAxisLabelHeader);

			// y axis labels
			chart.yScale = d3.scaleLinear()
				.domain([dataYRange.min, dataYRange.max])
				.range([chartHeight, 0]);

			chart.yAxis = d3.axisLeft()
				.scale(chart.yScale);

			chart.yAxisContainer = chart.append("g")
				.attr("class", "y axis scatter-yaxis")
				.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
				.call(chart.yAxis);

			// y axis header label
			chart.append('text')
				.style("font-size", "12px")
				.attr("class", "heatmap-yaxis")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
				.text(yAxisLabelHeader);
		}

		function drawDots() {
			// do something with the data here!
			//Timer
			// var timer = d3.timer(function(duration) {
			// 	console.log(duration);
			// 	if (duration > 3000) timer.stop();
			// 	}, 100);

			// While timer is running
				//If d.xVal <= timer
				//Plot the circles

			// plot dots
			var dots = chart.plotArea.selectAll(".blue.dot")
			//  .filter(function(time) { return d.xVal < time})  //Plot x with time
				.data(jsonData1, function (d, i) {return d.id })
				.enter().append("circle")
					//Change color to Blue
					.style('fill', 'blue')
					.attr("class", "blue dot")
					.attr("cx", function(d) {return chart.xScale(d.xVal) + transition_plot; })
					.attr("cy", function(d) { return chart.yScale(d.yVal); })
					.attr("r", circleRadius)
					.on("mouseover", function(d) {d3.select(this).style("fill", "red");
					  })
					.on("mouseout", function(d) {
						d3.select(this).style("fill", circleColor);
					  })
					.on("click", function(d) {
						var x0 = d.xVal;
						d3.selectAll(".green.dot").filter(function(d) { return d.xVal == x0 })
						.style("fill", "yellow");
					})


					//If d.xval < (dataXRange.min+transition_dist)
								//Then exit
					//else transition

					.transition().duration(transition_time_shape).ease(ease_transition)
					.attr("cx", function(d, i) {return chart.xScale(d.xVal-transition_dist); })
					.remove();


					//On Click turn other shape with same x value to yellow
								//Pseudocode:
							  //1. on click
							  //2. If xVal of other class == xVal of this class
							  //3. Set style to yellow

		}



		function drawSquares() {
			// do something with the data here!

			// plot dots
			var dots = chart.plotArea.selectAll(".green.dot")
			.data(jsonData2)
			.enter().append("rect")
				//Change color to Green
				.style('fill', 'green')
				.attr("class", "green dot")
				.attr("x", function(d) { return chart.xScale(d.xVal) + transition_plot; })
				.attr("y", function(d) { return chart.yScale(d.yVal); })
				.attr("width", 2)
				.attr("height", 2)
				.on("mouseover", function(d) {
					d3.select(this).style("fill", "red");
				  })
				.on("mouseout", function(d) {
					d3.select(this).style("fill", squareColor);
				  })

					//On Click turn other shape with same x value to yellow
								//Pseudocode:
							  //1. on click
							  //2. If xVal of other class == xVal of this class
							  //3. Set style to yellow

				.on("click", function(d) {
					var x1 = d.xVal;
					d3.selectAll(".blue.dot").filter(function(d) { return d.xVal == x1 })
					.style("fill", "yellow");
				})
        //
				.transition().duration(transition_time_shape).ease(ease_transition)
				.attr("x", function(d, i) {return chart.xScale(d.xVal-transition_dist); })
				.remove();

				;
		}

		// function transition() {
		// 	chart.xAxisContainer.transition().duration(8500).tween("axis", function(d, i) {
		// 	  var i = d3.interpolate(dataXRange.min, dataXRange.max);
		// 	  return function(t) {
		// 		chart.xScale.domain(i(t));
		// 		chart.xAxisContainer.call(xAxis);
		// 	  }
		// 	});
		//   }


  		function updateAxes() {
			// Transition the x axis from 40 to 400
			  chart.xScale.domain([dataXRange.min+transition_dist2, dataXRange.max+transition_dist2 ])
				chart.select(".xaxiscon")
									.transition().duration(transition_time).ease(ease_transition)
									.call(chart.xAxis)

				chart.select("g")
					.transition().duration(transition_time).ease(ease_transition)
					.attr("transform", "translate(" + dataMargin.left + "," + margin.top + ")");


			// chart.xScale = d3.scaleLinear()
			// 	.domain([dataXRange.min, 400])
			// 	.range([0, chartWidth]);
      //
			// chart.xAxis = d3.axisBottom()
			// 	.tickSizeOuter(0)
			// 	.scale(chart.xScale);

			// svg.select(".chart")
			// 	.transition()
			// 		.call(chart.xAxis);
		}

		function timerCallback(elapsed) {
			if (elapsed > duration) {
				tick = tick + 1;
				//transition_dist = transition_dist + 1;
				dataMargin.left = dataMargin.left + 3;
				transition_plot = transition_plot + 4;
			  transition_dist2 = transition_dist2 + 1;
				transition_time_shape = transition_time_shape + 370

		//	if (tick <= 10){

			var newThing1 = data1[tick];
			var newThing2 = data2[tick];

			jsonData1.push(newThing1);
			jsonData2.push(newThing2);
		//	}

       if (tick > 10) {
 				jsonData1.shift();
				jsonData2.shift();
      //
			// newThing1 = data1[10];
			// newThing2 = data2[10];
      //
			// jsonData1.push(newThing1);
			// jsonData2.push(newThing2);
      //
			 }

    	console.log(jsonData1)


			drawDots();
			drawSquares();
			updateAxes();

			timer.restart(timerCallback);
			}

		}


//////////// Bonus Functions


//On button click pause or play the data
function pauseData(){
			if (pause_flag == 0){

				console.log("Paused");
				d3.selectAll(".green.dot").transition();
				d3.selectAll(".blue.dot").transition();			
				d3.selectAll("g").transition();
				d3.selectAll(".xaxiscon").transition();
				duration = 90000000;
				pause_flag = 1;
			}

			else if (pause_flag == 1){
				console.log("State set to Play");	
				duration = 1000;
				d3.selectAll(".green.dot").transition()
					.remove();
				d3.selectAll(".blue.dot").transition()
					.remove();			
				pause_flag = 0;
			}

		}	

	//Reset the chart to elapsed time = 0
	function resetData(){
		d3.select("#chartDiv").selectAll("svg").remove();
		dataMargin.left = 105;
		tick = 0;
		jsonData1 = [];
		jsonData2 = [];
		transition_time = 10000;
		transition_time_shape = transition_time;
		transition_dist = 5;
		transition_dist2 = transition_dist;
		transition_plot = 20;
		init();
		duration = 1000;
		}

	//end of file
