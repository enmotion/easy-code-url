# easy-code-url #

为便利浏览器传参转换而设立。<br>

#### 设计思路：####
1.可将JSON对象直接转换成传参地址拼接字符，默认拼接符号"&"可设置新符号<br>
2.可将地址与参数便捷的组合成传参地址，通过设置可启用encodeURIComponent对拼接后的地址进行安全符处理，也可通过携带参数的地址或者安全符地址，便捷的将参数转换为JSON对象<br>
3.传参分割符号"？"可设置<br>

#### install ####
npm安装命令
```
npm install --save easy-code-url
```

#### Usage ####

引入包
```
import ECU from "easy-code-url"
```

范例

```
import easyCodeURL from "easy-code-url";
//拼装Data
let data={
    name:"MOD",
    age:12,
    gender:"male",
    hobby:["videogame","tree",{new:"keep"}],
}
var strData = easyCodeURL.encodeData(data)
console.log(strData);
console.log(easyCodeURL.decodeData(strData))
var URL = easyCodeURL.encodeURL("www.baidu.com",data,{encode:true})
var URL = easyCodeURL.encodeURL("www.baidu.com",data,{encode:false})
console.log(URL);
console.log(easyCodeURL.decodeURL(URL,{encode:true}))
var sss = easyCodeURL.decodeURL(URL,{encode:true});
console.log(sss);

//通过以上输出测试，可看到具体的使用方式与结果

```

### API ###
#### encodeData(data,join)<br> #### 

```
easyCodeURL.encodeData({name:"foo",age:"22"},"&");
```

#### decodeData(strData,join)<br> #### 

#### encodeURL(urlstr,data,config)<br> ####

```
config:{
    encode:false,//Boolean,默认：false，是否启用 URI 组件进行编码 encodeURIComponent
    join:"&",//默认为"&".可自定义拼接符号，
    break:"?",//分割符，可自定义
}
```
#### decodeURL(appName,version)<br> #### 

config 配置同上