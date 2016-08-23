window.displayWeather = _.debounce(_displayWeather, 5000, {leading: true, trailing: false});

function _displayWeather(allData) {
    var data = allData.hourly.data.slice(0,24).map(type);

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0,1])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format('%_I:%M %p'));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function(d){ return Math.floor(100*d) + '%';});

    var line = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.precipProbability); })
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
            .call(yAxis)
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .each(function(d) { d.totalLength = this.getTotalLength(); })
            .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength; })
            .attr("stroke-dashoffset", function(d) { return d.totalLength; })
            .transition()
            .delay(500)
            .duration(1000)
            .attr("stroke-dashoffset", 0);
    });

    function type(d) {
        d.time = 1000*d.time;
        d.precipProbability = +d.precipProbability;
        return d;
    }
};