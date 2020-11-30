"use strict";
const R = require("ramda");
function easyCodeURL(){
    // 编码全局配置，地址与参数的分割符，键值对连接符，是否安全编码
    let config_ = {break:'?',join:"&",encode:false}
    // 设置全局配置，获取全局配置
    function setConfig(obj){config_ = R.merge(config_,obj)}
    function getConfig(){return config_}
    //对地址进行编码，(编码地址，编码数据，动态配置) 动态配置如果不设置则采用全局配置
    function encodeURL(baseURL,obj,config){
        let allowType = [Object,Array];
        let conf = R.merge(config_,config||{});
        if( R.isNil(obj) || allowType.indexOf(obj.constructor)<0){
            console.error("endoceURL:ERROR! URL ["+baseURL+"] params is missing or not typeof Object and Array")
            return;
        }
        let appendData = encodeData(obj,conf.join);//调用封装data方法
        let URL = baseURL+conf.break+appendData;
        if(conf.encode){
            return encodeURIComponent(URL);
        }else{
            return URL
        }
    }
    //对地址进行解码，(需解码的地址，动态配置) 动态配置如果不设置则采用全局配置
    function decodeURL(locationURL,config){
        let conf = R.merge(config_,config||{});
        if(conf.encode){
            locationURL = decodeURIComponent(locationURL);
        }
        let params = locationURL.split(config.break)[1];
        let paramsData={};
        try {
            paramsData = decodeData(params);      
        }catch(e){
            console.error("endoceURL:ERROR! URL ["+locationURL+"] params can not parse!")
        }            
        return paramsData
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function encodeData(obj,join){
        var join = join || config_.join
        var paramsKeys = R.keys(obj);
        let appendData=[];
        paramsKeys.forEach(item=>{
            var value = obj[item].constructor == String ? obj[item] : JSON.stringify(obj[item]);
            appendData.push(item+"="+value)
        })
        appendData = appendData.join(join);
        return appendData;
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function decodeData(paramsStr,join){
        var join = join || config_.join
        let params = paramsStr;        
        let paramsData = {};
        if(!R.isNil(params)){
            params = params.split(join);
            params.forEach(item=>{
                let info = item.split("=");
                let value = parseValue(info[1]);
                paramsData[info[0]] = value;
            })
            return paramsData
        }
        return{}
    }
    //数据解析为对象方法
    function parseValue(value){
        try{
            var v = JSON.parse(value);
            return v;
        }catch(e){
            return value
        }
    }
    function checkValue(item){
        return !R.isNil(item) && !R.isEmpty(item)
    }
    return{
        setConfig,
        getConfig,
        encodeURL,
        decodeURL,
        encodeData,
        decodeData,
        checkValue
    }
}
export default easyCodeURL();