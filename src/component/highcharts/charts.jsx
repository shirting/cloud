import React, {useEffect, useState,Component} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import axios from "axios";
import {render} from "react-dom";

class MyStockChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            options: {
                title: {
                    text: 'chart'
                },
                series: [{
                    data: [1, 2, 3]
                }]
            }
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            language: props.language
        },()=>{
            // this.getData();
        })
    }

    getData = () => {
        axios(axios.defaults.baseURL + this.state.language + "&sort=stars"
        ).then((res) => {
            console.log(this.state.language, res)
            this.setState({
                options: {
                    title: {
                        text: this.state.language+'chart'
                    },
                    series: [{
                        data: [4,5,6]
                    }]
                }
            })
        })
    }


    render() {
        return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                />
        )
    }
}
export default MyStockChart