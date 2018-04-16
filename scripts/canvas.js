// Select the canvas from the document.
var canvas = document.querySelector("canvas");

var width = +canvas.getAttribute('width') || 600,
    height = +canvas.getAttribute('height') || 400;
width = Math.max(width, self.innerWidth);
height = Math.max(height, self.innerHeight);

// save the legend
var legend = d3.select('#legend').html();

// Create the WebGL context, with fallback for experimental support.
var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");



// Compile the vertex shader.
var vertexShader = context.createShader(context.VERTEX_SHADER);
context.shaderSource(vertexShader, document.querySelector("#vertex-shader").textContent);
context.compileShader(vertexShader);
if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) throw new Error(context.getShaderInfoLog(vertexShader));

// Compile the fragment shader.
var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
context.shaderSource(fragmentShader, document.querySelector("#fragment-shader").textContent);
context.compileShader(fragmentShader);
if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) throw new Error(context.getShaderInfoLog(fragmentShader));

// Link and use the program.
var program = context.createProgram();
context.attachShader(program, vertexShader);
context.attachShader(program, fragmentShader);
context.linkProgram(program);
if (!context.getProgramParameter(program, context.LINK_STATUS)) throw new Error(context.getProgramInfoLog(program));
context.useProgram(program);

// Define the positions (as vec2) of the square that covers the canvas.
var positionBuffer = context.createBuffer();
context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
context.bufferData(context.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
    +1.0, -1.0,
    +1.0, +1.0,
    -1.0, +1.0
  ]), context.STATIC_DRAW);

// Bind the position buffer to the position attribute.
var positionAttribute = context.getAttribLocation(program, "a_position");
context.enableVertexAttribArray(positionAttribute);
context.vertexAttribPointer(positionAttribute, 2, context.FLOAT, false, 0, 0);

// Extract the projection parameters.
var translateUniform = context.getUniformLocation(program, "u_translate"),
    scaleUniform = context.getUniformLocation(program, "u_scale"),
    rotateUniform = context.getUniformLocation(program, "u_rotate");

// Load the reference image.
var image = new Image;
image.src = "8k_mars.jpg";
// image.src = "Mars_Viking_MDIM21_ClrMosaic_global_1024.jpg";
image.onload = readySoon;

var projection = d3.geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(0.95 * height / 2);

var path = d3.geoPath()
    .projection(projection);


var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

svg._defs = svg.append("defs");
svg._clip = svg._defs.append("path")
    .datum({
        type: "Sphere"
    })
    .attr("id", "sphere");

svg._defs.append("clipPath")
    .attr("id", "clip")
    .append("use")
    .attr("xlink:href", "#sphere");

svg._earth = svg.append('g')
    .attr("clip-path", "url(#clip)")
    .style('cursor', '-webkit-grab');

svg._polygons = svg._earth.append('g').attr('class', 'polygons');
svg._links = svg._earth.append('g').attr('class', 'links');
svg._missions = svg._earth.append('g').attr('class', 'missions');

svg._shade = svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "url(#grad1)")
    .attr('pointer-events', 'none');



// Hack to ensure correct inference of window dimensions.
function readySoon() {
    // https://raw.githubusercontent.com/rhodges/hodgimoto/master/app/layers/mars_landings.geojson
    d3.json('mars_landings.geojson', function (err, missions) {

missions.features.push({"type":"Feature","properties":{"OBJECTID":-1,"ID":-1,"NAME":"Schiaparelli","X_COORD":0.2,"Y_COORD":357.5,"FULL_NAME":"ExoMars Schiaparelli EDM lander","NSSDC_ID":"2016-017A","WEB_LINK":"https://en.wikipedia.org/wiki/Schiaparelli_EDM_lander","COUNTRY":"Europe","YEAR":2016},"geometry":{"type":"MultiPoint","coordinates":[[0.2, 357.5]]}})

        var v = svg._voronoi = d3.geoVoronoi()(missions),
            polygons = v.polygons(),
            urquhart = v.links().features.filter(function(l) {
                return l.properties.urquhart;
            });


        svg._missions = svg._missions
            .selectAll('path')
            .data(missions.features);
        var enter = svg._missions.enter().append('path');
        svg._missions = svg._missions.merge(enter);


        // Render Voronoi polygons
        // svg._polygons = svg._polygons
        //     .selectAll('path')
        //     .data(polygons.features);
        // var enter = svg._polygons.enter().append('path');
        // svg._polygons = svg._polygons.merge(enter);

        svg._links = svg._links
            .selectAll('path')
            .data(urquhart);
        var enter = svg._links.enter().append('path');
        svg._links = svg._links.merge(enter);

        setTimeout(function () {
            resize();
            ready();
        }, 10);
    });
}

// retina display
var devicePixelRatio = window.devicePixelRatio || 1;

function resize() {
    canvas.setAttribute('width', width * devicePixelRatio);
    canvas.setAttribute('height', height * devicePixelRatio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    context.uniform2f(translateUniform, width / 2 * devicePixelRatio, height / 2 * devicePixelRatio);
    context.viewport(0, 0, width * devicePixelRatio, height * devicePixelRatio);
}

function ready() {

    // Create a texture and a mipmap for accurate minification.
    var texture = context.createTexture();
    context.bindTexture(context.TEXTURE_2D, texture);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
    context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
    context.generateMipmap(context.TEXTURE_2D);

    // The current rotation
    var scale = scale0 = projection.scale(),
        rotate = [0, 0, 0];

    // Rotate and redraw!
    function redraw() {
        projection.scale(scale).rotate(rotate);
        svg._missions.attr('d', path);
        svg._polygons.attr('d', path);
        svg._links.attr('d', path);
        svg._clip.attr('d', path);
        context.uniform1f(scaleUniform, scale * devicePixelRatio);
        context.uniform3fv(rotateUniform, rotate);
        context.bindTexture(context.TEXTURE_2D, texture); // XXX Safari
        context.drawArrays(context.TRIANGLE_FAN, 0, 4);

    }

    svg
    .on('mousemove', function () {
            var p = d3.mouse(this),
                c = projection.invert(p),
                found;

            // if we're on the Earth
            if (c[0] !== 90 &&
            (found = svg._voronoi.find(c[0], c[1], 0.8 /* radian */ ))) {

                var center = d3.geoCentroid(svg._missions.data()[found.index]);

                var circle = d3.geoCircle().center(center),
                    r = d3.geoLength({
                        type: "LineString",
                        coordinates: [c, center]
                    }) * 180 / Math.PI;

                r = Math.max(1.1 * r, 5);

                svg._earth.append('path')
                    .attr('class', 'glow')
                    .transition()
                    .attrTween('d', function () {
                        return function (t) {
                            return path(circle.radius(2 + r * d3.easePolyIn(t, 4))()) || ''; // empty path when the signal comes from the hidden side of the planet
                        };
                    })
                    .remove();

                var p = svg._missions.data()[found.index].properties;
                d3.select('#legend h1').text(p.NAME);
                d3.select('#legend p').html(
                    '<a href="' + p.WEB_LINK + '">' + p.FULL_NAME + '</a>' + 
                    '<br>' +
                    p.COUNTRY + ', ' + p.YEAR + '.'
                    /* +
                                   '<br>' +
                                 p.X_COORD + "&times" + p.Y_COORD */
                );
                path.pointRadius(function (d, j) {
                    return j == found.index ? 8 : 4.5 /* 4.5 = default value */ ;
                });
                redraw();
            } else {
                d3.select('#legend').html(legend);
            }
        });


    var lambda = d3.scaleLinear()
        .domain([-width / 2, width / 2])
        .range([-180, 180]);

    var phi = d3.scaleLinear()
        .domain([0, height])
        .range([90, -90]);

    var q, r, transform, d;

    zoom = d3.zoom()
        .scaleExtent([.8, 1.5])
        .on("start", function () {
            q = rotate, d = [0, 0, 0]; // accumulate change in d
            r = d3.mouse(this);
            svg._earth.style('cursor', '-webkit-grabbing');
        })
        .on("zoom.redraw", function () {
            scale = scale0 * d3.event.transform.k;
            var p = d3.mouse(this);
            var dr = [lambda(p[0]) - lambda(r[0]), phi(p[1]) - phi(r[1])];
            r = p;

            // inverse dr[0] if the mouse is beyond one of the poles
            var a = (phi(p[1]) - rotate[1]) * Math.PI / 180,
                ca = Math.cos(a),
                sa = Math.sin(a);

            d = [d[0] + dr[0] * (ca < 0 ? -1 : 1),
                        d[1] + dr[1], d[2] + dr[0] * -sa];

            rotate = [q[0] + d[0], q[1] + d[1], q[2] + 0 * d[2]];

            redraw();
        })
        .on('end', function() {
            svg._earth.style('cursor', '-webkit-grab');
        });

    d3.select("svg")
        .call(zoom);

    redraw();

    var elapsed = null;

    function animate(t) {
        elapsed = t;
        //d3.select("canvas").transition().call(zoom.transform, d3.zoomIdentity);
        requestAnimationFrame(animate);
    }
    //animate();

}

// A polyfill for requestAnimationFrame.
if (!self.requestAnimationFrame) requestAnimationFrame =
    self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.msRequestAnimationFrame || self.oRequestAnimationFrame || function (f) {
        setTimeout(f, 17);
    };