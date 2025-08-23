import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5xy from '@amcharts/amcharts5/xy'
import { useLayoutEffect } from 'react'

interface Props {
	data: {
		category: string
		value: number
	}[]
	month: string
}

const BarChart = ({ data, month }: Props) => {
	useLayoutEffect(() => {
		const root = am5.Root.new('chartdiv')

		root.setThemes([am5themes_Animated.new(root)])

		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: false,
				wheelX: 'panX',
				wheelY: 'zoomX',
				pinchZoomX: true,
				paddingLeft: 0,
				paddingRight: 1,
			}),
		)

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
		cursor.lineY.set('visible', false)

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		const xRenderer = am5xy.AxisRendererX.new(root, {
			minGridDistance: 30,
			minorGridEnabled: true,
		})

		xRenderer.labels.template.setAll({
			rotation: 0,
			centerY: am5.p50,
			centerX: am5.p100,
			paddingRight: 0,
		})

		xRenderer.grid.template.setAll({
			location: 1,
		})

		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				maxDeviation: 0.3,
				categoryField: 'category',
				renderer: xRenderer,
				tooltip: am5.Tooltip.new(root, {
					labelText: `${month.substring(0, 3)} {category}`,
				}),
			}),
		)

		const yRenderer = am5xy.AxisRendererY.new(root, {
			strokeOpacity: 0.1,
		})

		const yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				maxDeviation: 0.3,
				renderer: yRenderer,
			}),
		)

		// Create series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		const series = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: 'Series 1',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				sequencedInterpolation: true,
				categoryXField: 'category',
				tooltip: am5.Tooltip.new(root, {
					labelText: '₹ {valueY}',
				}),
			}),
		)

		series.columns.template.setAll({
			cornerRadiusTL: 2,
			cornerRadiusTR: 2,
			strokeOpacity: 0,
		})
		series.columns.template.adapters.add('fill', function (_, target) {
			return chart.get('colors')?.getIndex(series.columns.indexOf(target))
		})

		series.columns.template.adapters.add('stroke', function (_, target) {
			return chart.get('colors')?.getIndex(series.columns.indexOf(target))
		})

		xAxis.data.setAll(data)
		series.data.setAll(data)

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		series.appear(1000)
		chart.appear(1000, 100)
		return () => root.dispose()
	}, [data, month])

	return <div id="chartdiv" style={{ height: '100%', width: '100%' }}></div>
}

export default BarChart
