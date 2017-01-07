# D3.js and Data Visualization

##Getting Started with D3!

First, take a deep breath. D3 is easy and fun!

D3, or Data Driven Documents, is a Javascript library that allows you to dynamically create DOM elements based on data. 

You need to know and understand HTML, CSS and basic Javascript. It's also helpful to know about SVG or Scalable Vector Graphics. Which we'll talk about below.

Much like JQuery you link D3 in your the head of your index.html either by downloading and including that file in your Javascript folder and linking or by linking to the CDN for the latest release:

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
```

You can write your D3 code directly in your HTML files if you wish, just between ```<script></script>```
tags or separately in your script.js or other javascript files.  

## What is SVG?

SVG stands for Scalable Vector Graphics and although you don't have to use them in D3, it is best since your images will need to scale based on what data you are provided. SVG is a way to make images with markup code, much like drawing with code. The benefit of this is that it is a Vector image that scales smoothly without pixelating.

![Raster vs Vector](https://static1.squarespace.com/static/568f0d90841abaff89049937/t/57264b05e321405ebae4e60f/1462127435744/Raster+vs.+Vector+File+Example)

## Add your first element

Start by using D3 to create a new element. Again, you don't have to use SVG, but you should. I like to think of this SVG element similar to a div wrapper element that you use to contain a portion of your HTML. This SVG will serve as a container to hold any other D3 elements you make based on your data. The code for creating your first D3 element may look like:

```javascript
d3.select("body").append("svg").attr("width", 50).attr("height", 50);
```
What? Ok, let's break down that line of code. 

```d3``` Again, like JQuery, you need to tell Javascript you are now writing D3. With JQuery you started with a '$' to call it, and for D3 it's 'd3'.

```.select()``` Next we called the method .select() which is how you select DOM elements. In the parenthesis, pass in the element you wish to select between quotes. In this case we just select the body since we're simply looking to add this element to the body. You can use the same selectors you would in CSS, so ids and classes can be handy.

```.append()``` Then we append the element type to the body, using the .append method and passing it the type of element we wish to append in the paranthesis. Here we passed "SVG".

```.attr()``` Lastly, we added two attributes to the SVG. The .attr method needs two values: the attribute to be changed and the value you'd like to change it to. On the first .attr method we called we wanted to change the width to 50 so we passed that into the paranthesis like so: ```("width", 50)```. To do the same for height we just added another .attr method, this time passing in height and 50. 

Adding multiple methods is known as *chaining* and it can get pretty unweildy in D3 since often you use many methods at once. To clean up your code you can return to a new line for every new method. We'll demonstrate that later in longer code examples.  

## Data! Binding! Oh my!

Now lets start using Data to create elements. (for this I'm going to follow an example given in the PluralSight tutorial, if you want some further info from that tutorial, it's listed in the Recommended Resources)

Let's assume we are given an array of numbers and want to represent those numbers with rectangles that are created dynamically to be sized proptionally to each other based on their array number. In other words, you want to make a bar graph. 

Our array:
```javascript
var cookies = [5, 10, 15, 20, 25]
```
*This array is called cookies just because I like cookies. There's no y axis so we're not sure what this is in reference to but just go with it. We have groups of 5, 10, 15, 20 and 25 cookies*

First, let's start by creating our SVG container. This time, I'll make it easier to reference by setting a var for it. 

```javascript
var svg = d3.select("body")
  .append("svg")
  .attr("width", 300)
  .attr("height", 100);
```
*this code coule live all on one line but to make your code more organized, the convention is to return to a new line after each method.*

If you don't know what's happening here just jump to the above section for more detail. Basically, we are creating an SVG element in the body of our HTML document. Our SVG is 300px wide and 100px in height.

Now to work some D3 magic to create a rectangle for each element in our cookies array.

```javascript
svg.selectAll("rect")
   .data(cookies)
   .enter()
   .append("rect")
     .attr("x", function(d, i) {
        return (i * (300 / cookies.length));
     })
     .attr("y", function(d) {
        return h - (d * 4);
     })
        .attr("width", 300 / cookies.length - 2)
        .attr("height", function(d) {
            return (d*4);
        });
```





##Recommended Resources

Scott Murray's D3 tutorials
<http://alignedleft.com/tutorials/d3>

PluralSight's D3.js Data Visualization Fundamentals
<https://www.pluralsight.com/courses/d3js-data-visualization-fundamentals>
