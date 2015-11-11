var data = [];
var width = 900;
var height = 550;


d3.csv("df_output.csv", function(csv_data) {

  // make the data into an x y graph

  var xy_data = [{
    key: "C",
    values: []
  }, {
    key: "PF",
    values: []
  }]


  _.each(csv_data, function(d, i) {

    var values = {
      x: +d.TRB,
      y: +d.PTS,
      player: d.Player,
      size: d.sal_norm,
      sal: d["2015-16"]
    }

    if (d.Pos === "PF") {
      xy_data[1].values.push(values)
    } else {
      xy_data[0].values.push(values)
    }
  });

  nv.addGraph(function() {

    var chart = nv.models.scatterChart()
      .showDistX(true)
      .showDistY(true)
      .width(width)
      .height(height)
      .margin({
        top: 50,
        right: 50,
        bottom: 50,
        left: 100
      })
      .useVoronoi(false)
    //.interactive(false)

    chart.xAxis
      .axisLabel('Points per 36 minutes')
      .tickFormat(d3.format('.1f'));

    chart.yAxis
      .axisLabel('Total rebounds per 36 minutes')
      .tickFormat(d3.format('.1f'));

    chart.tooltipContent(function(key, x, y, point) {
      return '<h3>' + point.point.player + '</h3><p class="text-center">2015-16 Salary: <b>$' + (point.point.sal/1000000).toFixed(2) + 'mm</b></p>';
    });

    d3.select('#chart svg')
      .attr('width', width)
      .attr('height', height)
      .datum(xy_data)
      .transition().duration(500)
      .call(chart);

    return chart;


    // chart.xAxis
    //     .axisLabel('Time (ms)')
    //     .tickFormat(d3.format(',r'));

    // chart.yAxis
    //     .axisLabel('Voltage (v)')
    //     .tickFormat(d3.format('.02f'));

  });

});