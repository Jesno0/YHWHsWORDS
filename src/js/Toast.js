const Toast = {};
Toast.install = function (Vue) {
    Vue.prototype.$toast = (tips,delay) => {
        const toastTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
            template: '<div style="'
            +'z-index: 9999;'
            +'position: fixed;'
            +'left: 20%;'
            +'top: 20%;'
            +'width: 200px;'
            +'background-color: #333333aa;'
            +'padding: 20px;'
            +'border-radius: 5px;'
            +'font-size: 20px;'
            +'color: #fff;'
            +'display: flex;'
            +'justify-content: center;'
            +'word-break: break-all;'
            +'">' + tips + '</div>'
        });
        const tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
        document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
        // return new Promise((resolve,reject) => {
            setTimeout(function () {        // 4、延迟2.5秒后移除该提示
                document.body.removeChild(tpl);
                // return resolve();
            }, delay || 2500)
        // });
    }
};
module.exports = Toast;