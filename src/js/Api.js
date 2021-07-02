'use strict';
/**
 * Created by Jesn on 2021/6/18.
 *
 */

import Axios from 'axios';
import ApiLocalData from './ApiLocalData.json'

const HOST = "/api";
// const HOST = "http://3g8oacl.nat.ipyingshe.com";//build_test
// const HOST = "http://localhost:8080/api";//build_test
// const HOST = "";//build_prod
const IsAlert = Boolean(HOST != "/api");
const IsLocalData = !IsAlert && false;

let Vue;
const install = function (_Vue) {
    Vue = _Vue;
};

const ApiBannar = async function () {
    return [{
        iconTxt: "阅读圣经打卡",
        title: "带着问题 读经打卡",
        content: "在这个页面里，如果不登录，只能看雅伟版圣经，登录后可打卡，可提问，也可看到别人提的问题"
    },{
        iconTxt: "打卡统计",
        title: "统计打卡 彼此监督",
        content: "在这个面前里你将看到今天、最近一周、一个月、一年内的打卡情况，你也可以看到群友们今天的打卡情况，彼此督促"
    },{
        iconTxt: "资料工具",
        title: "资料工具参考",
        content: "在这个页面里可以下载到一些圣经参考资料和工具软件，你也可以把你有的资料分享出来"
    }];
};
const ApiBibleVersion = async function () {
    const back = await post("/bible/version");
    return back;
};
const ApiBibleBookType = function () {
    return [{
        id: 1,
        name: "旧约"
    },{
        id: 2,
        name: "新约"
    }]
};
const ApiBibleBook = async function (OldOrNew=2) {
    let list = (await post(`/bible/changeVolume`, {OldOrNew})) || [];
    let userInfo;
    let userIndex = list.findIndex(x=>x.charpterNo);
    if(userIndex > -1) userInfo = list.splice(userIndex,1)[0];

    list = list.map(item => {
        return {
            id: item.id,
            name: item.FullName_Ch,
            shortName: item.ShortName_Ch,
            chapterCount: item.chapterCount
        }
    });

    return {list,userInfo};
};
const ApiBibleWord = async function (bookId, charpterNo, versionIds) {
    let list = (await post(`/bible/getBible`, {bookId, charpterNo})) || [];
    let userInfo;
    let userIndex = list.findIndex(x=>x.maxTime);
    if(userIndex > -1) userInfo = list.splice(userIndex,1)[0];

    list = list.map(item => {
        return {
            id: item.verseNo,
            name: item.YCUVS
        }
    });

    //TODO: versionIds
    let words = [list];
    if(versionIds.length > 1) words.push(list);

    return {words,userInfo};
};

const ApiLogin = async function (loginName,password) {
    const data = await post('/doLogin',{loginName,password});
    return data;
}

const ApiLogout = async function () {
    return "";
}

const ApiRegister = async function (account,password) {
    return "";
}

const ApiResetPassword = async function (account,email) {
    return "";
}

const ApiCheckPassword = async function (pwd) {
    return post('/user/checkOldPwd',{pwd});
}

const ApiCheckLogin = async function () {
    return get('/isLogin.do');
}

const ApiEditProfile = async function ({
    loginName,
    nickName,
    email,
    phone,
    oldPassword,
    newPassword,
    editIp,
    editAddr,
    avatar
}) {
    return post('/user/editAccount',{
        loginName,
        nickName,
        regEmail: email,
        regPhone: phone,
        oldLoginPwd: oldPassword,
        loginPwd: newPassword,
        twoLoginPwd: newPassword,
        editIp,
        editAddr,
        file: avatar
    });
}

const ApiUserPunchIn = async function (bookId, charpterNo) {
    const {res} = await get('/user/daka', {bookId, charpterNo});
    return Boolean(parseInt(res));
}

/**
 * 
 * @param {Number} bookId ｜必须｜书卷id
 * @param {Number} charpterNo ｜必须｜章节id
 * @param {String} question ｜必须｜问题
 * @param {Number} whoCanRead ｜非必须:0｜0/1/2:个人/群内/全员
 */
const ApiUserAsk = async function (bookNo, charpterNo, question, whoCanRead=0) {
    const back = await post('/user/ask', {
        bookNo, 
        charpterNo, 
        question, 
        whoCanRead: parseInt(whoCanRead)
    });
    return Boolean(parseInt(back));
}

const ApiUserQuestion = async function (bookId, charpterNo) {
    return await post('/user/getQuesByReader', {
        bookId, 
        charpterNo
    });
}

const ApiUserData = async function () {
    const data = await post('/user/loadData');
    data.sorts = data.sort || [
        "律法书",
        "历史书",
        "诗歌智慧书",
        "先知书",
        "四福音书",
        "教会历史",
        "书信",
        "启示录"
    ];

    return data;
}

const ApiReferenceList = async function () {
    return ApiLocalData["/tool/reference"];
    const back = await post("/tool/reference");//TODO
    return back;
}

const ApiSoftwareList = async function () {
    return ApiLocalData["/tool/software"];
    const back = await post("/tool/software");//TODO
    return back;
}

function post(url,data,params,not_form) {
    return request("post",url,data,params,not_form);
}

function get(url,params,not_form) {
    return request("get",url,null,params,not_form);
}

function request (method, url, data, params, not_form) {
    if(IsLocalData) return ApiLocalData[url];

    const opts = {
        method,
        url: `${HOST}${url}`,
        params,
        data
    };

    if(!not_form) {
        opts.transformRequest = [
            function (val) {
               let ret = ''
               for (let it in val) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(val[it]) + '&'
               }
               ret = ret.substring(0, ret.lastIndexOf('&'));
               return ret;
            }
        ];
        opts.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    return Axios(opts).then(function (result) {
        if ((result.status >= 500) && (result.status <= 600)) {
            if(IsAlert) alert('服务器错误，可稍候再试');
            return Promise.reject(result);
        }
        if (result.status !== 200) {
            if(IsAlert) alert(result);
            return Promise.reject(result);
        }

        result = result.data;
        if (!result || result.constructor !== Object) return result;
        if(isNaN(result.ok)) return result;
        if (result.ok !== 0) {
            if(IsAlert) alert(JSON.parse(result));
            return Promise.reject(result);
        }
        return result.data;
    }).catch(err => {
        if(IsAlert) alert(err);
        return Promise.reject(err);
    })
}

export {
    install,
    ApiLogin,//登陆
    ApiLogout,//退出
    ApiRegister,//注册
    ApiResetPassword,//修改密码
    ApiCheckPassword,//验证密码
    ApiCheckLogin,//验证登陆
    ApiEditProfile,//修改个人信息
    ApiBannar,//首页走马灯：目前写死
    ApiBibleVersion,//圣经版本
    ApiBibleBookType,//圣经新/旧约（写死）
    ApiBibleBook,//圣经书卷
    ApiBibleWord,//圣经每章经文
    ApiUserPunchIn,//圣经打卡
    ApiUserAsk,//圣经提问
    ApiUserQuestion,//圣经问题列表
    ApiUserData,//用户统计数据
    ApiReferenceList,//参考资料列表
    ApiSoftwareList//软件工具列表
}