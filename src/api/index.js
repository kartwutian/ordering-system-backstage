import axios from 'axios'
import qs from 'qs'
import Url from './url'

/**
 * 统一执行错误处理
 */
export function proxyError(promise) {
    return promise.then( res=> {
        return res;
    }).catch(err => err);
}

/*
 * 发送验证码接口
 * */
export function sendSms(options) {
    return new Promise(function (resolve, reject) {
        axios.post(Url.sendSms, qs.stringify({
            account: options.account, // 手机号
            type: options.type //'类型1注册2找回密码（必填）'
        }), {
            headers: {"content-type": "application/x-www-form-urlencoded"}
        }).then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error);
        });
    })
}
/**
 * 注册接口
 * @param options
 * @param fn
 */
export function register(options) {
    return new Promise(function (resolve, reject) {
        axios.post(Url.register, qs.stringify({
            account: options.account, //'注册手机帐号（必填）',
            password: options.password, //'密码（必填）',
            code: options.code //'注册验证码（必填）'
        }), {
            headers: {"content-type": "application/x-www-form-urlencoded"}
        }).then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error);
        });
    })

}
/**
 * 登陆接口
 * @param options
 * @param fn
 */
export function login(options) {
    return new Promise(function (resolve, reject) {
        axios.post(Url.login, {
            account: options.account, //'注册手机帐号（必填）',
            password: options.password, //'密码（必填）'
            authCode: 'ded' // 验证码
        }, {
            headers: {"content-type": "application/json"}
        }).then(function (res) {
            resolve && resolve(res)
        }).catch(function (err) {
            reject && reject(err)
        });
    })
}

export function logout(options) {
    return new Promise(function (resolve, reject) {
        axios.get(Url.logout)
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

export function upFiles(data,params) {
    if(params){
        Url.upFiles = Url.upFiles + params
    }
    return new Promise(function (resolve, reject) {
        axios.post(Url.upFiles, data, {
            headers: {"content-type": "multipart/form-data"}
        }).then(function (res) {
            resolve && resolve(res)
        }).catch(function (err) {
            reject && reject(err)
        });
    })
}
const testData = {
    "cnName": "盛大",
    "enName": "shengda",
    "logo": "/upfile/business/default/2018/1/dfa3e466cd664c5288775e2ccf3cdeb2.png",
    "album": "/upfile/business/default/2018/1/dfe9b88772104287900e4e216ef8ae98.jpeg",
    "cover": "/upfile/business/default/2018/1/dfa3e466cd664c5288775e2ccf3cdeb2.png",
    "address": "浙江省金华市婺城区双龙南街801号",
    "province": "浙江省",
    "city": "金华市",
    "county": "婺城区",
    "lon": 119.654027,
    "lat": 29.084455,
    "about": "adad",
    "wifiSsid": "njs",
    "wifiPwd": "pppp",
    "phone": "18908234",
    "consume": "",
    "declaration": "的环境安静的就爱犯贱",
    "publicPicture": ""
}

export function updateShop(options) {
    return new Promise(function (resolve, reject) {
        axios.post(Url.updateShop, {
            cnName: options.cnName,  //'中文商家名称',
            enName: options.enName,  // '英文商家名称',
            logo: options.logo,  //'商家logo(单张图片)',
            album: JSON.stringify(options.shows) ,
            cover: options.logo,    //'封面 (单张图片)',
            address: options.address,    //'详细地址',
            province: options.province, //'省',
            city: options.city, //'市',
            county: options.district,   //'县',
            lon: options.lon,//'经度',
            lat: options.lat,   //'纬度',
            beginTime: options.beginTime,   //'营业开始时间',
            endTime: options.endTime,   //'营业结束时间(字符串)',
            about: options.desc,    //'关于我们',
            wifiSsid: options.wifiAccount,  //'WIFI SSID',
            wifiPwd: options.wifiPassword,  //'WIFI 密码',
            phone: options.tel, //'固定电话',
            consume: '',    //'人均消费(单位每人多少元)'
            declaration: options.declaration,   //'服务宣言',
            publicPicture: ''   //'公众号(单张图片)'
        }, {
            headers: {"content-type": "application/json"}
        }).then(function (res) {
            resolve && resolve(res)
        }).catch(function (err) {
            reject && reject(err)
        });
    })
}
export function getShopInfo(options) {
     return axios.get(Url.getShopInfo)
}

export function getCategoryList(options) {
    return axios.post(Url.getCategoryList,{
        pageNo: 1, //'页码'
        pageSize: 1000, //'页数'
        param: {
            keyword: ''//'关键词'
        }
    },{
        headers: {"content-type": "application/json"}
    })
}

export function getInitData(options) {
    return axios.get(Url.getInitData)
}

export function addCategory(options) {
    return axios.post( Url.addTheCategory, options, {
        headers: {"content-type": "application/json"}
    })
}
export function addGoods(options) {
    return axios.post( Url.addGoods, {
        catId: options.catId,
        cnName: options.cnName,
        cnInfo: options.cnInfo,
        marketPrice: options.originPrice,
        memberShipPrice: options.discountPrice,
        menuUnitId: options.goodsUnit,
        priceUnitId: options.priceUnitId,
        picture: options.picture,
    }, {
        headers: {"content-type": "application/json"}
    })
}
export function updateGoods(options) {
    return axios.post( Url.updateGoods, options, {
        headers: {"content-type": "application/json"}
    })
}
export function deleteGoods(options) {
    return axios.post( Url.deleteGoods,qs.stringify(options), {
        headers: {"content-type": "application/x-www-form-urlencoded"}
    })
}

export function getGoodsList(options) {
    return axios.post( Url.getGoodsList, options, {
        headers: {"content-type": "application/json"}
    })
    /*return [{
        category: '面食',
        cnName: '炸酱面',
        cnInfo: '唇齿留香，回味无穷',
        discountPrice: 18,
        originPrice: 20,
        picture: '/的发生的发的撒发生发生发生的发生的发生发放打发斯蒂芬打发',
        goodsUnit: '份'
    }]*/
}
export function getGoodsListByCategory(options) {
    return axios.post( Url.getGoodsListByCategory, options, {
        headers: {"content-type": "application/json"}
    })
}

export function addDesk(options) {
    return axios.post( Url.addDesk, options, {
        headers: {"content-type": "application/json"}
    })
}

export function getDeskList(options) {
    return axios.post( Url.getDeskList, options, {
        headers: {"content-type": "application/json"}
    })
}
export function deleteDesk(options) {
    return axios.post( Url.deleteDeskList,qs.stringify(options), {
        headers: {"content-type": "application/x-www-form-urlencoded"}
    })
}


export function test() {
    axios.get('/test/topics', {
        params: {
            page: 1,
            tab: 'ask',
            limit: 10,
            mdrender: 'false'
        }
    }).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}
