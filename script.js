
console.log('script loaded')

function InitChart() {

var data_section = [{
 "line": "mulder", unit:1, fun:7.4}, {"line": "mulder", unit:2, fun:6.7}, {"line": "mulder", unit:3, fun:5}, {"line": "mulder", unit:4, fun:4.1}, {"line": "skully", unit:1, fun:7.5}, {"line": "skully", unit:2, fun:7.3}, {"line": "skully", unit:3, fun:6}, {"line": "skully", unit:4, fun:5.5}, {"line":"mufasa", unit:1, fun:7.7}, {"line":"mufasa", unit:2, fun:7.3}, {"line":"mufasa", unit:3, fun:5.7}, {"line":"mufasa", unit:4, fun:4.9}, {"line":"scar", unit:1, fun:6.8}, {"line":"scar", unit:2, fun:6.3}, {"line":"scar", unit:3, fun:5.5}, {"line":"scar", unit:4, fun:5.3}, {"line":"tenDays", unit:1, fun:7.9}, {"line":"tenDays", unit:2, fun:7.8}, {"line":"tenDays", unit:3, fun:6.4}, {"line":"tenDays", unit:4, fun:5.3}, {"line":"wedPlan", unit:1, fun:6.9}, {"line":"wedPlan", unit:2, fun:6.1}, {"line":"wedPlan", unit:3, fun:4.6}, {"line":"wedPlan", unit:4, fun:4.6}, {"line":"nsync", unit:1, fun:7.6}, {"line":"nsync", unit:2, fun:7.6}, {"line":"nsync", unit:3, fun:5.6}, {"line":"nsync", unit:4, fun:4.4}, {"line":"bsb", unit:1, fun:7}, {"line":"bsb", unit:2, fun:5.6}, {"line":"bsb", unit:3, fun:5.6}, {"line":"bsb", unit:4, fun:6.8}, {"line":"leo", unit:1, fun:7.5}, {"line":"leo", unit:2, fun:7.1}, {"line":"leo",  unit:3, fun:5.6}, {"line":"leo",  unit:4, fun:5}];

var sectionGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_section);

    // console.log(JSON.stringify(sectionGroup[0]));
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}
console.log(getValues(data_section,'line'));

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
//trying to plot line label to corresponding line next to u:4 fun value on y-axis. capturing u:4 fun:val for each line and setting to variable
// console.log(getObjects(data_section, '', 4));
var unitFour = getObjects(data_section, '', 4);
// console.log(unitFour);
// console.log(unitFour[1].fun) // returns all u4 fun scores
var mulder = (unitFour[0].fun) //4.1
var skully = (unitFour[1].fun) //5.5
var mufasa = (unitFour[2].fun) //4.9
var scar = (unitFour[3].fun) //5.3
var tenDays = (unitFour[4].fun) //5.3
var wedPlan = (unitFour[5].fun) //4.6
var nsync = (unitFour[6].fun) //4.4
var bsb = (unitFour[7].fun) //6.8
var leo = (unitFour[8].fun) //5

var sec = d3.select("#section"),
    WIDTH = 900,
    HEIGHT = 500,
    MARGINS = {
        top: 30,
        right: 50,
        bottom: 30,
        left: 20
  };

//defining space below x axis based on data.length in order to make legends display
lSpace = WIDTH/sectionGroup.length;

//scaling x & y axis to match Fun 1-10 scale y-axis and Units 1-4 x-axis
  xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 4])

  yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10])

//customizing ticks
  xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(2)
  .tickFormat(function(d){
    return d
  })
  .tickSize(4, 4)
  .ticks(3),

  yAxis = d3.axisLeft()
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

// making lineGen variable (in order to call later with corresponding object)
  var lineGen = d3.svg.line()
      .x(function(d) {
          return xScale(d.unit);
      })
      .y(function(d) {
          return yScale(d.fun);
      })
      .interpolate("basis");
//dynamically adding sectionGroup object (scully/ mulder linels) - I tried for the life of me to hook up the buttons and add labels to the lines but I'm out of ideas for tonight.  Now all that happens is the d.key will append to the legend. I thought it might be a good idea to have each matching data set lumped together, so the onclick function would be easier - but my mind is not working anymore!
sectionGroup.forEach(function(d, i) {
  sec.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d, j) {
         return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

// this is the fucking line i can't seem to grab the data endpoint to correctly match the line label - trying to dynamically set label to u4 fun value
        sec.append("text")
          .attr("x", (lSpace/2)+i*lSpace)
          .attr("y", HEIGHT)
          .style("fill", "black")
          .attr("class","legend")
          .attr("text-anchor", "start")
          .on('click',function(){
              var active   = d.active ? false : true;
              var opacity = active ? 0 : 1;
              d3.select("#line_" + d.key).style("opacity", opacity);

              d.active = active;
          })
          .text(d.key);
          // trying this tool tip d3 method to have key on the side
           // var tip = d3.tip()
 //          .attr("class", "tip-map")
 //          .html(function(d){
 //            var tooltip = "<div>";
 //            tooltip += "<h4>" +
 //          })
 //          .attr("class","legend")
 //          .attr("text-anchor", "start")
 //          .on('click',function(){
 //              var active   = d.active ? false : true;
 //              var opacity = active ? 0 : 1;
 //              d3.select("#line_" + d.key).style("opacity", opacity);

 //              d.active = active;
 //          })
 //          .text(d.key);
  });

//another sad attempt at adding the line labels dynamically
//   var labels = [
//   {
//     x: 0,
//     y: .17,
//     text: 'Test Label 1',
//     orient: 'right'
//   },
//   {
//     x: 0,
//     y: .24,
//     text: 'Test Label 2',
//     orient: 'right'
//   }
// ]
//   function renderLabels() {
//   sec.selectAll("text.label")
//     .sectionGroup(labels)
//     .enter()
//     .append('text')
//     .attr('x', function(d) { return x(d.x) })
//     .attr('y', function(d) { return y(d.y) })
//     .style('text-anchor', function(d) { return d.orient == 'right' ? 'start' : 'end' })
//     .text(function(d) { return d.key });
// }

// renderLabels();
// });

  sec.append("text")
      .attr("transform", "translate(850, 465)")
      .style("text-anchor", "middle")
      .text("WDI Unit");
  sec.append("text")
      .attr("transform", "translate(50, -36)")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", "3.85em")
      .text("Fun");

}
InitChart();
