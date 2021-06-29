'use strict';
/**
 * Created by Jesn on 2021/6/18.
 *
 */

import Axios from 'axios';

const HOST = "/api";
// const HOST = "http://3g8oacl.nat.ipyingshe.com";//build_test
// const HOST = "";//build
const IsAlert = Boolean(HOST != "/api");

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
const ApiBibleVersion = function () {
    return [{
        id: 1,
        name: "新标点和合本"
    }]
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
    const list = (await post(`/bible/changeVolume`, {OldOrNew})) || [];
    return list.map(item => {
        return {
            id: item.id,
            name: item.FullName_Ch,
            shortName: item.ShortName_Ch,
            chapterCount: item.chapterCount
        }
    });
};
const ApiBibleWord = async function (bookId, charpterNo) {
    let list = (await post(`/bible/getBible`, {bookId, charpterNo})) || [];

    // list = [{"verseNo":1,"YCUVS":"亚伯拉罕的后裔，大卫的子孙〔后裔，子孙，原文都作儿子。下同。〕，耶稣基督的家谱："},{"verseNo":2,"YCUVS":"亚伯拉罕生以撒；以撒生雅各；雅各生犹大和他的弟兄；"},{"verseNo":3,"YCUVS":"犹大从他玛氏生法勒斯和谢拉；法勒斯生希斯仑；希斯仑生亚兰；"},{"verseNo":4,"YCUVS":"亚兰生亚米拿达；亚米拿达生拿顺；拿顺生撒门；"},{"verseNo":5,"YCUVS":"撒门从喇合氏生波阿斯；波阿斯从路得氏生俄备得；俄备得生耶西；"},{"verseNo":6,"YCUVS":"耶西生大卫王。大卫从乌利亚的妻子生所罗门；"},{"verseNo":7,"YCUVS":"所罗门生罗波安；罗波安生亚比雅；亚比雅生亚撒；"},{"verseNo":8,"YCUVS":"亚撒生约沙法；约沙法生约兰；约兰生乌西亚；"},{"verseNo":9,"YCUVS":"乌西亚生约坦；约坦生亚哈斯；亚哈斯生希西家；"},{"verseNo":10,"YCUVS":"希西家生玛拿西；玛拿西生亚们；亚们生约西亚；"},{"verseNo":11,"YCUVS":"百姓被迁到巴比伦的时候，约西亚生耶哥尼雅和他的弟兄。"},{"verseNo":12,"YCUVS":"迁到巴比伦之后，耶哥尼雅生撒拉铁；撒拉铁生所罗巴伯；"},{"verseNo":13,"YCUVS":"所罗巴伯生亚比玉；亚比玉生以利亚敬；以利亚敬生亚所；"},{"verseNo":14,"YCUVS":"亚所生撒督；撒督生亚金；亚金生以律；"},{"verseNo":15,"YCUVS":"以律生以利亚撒；以利亚撒生马但；马但生雅各；"},{"verseNo":16,"YCUVS":"雅各生约瑟，就是马利亚的丈夫。那称为基督的耶稣是从马利亚生的。"},{"verseNo":17,"YCUVS":"这样，从亚伯拉罕到大卫共有十四代；从大卫到迁至巴比伦的时候也有十四代；从迁至巴比伦的时候到基督又有十四代。"},{"verseNo":18,"YCUVS":"耶稣基督降生的事记在下面：他母亲马利亚已经许配了约瑟，还没有迎娶，马利亚就从圣灵怀了孕。"},{"verseNo":19,"YCUVS":"她丈夫约瑟是个义人，不愿意明明的羞辱她，想要暗暗的把她休了。"},{"verseNo":20,"YCUVS":"正思念这事的时候，有主[雅伟]的使者向他梦中显现，说：“大卫的子孙约瑟，不要怕！只管娶过你的妻子马利亚来，因她所怀的孕是从圣灵来的。"},{"verseNo":21,"YCUVS":"她将要生一个儿子，你要给他起名叫耶稣，因他要将自己的百姓从罪恶里救出来。”"},{"verseNo":22,"YCUVS":"这一切的事成就是要应验主[雅伟]借先知所说的话，"},{"verseNo":23,"YCUVS":"说：必有童女怀孕生子；“人要称他的名为以马内利。”（“以马内利”翻出来就是“神与我们同在。”）"},{"verseNo":24,"YCUVS":"约瑟醒了，起来，就遵着主[雅伟]使者的吩咐把妻子娶过来；"},{"verseNo":25,"YCUVS":"只是没有和她同房，等她生了儿子〔有古卷：等她生了头胎的儿子〕，就给他起名叫耶稣。"}];

    return list.map(item => {
        return {
            id: item.verseNo,
            name: item.YCUVS
        }
    });
};

const ApiLogin = async function (loginName,password) {
    const data = await post('/doLogin',{loginName,password});
    return data;//TODO ：1.接口，2. 写入session
}

const ApiLogout = async function () {
    return "";//TODO ：1.接口，2. 清除session
}

const ApiRegister = async function (account,password) {
    return "";//TODO
}

const ApiResetPassword = async function (account,email) {
    return "";//TODO
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
const ApiUserAsk = async function (bookId, charpterNo, question, whoCanRead=0) {
    const back = await get('/user/ask', {
        bookId, 
        charpterNo, 
        question, 
        whoCanRead: parseInt(whoCanRead)
    });
    return Boolean(parseInt(back));
}

const ApiUserQuestion = async function (bookId, charpterNo) {
    return {
        "myQues": [
            {
                "bookNo": 40,
                "question": "1.测试数据：只有我能看",
                "charpterNo": 1,
                "nickName": "Jesn",
                "whoCanRead": 0,
                "id": 78,
                "quesDate": "2021-06-28 13:32:07.0",
                "bookName": "太:1章",
                "userId": "7fae1a86-ce43-11eb-81c5-14dae960ab41"
            }
        ],
        "pubQues": [],
        "groupQues": []
    };
    return await post('/user/getQuesByReader', {
        bookId, 
        charpterNo
    });
}

const ApiUserData = async function () {
    // let data = await post('/user/loadData');
    let data = {
        "dakaTime": [
            0.0,
            0.0,
            10,
            0.0,
            0.0,
            0.0,
            0.0
        ],
        "yiduOfAll": [
            100, 1189
        ],
        "dakaDate": [
            "6-28",
            "6-29",
            "6-30",
            "7-1",
            "7-2",
            "7-3",
            "7-4"
        ],
        "yiduzhanbi": [
            0.0,
            0.1,
            0.0,
            0.5,
            0.0,
            0.0,
            0.8,
            0.0
        ]
    };

    data.sorts = data.sort || [
        "律法书",
        "诗歌智慧书",
        "大小先知书",
        "四福音书",
        "教会历史",
        "保罗书信",
        "其他书信",
        "启示录"
    ];

    return data;
}

const ApiReferenceList = async function () {
    // let back = await post();//TODO
    let back = [{
        id: 1,
        name: "新约地图",
        cover: "",
        description: "新约圣地相关高清地图",
        pathName: "待添加",
        path: "/"
    }];
    return back;
}

const ApiSoftwareList = async function () {
    // let back = await post();//TODO
    let back = [{
        id: 1,
        name: "多版本圣经",
        cover: "http://3g8oacl.nat.ipyingshe.com/images/bibleSoft.png",
        description: "结合多版本查看圣经,结合多版本查看圣经,结合多版本查看圣经",
        pathName: "下载",
        path: "http://3g8oacl.nat.ipyingshe.com/download/bibleSoft"
    }];
    return back;
}

function post(url,data,params,not_form) {
    return request("post",url,data,params,not_form);
}

function get(url,params,not_form) {
    return request("get",url,null,params,not_form);
}

function request (method, url, data, params, not_form) {
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
            return;
        }
        if (result.status !== 200) {
            if(IsAlert) alert(result);
            return;
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