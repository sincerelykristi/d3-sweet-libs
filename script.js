console.log('script loaded')
// skully x=860 y=238
// mulde
function InitChart() {

var data_wdi = [{
    "line": "mulder", "unit":1, "fun":7.4},
    {"line": "mulder", "unit":2, "fun":6.7},
    {"line": "mulder", "unit":3, "fun":5},
    {"line": "mulder", "unit":4, "fun":4.1},
    {"line": "skully", "unit":1, "fun":7.5},
    {"line": "skully", "unit":2, "fun":7.3},
    {"line": "skully", "unit":3, "fun":6},
    {"line": "skully", "unit":4, "fun":5.5}
    ];

 var wdiGroup = d3.nest()
    .key(function(d) { return d.line; })
    .entries(data_wdi);

var data_lion = [
    {"line":"mufasa", "unit":1, "fun":7.7},
    {"line":"mufasa", "unit":2, "fun":7.3},
    {"line":"mufasa", "unit":3, "fun":5.7},
    {"line":"mufasa", "unit":4, "fun":4.9},
    {"line":"scar", "unit":1, "fun":6.8},
    {"line":"scar", "unit":2, "fun":6.3},
    {"line":"scar", "unit":3, "fun":5.5},
    {"line":"scar", "unit":4, "fun":5.3}
  ];

var lionGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_lion);

var data_matt=[
    {"line":"tenDays", "unit":1, "fun":7.9},
    {"line":"tenDays", "unit":2, "fun":7.8},
    {"line":"tenDays", "unit":3, "fun":6.4},
    {"line":"tenDays", "unit":4, "fun":5.3},
    {"line":"wedPlan", "unit":1, "fun":6.9},
    {"line":"wedPlan", "unit":2, "fun":6.1},
    {"line":"wedPlan", "unit":3, "fun":4.6},
    {"line":"wedPlan", "unit":4, "fun":4.6}
  ];

var mattGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_matt);

var data_band=[
    {"line":"nsync", "unit":1, "fun":7.6},
    {"line":"nsync", "unit":2, "fun":7.6},
    {"line":"nsync", "unit":3, "fun":5.6},
    {"line":"nsync", "unit":4, "fun":4.4},
    {"line":"bsb", "unit":1, "fun":7},
    {"line":"bsb", "unit":2, "fun":5.6},
    {"line":"bsb", "unit":3, "fun":5.6},
    {"line":"bsb", "unit":4, "fun":6.8}
  ];

var bandGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_band);

var data_leo=[
    {"line":"leo", "unit":1, "fun":7.5},
    {"line":"leo", "unit":2, "fun":7.1},
    {"line":"leo",  "unit":3, "fun":5.6},
    {"line":"leo",  "unit":4, "fun":5}
];

var leoGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_leo);


//setting SVG skeleton
var sec = d3.select("#section"),
    WIDTH = 860,
    HEIGHT = 500,
    MARGINS = {
        top: 30,
        right: 50,
        bottom: 30,
        left: 20
  };

//scaling x & y axis to match Fun 1-10 scale y-axis and Units 1-4 x-axis
  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 4])

  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10])

//customizing ticks
  xAxis = d3.svg.axis()
  .scale(xScale)
  .ticks(2)
  .tickFormat(function(d){
    return d
  })
  .tickSize(4, 4)
  .ticks(3),

  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(2)
  .tickFormat(function(d){
    return d;
  })
  .tickSize(1, 2)
  .ticks(5);

//appending x and y axis
  sec.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
  sec.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

// appending text for the x-axis "WDI Unit"
  sec.append("text")
      .attr("transform", "translate(850, 465)")
      .style("text-anchor", "middle")
      .text("WDI Unit");

// appending text for the y-axis "Fun"
  sec.append("text")
      .attr("transform", "translate(50, -36)")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", "3.85em")
      .text("Fun");

// making lineGen variable (in order to call later with corresponding object)
  var lineGen = d3.svg.line()
      .x(function(d) {
          return xScale(d.unit);
      })
      .y(function(d) {
          return yScale(d.fun);
      })
      .interpolate("basis");

function updateWDI() {
  sec.selectAll('.line').remove();
    wdiGroup.forEach(function(d, i) {
    sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
           return "hsl(" + Math.random() * 360 + ",100%,50%)";
          })
          .attr('stroke-width', 2)
          .attr('id', 'line_' + d.key)
          .attr('fill', 'none')
          .attr("class", "line")
    });

  document.getElementById('wdi-legend').style.display = '';
  document.getElementById('lion-legend').style.display = 'none';
  document.getElementById('matt-legend').style.display = 'none';
  document.getElementById('boyBand-legend').style.display = 'none';
}

function updateLion() {

  sec.selectAll('.line').remove();
  sec.selectAll('.legend').remove();

  lionGroup.forEach(function(d, i) {
    sec.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d, j) {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr('stroke-width', 2)
      .attr('id', 'line_' + d.key)
      .attr('fill', 'none')
      .attr("class","line");

  });

  document.getElementById('wdi-legend').style.display = 'none';
  document.getElementById('lion-legend').style.display = '';
  document.getElementById('matt-legend').style.display = 'none';
  document.getElementById('boyBand-legend').style.display = 'none';
}

function updateMatt() {

  sec.selectAll('.line').remove();
  sec.selectAll('.legend').remove();

  mattGroup.forEach(function(d, i) {
    sec.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d, j) {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr('stroke-width', 2)
      .attr('id', 'line_' + d.key)
      .attr('fill', 'none')
      .attr("class","line");

  });

  document.getElementById('wdi-legend').style.display = 'none';
  document.getElementById('lion-legend').style.display = 'none';
  document.getElementById('matt-legend').style.display = '';
  document.getElementById('boyBand-legend').style.display = 'none';
}

function updateBand() {

  sec.selectAll('.line').remove();
  sec.selectAll('.legend').remove();

  bandGroup.forEach(function(d, i) {
    sec.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d, j) {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr('stroke-width', 2)
      .attr('id', 'line_' + d.key)
      .attr('fill', 'none')
      .attr("class","line");

  });

  document.getElementById('wdi-legend').style.display = 'none';
  document.getElementById('lion-legend').style.display = 'none';
  document.getElementById('matt-legend').style.display = 'none';
  document.getElementById('boyBand-legend').style.display = '';
}

function updateLeo() {

  sec.selectAll('.line').remove();
  sec.selectAll('.legend').remove();

  leoGroup.forEach(function(d, i) {
    sec.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d, j) {
       return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr('stroke-width', 2)
      .attr('id', 'line_' + d.key)
      .attr('fill', 'none')
      .attr("class","line");


  });

  document.getElementById('wdi-legend').style.display = 'none';
  document.getElementById('lion-legend').style.display = 'none';
  document.getElementById('matt-legend').style.display = 'none';
  document.getElementById('boyBand-legend').style.display = 'none';
}


  // adding event listeners
  var wdi = document.getElementById("wdi");
  var lion = document.getElementById("lion");
  var matt = document.getElementById("matt");
  var band = document.getElementById("band");
  var leo = document.getElementById("leo");

  wdi.addEventListener("click", updateWDI, false);
  lion.addEventListener("click", updateLion, false);
  matt.addEventListener("click", updateMatt, false);
  band.addEventListener("click", updateBand, false);
  leo.addEventListener("click", updateLeo, false);

  document.getElementById('wdi-legend').style.display = 'none';
  document.getElementById('lion-legend').style.display = 'none';
  document.getElementById('matt-legend').style.display = 'none';
  document.getElementById('boyBand-legend').style.display = 'none';

} //end of InitChart function

InitChart(); //callllll it
