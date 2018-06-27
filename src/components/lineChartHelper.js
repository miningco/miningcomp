import * as d3 from 'd3';

const timeFormatForTickDisplay = d3.timeFormat("%m-%d");
const timeFormatForTooltipDisplay = d3.timeFormat("%m-%d-%Y %H:%M:%S");
/**
 * Create line chart with given chart options and data
 *
 * @export
 * @param {*} data Array of objects for chart data
 */
export function drawChart(chartContainerElementId, data, chartHeight, chartWidth) {
	const $chartContainer = d3.select(`#${chartContainerElementId}`);
	if ($chartContainer.empty()) {
		// Chart container div not found, return
		return;
	}

	// Reset chart area by removing previous SVG
	$chartContainer.html('');
	if (chartHeight
		&& chartWidth
		&& data
		&& data.length) {

		// Sort data to make sure dates are in correct order
		// in visual
		data.sort(function (d1, d2) {
			return d3.ascending(d1.paidOn, d2.paidOn)
		});

		// Create a SVG with given dimension to hold our chart
		const $svg = $chartContainer
			.append("svg")
			.attr('width', chartWidth)
			.attr('height', chartHeight);

		// Standard margins to make some space on each sides for label etc.
		const margin = { top: 20, right: 20, bottom: 40, left: 50 };

		// Calculate resultant width and height after reducing the margins
		const width = chartWidth - margin.left - margin.right;
		const height = chartHeight - margin.top - margin.bottom;

		// Append a group element with given width and height, this group element will
		// contain all chart related elements
		const $mainChartGroup = $svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Create scale for x-axis, we will use time scale as we have dates
		// it will adjust axis ticks as applicable
		const xScale = d3.scaleTime()
			.rangeRound([0, width]);

		// Create scale for y axis, we will use a linear scale as we need to show
		// amount on y axis
		const yScale = d3.scaleLinear()
			.rangeRound([height, 0]);

		// Set domain on scales, domain is the min and max limit of
		// scale, so that scale can generate locations relative to 
		// that domain
		// In our case, we will use extent function, which simply returns
		// min and max of that data point
		xScale.domain(d3.extent(data, function (d) { return d.paidOn; }));
		yScale.domain(d3.extent(data, function (d) { return d.amount; }));

		// This is the main function which creates line between give x and y locations
		// x and y locations will be calcuated by using xScale and yScale with given
		// paidOn date and amount
		const lineGenerator = d3.line()
			.x(function (d) { return xScale(d.paidOn); })
			.y(function (d) { return yScale(d.amount); })
			.curve(d3.curveMonotoneX);

		// Create x-axis
		// x Axis generator function, this function will generate x-axis ticks
		const xAxisGenerator = d3.axisBottom(xScale)
			.tickFormat(timeFormatForTickDisplay);
		// Append  a group to contain x-axis
		const $xAxis = $mainChartGroup.append("g")
			.attr("transform", "translate(0," + height + ")")
			.attr("class", "axis axis--x");

		// Apply the generator function to our x-axis group element
		$xAxis.call(xAxisGenerator);

		// append label for x-axis
		$xAxis.append("text")
			.attr("x", width / 2)
			.attr("y", 22)
			.attr('class', 'axis-label')
			.attr("dy", "0.71em")
			.attr("text-anchor", "middle")
			.text("Payout Date");

		// Create y-axis
		// y Axis generator function, this function will generate y-axis ticks
		const yAxisGenerator = d3.axisLeft(yScale)
		// Append  a group to contain y-axis
		const $yAxis = $mainChartGroup.append("g")
			.attr("class", "axis axis--y");

		// Apply the generator function to our y-axis group element
		$yAxis.call(yAxisGenerator);

		// Append y-axis label
		$yAxis.append("text")
			.attr('class', 'axis-label')
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Amount");

		// Generate path for given data by using our line generator function
		$mainChartGroup.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1.5)
			.attr("d", lineGenerator);

		// Generate dots for as per time scale to show circles for given

		// date/amount value
		const $dataPoint = $mainChartGroup.selectAll(".dot")
			.data(data)
			.enter()
			.append('g')
			.attr('transform', function (d) {
				return `translate(${xScale(d.paidOn)},${yScale(d.amount)})`;
			});

		$dataPoint.append("circle")
			.attr("class", "dot")
			// .attr("cx", function (d) { return xScale(d.paidOn) })
			// .attr("cy", function (d) { return yScale(d.amount) })
			.attr("r", 3);

		// Draw tooltip to show relevant data
		const $tooltip = $chartContainer
			.append('div')
			.attr('id', `__tooltip__${chartContainerElementId}`)
			.attr('class', 'chartTooltip');

		$dataPoint.on('mouseenter', drawTooltip);
		$dataPoint.on('mouseleave', removeTooltip);

		function removeTooltip() {
			if ($tooltip) {
				$tooltip
					.transition()
					.duration(200)
					.style("opacity", 0);;
			}
		}

		function drawTooltip(d) {
			const tooltipItems = [];
			tooltipItems.push(`<h5>Paid On : ${timeFormatForTooltipDisplay(d.paidOn)}</h5>`);
			tooltipItems.push(`<h5>Amount : ${d.amount}</h5>`);
			$tooltip.html(tooltipItems.join(''))
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 20) + 'px')

			$tooltip.transition()
				.duration(200)
				.style("opacity", 1);
		}

		//***********************************

	}

}