import './App.css';
import 'antd/dist/antd.min.css';
import './assets/css/Layout.css'
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import axios from "axios";
import {useState} from "react";
import MainPage from "./component/mainPage";

function getItem(label, key, icon, children, theme) {
    return {
        key,
        icon,
        children,
        label,
        theme,
    };
}
function getorg(){
}
function App() {

    const [current, setCurrent] = useState('r');
    const urlParams = new URL(window.location.href);
    const pathname = urlParams.search.split("=")[1];

    return (
        <div className='mainPage'>
            <Layout className='mainPage'>
                {/*<Header className='header'>编程语言为{pathname}的项目中出现最多的关键字</Header>*/}
                <Layout className='layout'>
                    <Content className='content'>
                        <MainPage language={current}></MainPage>
                    </Content>
                </Layout>
                {/*<Footer class="footer">底部</Footer>*/}
            </Layout>
        </div>
    );
}

export default App;
