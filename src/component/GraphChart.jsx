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
        var option= {
            title: {
                text: null
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
                    tooltip:{
                        formatter: function (params, ticket, callback) {
                            var value="用户名："+params.data.name+"  关注数："+params.data.symbolSize
                            return value
                        }
                    }
                }
            ]
        };
        chart.setOption(option)
    }

    componentDidMount() {
        var chartDom = document.getElementById("GraphChart");
        var myChart = echarts.init(chartDom, "chalk");
        //新建一个空数据的chart
        var option = {
            title: {
                text: null
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
                }
            ]
        };
        myChart.setOption(option)
        myChart.on('click', function (param){
            //获取节点点击的数组序号
            console.log(param)
            if (param.dataType == 'node') {
                var url="https://github.com/" +param.name
                window.open(url)
            } else {

            }
        });
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

