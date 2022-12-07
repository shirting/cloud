import React, {Component} from 'react'
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import  HighchartsChartTem  from 'highcharts/themes/dark-unica'
import wordcloud from "highcharts/modules/wordcloud"
import "../assets/css/DynamicSortChart.css"
wordcloud(Highcharts);
HighchartsChartTem(Highcharts)
class StaticWordle extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            language:prop.language,
            data:[],
            options: {
                chart:{
                    backgroundColor:"rgba(36,36,37)",
                    height:560
                },
                title: {
                    text: null
                },
                series: [{
                    type:"wordcloud",
                    minFontSize: 9,//最小字体
                    data: []
                }]
            }
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        var da = [];
        for (var i = 0; i < 100; i++) {
            var tmp = {};
            tmp.name = "java-" + i+"-i";
            tmp.weight = parseInt(Math.random() * 1000);
            da.push(tmp)
        }
        this.setState({
            language: newProps.language,
            data: newProps.data
        })
        var option = {
            chart: {
                height:560,
                backgroundColor: "rgba(36,36,37)"
            },
            title: {
                text: null
            },
            series: [{
                type: "wordcloud",
                minFontSize: 9,//最小字体
                data: newProps.data,
            }]
        }
    }

    render() {
        var option = {
            chart: {
                height:560,
                backgroundColor: "rgba(36,36,37)"
            },
            title: {
                text: null
            },
            series: [{
                type: "wordcloud",
                minFontSize: 7,//最小字体
                maxFontSize: 30,//最小字体
                data: this.state.data,
            }]
        }
        return (
            <HighchartsReact
                className="Chart"
                highcharts={Highcharts}
                options={option}
            />
        )
    }
}

export default StaticWordle