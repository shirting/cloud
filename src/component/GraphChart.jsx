//词云STT
import React, {useEffect, useState,Component} from 'react'
import {render} from "react-dom";
import * as echarts from 'echarts'
import "../assets/css/DynamicSortChart.css"
let chart=null
class GraphChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            links:props.links,
            chart:null,
            option:null
        }
    }

    componentWillReceiveProps(props) {
        // console.log("componentWillReceiveProps")
        var option= {
            title: {
                text: '用户关系图'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    label: {
                        show: true
                    },
                    // edgeSymbol: ['circle'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 5
                    },
                    data:props.data,
                    links:props.links,
                    emphasis: {
                        focus: 'adjacency',
                        label: {
                            position: 'right',
                            show: true
                        }
                    },
                    roam: true,
                    lineStyle: {
                        width: 0.5,
                        curveness: 0.3,
                        opacity: 0.7
                    }
                }
            ]
        };
        console.log(option)
        chart.setOption(option)
    }

    componentDidMount() {
        var chartDom = document.getElementById("GraphChart");
        var myChart = echarts.init(chartDom, "chalk");
        //新建一个空数据的chart
        var option = {
            title: {
                text: '用户关系图'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    lineStyle: {
                        width: 0.5,
                        curveness: 0.3,
                        opacity: 0.7
                    }
                }
            ]
        };
        myChart.setOption(option)
        this.setState({
            chart:myChart,
            option:option
        })
        chart=myChart
    }

    render() {
        return (
            <div className="Chart">
                <div className="Chart" id="GraphChart"></div>
            </div>
        );
    }
}

export default GraphChart

