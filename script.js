$(document).ready(function(){
  console.log('JavaScript loaded.')

  var Mulder=[{unit:1, fun:7.4}, {unit:2, fun:6.7}, {unit:3, fun:5}, {unit:4, fun:4.1}]
  var Skully=[{unit:1, fun:7.5}, {unit:2, fun:7.3}, {unit:3, fun:6}, {unit:4, fun:5.5}]
  var Mufasa=[{unit:1, fun:7.7}, {unit:2, fun:7.3}, {unit:3, fun:5.7}, {unit:4, fun:4.9}]
  var Scar=[{unit:1, fun:6.8}, {unit:2, fun:6.3}, {unit:3, fun:5.5}, {unit:4, fun:5.3}]
  var TenDays=[{unit:1, fun:7.9}, {unit:2, fun:7.8}, {unit:3, fun:6.4}, {unit:4, fun:5.3}]
  var WedPlan=[{unit:1, fun:6.9}, {unit:2, fun:6.1}, {unit:3, fun:4.6}, {unit:4, fun:4.6}]
  var nsync=[{unit:1, fun:7.6}, {unit:2, fun:7.6}, {unit:3, fun:5.6}, {unit:4, fun:4.4}]
  var bsb=[{unit:1, fun:7}, {unit:2, fun:5.6}, {unit:3, fun:5.6}, {unit:4, fun:6.8}]
  var leo=[{unit:1, fun:7.5}, {unit:2, fun:7.1}, {unit:3, fun:5.6}, {unit:4, fun:5}]

  $('button').on('click', function() {
    $('button').removeClass('highlight')
    $(this).toggleClass('highlight');

    // D3 click chart action goes here

  });
})
