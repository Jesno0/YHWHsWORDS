'use strict';
/**
 * Created by Jesn on 2021/6/18.
 *
 */

import Axios from 'axios';

const host = "http://3g8oacl.nat.ipyingshe.com";
// const host = process.env.host

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
const ApiBibleChapter = function () {
    return request('post', `/bible/changeVolume`)
};
const ApiBibleContent = function (bookId, charpterNo) {
    return request('post', `/bible/getBible`, {bookId, charpterNo});
};

function request (method, url, opts) {
    return Axios[method](`${host}${url}`, opts).then(function (result) {
        if ((result.status >= 500) && (result.status <= 600)) return Promise.reject('服务器错误，可联系技术人员');
        if (result.status !== 200) return Promise.reject(result);
        result = result.data;
        if (result.constructor !== Object) return result;
        if (result.ok !== 0) return Promise.reject(result);
        return result.data;
    })
}

export {
    ApiBannar,
    ApiBibleChapter,
    ApiBibleContent
}
