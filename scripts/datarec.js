
  //Edited by Neil McHenry, March 28, 2018
  //Originally created by: http://jsbin.com/gejuz/1/edit?html,output

  //Define Global Variables

  var dot, eventDoc, doc, body, pageX, pageY, index, mouseData, elapsedTime;

  //Initialize variables
    index = 0;
    mouseData = [["htmlName", "TimeInMs", "xVal", "yVal"]];


    //Time setup
    var timer = d3.timer(timerCallback);
    var tick = 0;
    var duration = 16;
    var event = event || window.event; // IE-ism

    //Get HTML name from file
                //Figure out how to read html file name using javascript
    var htmlname = window.location.pathname;
    var page = htmlname.split("/").pop();
    console.log( page );

    
    

    var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    
  var cars = [
      ["Saab", "BMW"],
      ["Mercedes", "Chevrolet"]
  ];
  

//   function drawMouseDots() {
//     "use strict";

//Add code to record code every 90s instead of only on mouse movement

    document.onmousemove = handleMouseMove;
               console.log('document_start')

    function handleMouseMove(event) {
            //    console.log('HandleMouseStart')

      event = event || window.event; // IE-ism

      //Increment the index
      index++;
      // If pageX/Y aren't available and clientX/Y
      // are, calculate pageX/Y - logic taken from jQuery
			// Calculate pageX/Y if missing and clientX/Y available
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Add a dot to follow the cursor
      dot = document.createElement('div');
      dot.className = "dot";
      dot.style.left = event.pageX + "px";
      dot.style.top = event.pageY + "px";
      document.body.appendChild(dot);

      //Calculate and output elapsed time
      elapsedTime = Date.now()-timeStampInMs;
    //   console.log(elapsedTime);

      //Save x and y mouse location to an array at a certain index count
      mouseData[index] = [String(htmlname), String(elapsedTime), String(event.pageX), String(event.pageY)];
        console.log(mouseData[index]);
        //Output current time and date
        //    console.log(timeStampInMs, Date.now());


      

    };
//   };


  function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

// After 10 seconds, export the mouse data to a csv file using exportToCsv
setTimeout(function() {
    console.log(mouseData);

    exportToCsv('export.csv', mouseData);
}, 10000);

// setInterval(drawMouseDots(), 1000);

// // After 1 second, export the data to a csv file using exportToCsv
// setTimeout(function() {
//     exportToCsv('export.csv', [
//     ['name','description'],	
//     ['david','123'],
//     ['jona','""'],
//     ['a','b'],
//     ['neil', 'mchenry'],
//     [String(pageX), String(pageY)],
//     cars[0],
//     cars[1]

//     ]);
// }, 1000);

// //// Read DIV Name and svg name /////
// d3.selectAll("div")
// .on("mouseover", function(){
//     d3.select(this)
//     //   .style("background-color", "lightskyblue");
//     console.log('mouseover div');

//     // Get current event info
//     console.log(d3.event);

    
//     // Get x & y co-ordinates
//     console.log(d3.mouse(this));
// })
// .on("mouseout", function(){
//     d3.select(this)
//     //   .style("background-color", "cornsilk")
//     console.log('mouseout div');

// });


function timerCallback(elapsed) {
    if (elapsed > duration) {
        tick = tick + 1;
        
        if (tick > 10) {

        }


        // console.log(clientX)
        // console.log(tick)

         timer.restart(timerCallback);
    }
     
}