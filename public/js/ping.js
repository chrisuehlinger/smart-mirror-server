

if (!localStorage.getItem('pingData')) {
    localStorage.setItem('pingData', '[]');
}

function pingTest() {
    var startTime = Date.now();
    $.ajax('http://google-public-dns-a.google.com')
        .then(function success( data, textStatus, jqXHR ) {
            var pingLength = Date.now() - startTime;
            storeData(startTime, true, pingLength);

        }, function error( jqXHR, textStatus, errorThrown ) {
            var pingLength = Date.now() - startTime;
            storeData(startTime, false, pingLength);

        });;
}

function storeData(time, successful, pingLength) {
    try {
        var data = JSON.parse(localStorage.getItem('pingData'));

        data.push({
            time: time,
            successful: successful,
            pingLength: pingLength / 1000
        });

        data = data.slice(-100);

        localStorage.setItem('pingData', JSON.stringify(data));
    } catch(e){
        console.error('Problem recording ping time: ', e);
    }

    setTimeout(pingTest, Math.max(0, 1000-pingLength));
}

pingTest();

window.displayPingChart = _.debounce(_displayPingChart, 5000, {leading: true, trailing: false});

var updatePingChart;
function _displayPingChart() {
    var data = JSON.parse(localStorage.getItem('pingData'));

    console.log('Ping Data!');
    console.log(data);

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format('%_I:%M %p'));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function(d){ return Math.floor(d*10)/10;});

    var line = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.precipProbability); })
        .interpolate("basis");

    $('.display-area').fadeOut(500,function(){
        $('.display-area').html('').show();

        var svg = d3.select(".display-area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append('path');

        updatePingChart = function(data) {

            x.domain(d3.extent(data, function(d) { return d.time; }));
            y.domain([0,d3.max(data.filter(function(d){ return d.successful; }).map(function(d){ return d.pingLength; }))])

            svg.selectAll('g').remove();

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

            var circle = svg.selectAll('circle').data(data);

            circle.enter()
                .append('circle')
                    .attr('r', 0)
                    .transition()
                    .delay(500)
                    .duration(1000)
                    .attr('r', 1);

            circle
                .attr('cx', function(d) { return x(d.time); })
                .attr('cy', function(d) { return y(d.pingLength); })
                .attr('fill', function(d) { return d.successful ? 'green' : 'red' })

            

                
            // svg.selectAll('path')
            //     .datum(data.filter(function(d){ return d.successful; }))
            //     .attr("class", "line")
            //     .attr("d", line)
            //     .each(function(d) { d.totalLength = this.getTotalLength(); })
            //     .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength; })
            //     .attr("stroke-dashoffset", function(d) { return d.totalLength; })
            //     .transition()
            //     .delay(500)
            //     .duration(1000)
            //     .attr("stroke-dashoffset", 0);
        };
        updatePingChart(data);
    });
}

setInterval(function(){
    if(window.currentMode === 'PING' && typeof updatePingChart === 'function') {
        var data = JSON.parse(localStorage.getItem('pingData'));
        updatePingChart(data)
    }
}, 60*1000);