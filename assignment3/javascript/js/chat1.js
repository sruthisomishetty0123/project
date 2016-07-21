(function (){var margin = {top: 20, right: 10, bottom: 100, left: 70},
   width = 1000 - margin.left - margin.right,
   height = 600 - margin.top - margin.bottom;


 var svg=d3.select('body')
 .append('svg')
 .attr({
     "width" : width + margin.right + margin.left,
     "height" : height + margin.top + margin.bottom,

 })

 .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     //console.log("hello");

     var xScale = d3.scale.ordinal()
   .rangeRoundBands([0, width], .1 ,.1);

   var yScale = d3.scale.linear()
   .range([height, 0]);



var xAxis = d3.svg.axis()
   .scale(xScale)
   .orient("bottom");

var yAxis = d3.svg.axis()
   .scale(yScale)
   .orient("left");


d3.json("../jsonfiles/p2a.json",function(error, data) {
     if (error) console.log("error");

     data.forEach(function(d){
         d["Population (Millions) 2013"]=+d["Population (Millions) 2013"];
         d["Country Name"]=d["Country Name"];
         console.log(d["Population (Millions) 2013"]);
     });

data.sort(function(a,b){
    return b["Population (Millions) 2013"]-a["Population (Millions) 2013"];
});


xScale.domain(data.map(function(d){return d["Country Name"]}));
yScale.domain([0,d3.max(data,function(d){return d["Population (Millions) 2013"]})]);



 svg.selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
   .attr("height", 0)
   .attr("y", height)
   .transition().duration(3000)
   .delay( function(d,i) { return i * 200; })
   // attributes can be also combined under one .attr
   .attr({
     "x": function(d) { return xScale(d["Country Name"]); },
     "y": function(d) { return yScale(d["Population (Millions) 2013"]); },
     "width": xScale.rangeBand(),
     "height": function(d) { return  height - yScale(d["Population (Millions) 2013"]); }
   })
   .style("fill", function(d,i) { return 'rgb( ' + ((i * 30) + 100) + ',20,20)'});


       svg.selectAll('text')
           .data(data)
           .enter()
           .append('text')
            .text(function(d){
               return d["Population (Millions) 2013"];
           })
           .attr({
               "x": function(d){ return xScale(d["Country Name"]) +  xScale.rangeBand()/2; },
               "y": function(d){ return yScale(d["Population (Millions) 2013"])+ 12; },
               "font-family": 'sans-serif',
               "font-size": '13px',
               "font-weight": 'bold',
               "fill": '#eee',
               
               
           });


   // Draw xAxis and position the label
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
       .selectAll("text")
       .attr("dx", "-.8em")
       .attr("dy", ".25em")
       .attr("transform", "rotate(-60)" )
       .style("text-anchor", "end")
       .attr("font-size", "10px");


   // Draw yAxis and postion the label
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -height/2)
       .attr("dy", "-3em")
       .style("text-anchor", "middle")
       .text("Trillions of US Dollars ($)");

       //for heading
       svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 6))
        .attr("text-anchor", "middle")  
        .style("font-size", "25px") 
        .style("text-decoration", "underline")  
        .text("a bar chart of population by country of 2013");

});})();