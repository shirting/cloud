//定义全局方法
//https://api.github.com/search/repositories?q=language:java&sort=stars 数据已经有了
let baseUrl="https://api.github.com/search/repositories?q=language:";
var url=baseUrl+"java&sort=stars"
function getRequest(language,sort, onSuccess, onError) {
    this.url=baseUrl+language+"&sort="+sort;
    this.$axios.get(url).then(res =>{
        console.log(res,'后端返回数据')
    })
}

function postRequest(language,sort, data, onSuccess, onError) {
    this.url=baseUrl+language+"&sort="+sort;
    // $.ajax({
    //     type: 'POST',
    //     url: url,
    //     async: false,
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     processData: false,
    //     success: onSuccess,
    //     error: onError
    // });
    this.$axios.post('url',{key:url}).then(res =>{
        console.log(res,'后端返回数据')
    })
}

export default {getRequest,postRequest}