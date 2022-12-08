import React, {Component} from 'react'
import axios from "axios";
import "../assets/css/MainPage.css"
import GraphChart from "./GraphChart";
import { Avatar, List } from 'antd';
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Button, InputNumber } from 'antd';
import Sider from "antd/es/layout/Sider";
import { SearchOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const { Search } = Input;
class MainPage extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            listData: [],
            GraphChartData: [],
            GraphChartLinks:[],
            itemList:[{}],
            curItem:null,
            totalNum:20,
            tmpNum:20,
            loading:false
        }
    }
    getItem(label, key, icon, children, theme) {
        return {
            key,
            icon,
            children,
            label,
            theme,
        };
    }
    componentDidMount() {
        //获取查询图计算支持的社区
        this.getorg();
    }
    componentWillReceiveProps(newProps) {
        // // 排行榜前十
        // this.getListData()
        // //用户关系图
        // this.getGraphChartData()
    }
    getorg = () => {
        var that=this;
        axios.get(axios.defaults.baseURL+"/graphx/org"
        ).then((res) => {
            var data=res.data;
            var items = []
            data.forEach(i=>{
                items.push(that.getItem(i, i),)
            })
            that.setState({
                itemList:items,
                curItem:data[0],
                loading:true
            },()=>{
                // 排行榜前十
                that.getListData()
                //用户关系图
                that.getGraphChartData()
            })
        })
    }
    getListData = () => {
        axios.post(axios.defaults.baseURL+"/graphx/rank", {
                "orgName": this.state.curItem,
                "total": 10
            }
        ).then((res) => {
            this.setState({
                listData:res.data
            })
        })
    }
    getGraphChartData = () => {
        var that=this;
        axios.post(axios.defaults.baseURL+"/graphx/relation", {
                "orgName": this.state.curItem,
                "total": this.state.totalNum
            }
        ).then((res) => {
            var data={"node":[],"edge":[]}
            data.node=res.data.node
            data.edge=res.data.edge
            var node=[],links=[],piclist=[];
            var color=["#4992ff","#7cffb2","#fddd60","#ff6e76","#58d9f9", "#05c091", "#ff8a45", "#8d48e3","#dd79ff"]
            for(var i=0;i<data.node.length;i++){
                var obj={};
                obj.name=data.node[i].username;
                obj.symbolSize=data.node[i].inDegree>30?data.node[i].inDegree:30;
                var random2=parseInt(Math.random()*9);
                obj.itemStyle={
                    color:color[random2]
                }
                const canvas = document.createElement('canvas');
                const contex = canvas.getContext('2d');
                let p = that.getImgData("http://172.29.7.160:8080/images/"+data.node[i].username+".jpg"+'?r=' + Math.floor(Math.random()*100000));
                piclist.push(p);
                // obj.symbol=(data.node[i].inDegree>30)?("image://"+p):"none";
                var x=(Math.random()*7.5)*600
                var y=(Math.random()*4.8)*500
                obj.x=x
                obj.y=y
                obj.label = {
                    show:false
                    // show: data.node[i].inDegree>30?false:true
                };
                node.push(obj)
            }
            var tmpname=data.edge[0][0];
            var random=parseInt(Math.random()*9);
            for(var i=0;i<data.edge.length;i++){
                if(tmpname!=data.edge[i][0]){
                    tmpname=data.edge[i][0]
                    random=parseInt(Math.random()*9);
                }
                var obj={};
                obj.source=data.edge[i][0]
                obj.target=data.edge[i][1]
                obj.lineStyle= {
                    width: random/9*4,
                    curveness: 0.3,
                    opacity: 0.7,
                    color:color[random]
                    // color:"white"
                }
                links.push(obj)
            }
            if(piclist.length>0){
                Promise.all(piclist).then(images => {
                    for (let i = 0, len = node.length; i < len; i++) {
                        node[i].symbol = 'image://' + images[i];
                    }
                    that.setState({
                        GraphChartData:node,
                        GraphChartLinks:links,
                        loading:false
                    })
                });
            }
        })

    }
    getImgData (imgSrc) {
        var fun = function (resolve) {
            const canvas = document.createElement('canvas');
            const contex = canvas.getContext('2d');
            const img = new Image();
            img.src = imgSrc;
            img.crossOrigin = 'true';
            img.onload = function () {
                // 设置图形宽高比例
                let center = {
                    x: img.width / 2,
                    y: img.height / 2
                };
                let diameter = img.width;
                let radius = diameter / 2; // 半径

                canvas.width = diameter;
                canvas.height = diameter;
                contex.clearRect(0, 0, diameter, diameter);
                contex.save();

                contex.beginPath();
                contex.arc(radius, radius, radius, 0, 2 * Math.PI); // 画出圆
                contex.clip();

                contex.drawImage(
                    img,
                    center.x - radius,
                    center.y - radius,
                    diameter,
                    diameter,
                    0,
                    0,
                    diameter,
                    diameter
                ); // 在刚刚裁剪的园上画图
                contex.restore(); // 还原状态
                resolve(canvas.toDataURL('image/png', 1));
            };
        };
        var promise = new Promise(fun);
        return promise;
    }
    onClick = (e) => {
        this.setState({
            curItem:e.key,
            loading:true
        },()=>{
            // 排行榜前十
            this.getListData()
            //用户关系图
            this.getGraphChartData()
        })
    };
    onSearch = () => {
        var value=this.state.tmpNum
        this.setState({
            totalNum:value,
            loading:true
        },()=>{
            // 排行榜前十
            this.getListData()
            //用户关系图
            this.getGraphChartData()
        })
    }
    changeNum=(value)=>{
        this.setState({
            tmpNum:value
        },()=>{
        })
    }
    openNewURL=(url)=>{
        console.log(url)
        window.open(url)
    }
    render() {
        return (
            <div className="baseStyle">
                <div className='header'>
                    <Sider className='left-slider' >
                        <Menu
                            onClick={this.onClick}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={this.state.curItem}
                            mode="horizontal"
                            theme="dark"
                            items={this.state.itemList}
                        />
                    </Sider>
                </div>
                <div className="mainStyle">
                    {/*前十用户排行榜*/}
                    <div className="list">
                        <div className="title" >用户排行榜</div>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.listData}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => {
                                        this.openNewURL("https://github.com/" +item.username)
                                    }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatarUrl}/>}
                                        title={<a>{item.username}</a>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    {/*关系图*/}
                    <div className="dynamic-sort-chart">
                        <div className="title1" >用户关系图</div>
                        <div className="searchText">
                            <InputNumber
                                min={1}
                                max={1000}
                                value={this.state.tmpNum}
                                size={"small"}
                                controls={false}
                                onChange={this.changeNum}/>
                            <Button
                                shape="circle"
                                icon={<SearchOutlined/>}
                                onClick={() => {
                                    this.onSearch();
                                }}
                            >
                                搜索
                            </Button>
                        </div>
                        <Spin style={{display:this.state.loading?"inline":"none"}} size={"large"} className="Spin" />
                        <div style={{display:this.state.loading?"none":"inline"}}  className="Spin" >
                            <GraphChart data={this.state.GraphChartData} links={this.state.GraphChartLinks}></GraphChart>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage