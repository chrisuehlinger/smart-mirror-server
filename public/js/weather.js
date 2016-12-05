window.displayWeather = _.debounce(_displayWeather, 5000, {leading: true, trailing: false});

function _displayWeather(allData) {
    var data = allData.hourly.data.slice(0,24).map(type);

    var margin = {top: 20, right: 40, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var precipY = d3.scale.linear()
        .domain([0,1])
        .range([height, 0]);

    var tempY = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format('%_I:%M %p'));

    var precipAxis = d3.svg.axis()
        .scale(precipY)
        .orient("left")
        .tickFormat(function(d){ return Math.floor(100*d) + '%';});

    var tempAxis = d3.svg.axis()
        .scale(tempY)
        .orient("right")
        .tickFormat(function(d){ return d + '°F';});

    var precipLine = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return precipY(d.precipIntensity); })
        .interpolate("basis");

    var tempLine = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return tempY(d.temperature); })
        .interpolate("basis");

    var precipArea = d3.svg.area()
        .x(function(d) { return x(d.time); })
        .y0(height)
        .y1(function(d) { return precipY(d.precipIntensity); })
        .interpolate("basis");

    var tempArea = d3.svg.area()
        .x(function(d) { return x(d.time); })
        .y0(height)
        .y1(function(d) { return tempY(d.temperature); })
        .interpolate("basis");

    
    $('.display-area').fadeOut(500,function(){
        $('.display-area').html('').show();
        
        var $currentConditions = $('<div class="current-conditions" style="display:none"></div>');
        $currentConditions.append('<span class="temperature">' + Math.round(allData.currently.temperature) + '&#176;F</span>');
        $currentConditions.append('<canvas id="skycon" width="128" height="128"></canvas');
        $('.display-area').append($currentConditions);
        $currentConditions.fadeIn(500);

        var skycons = new Skycons({color: 'white', resizeClear:true});

        skycons.add('skycon', allData.currently.icon);
        skycons.play();


        var svg = d3.select(".display-area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d) { return d.time; }));
        var tempExtent = d3.extent(data, function(d) { return d.temperature; });
        tempY.domain([Math.floor(tempExtent[0]/10)*10, Math.ceil(tempExtent[1]/10)*10]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        svg.append("g")
            .attr("class", "y axis")
            .call(precipAxis)
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(tempAxis)
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", precipLine)
            .each(function(d) { d.totalLength = this.getTotalLength(); })
            .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength; })
            .attr("stroke-dashoffset", function(d) { return d.totalLength; })
            .transition()
            .delay(500)
            .duration(1000)
            .attr("stroke-dashoffset", 0);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", tempLine)
            .each(function(d) { d.totalLength = this.getTotalLength(); })
            .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength; })
            .attr("stroke-dashoffset", function(d) { return -d.totalLength; })
            .transition()
            .delay(500)
            .duration(1000)
            .attr("stroke-dashoffset", 0);

        svg.append("path")
            .datum(data)
            .attr("class", "area-under-line")
            .attr("d", precipArea)
            .attr("fill", "rgba(0,0,255,0.5)")
            .style("opacity", 0)
            .transition()
            .delay(1500)
            .duration(500)
            .style("opacity", 1);

        svg.append("path")
            .datum(data)
            .attr("class", "area-under-line")
            .attr("d", tempArea)
            .attr("fill", "rgba(255,0,0,0.5)")
            .style("opacity", 0)
            .transition()
            .delay(1500)
            .duration(500)
            .style("opacity", 1);
    });

    function type(d) {
        d.time = 1000*d.time;
        d.precipIntensity = +d.precipIntensity;
        return d;
    }
};