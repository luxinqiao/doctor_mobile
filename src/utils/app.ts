import {getBrowserType, isEmpty, getCookie} from './common'

/**
    获取app环境类型
    @param
    @return app环境类型
 */
const getAppType = ()=> {
    const u: string = window.navigator.userAgent
    if (u.indexOf('Android') > -1) {
        return 'android'
    }
    if (u.indexOf('Linux') > -1 || u.indexOf('Windows') > -1) {
        return 'pc'
    }
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return 'ios'
    }
    return 'pc'
}

/**
    获取app产品类型（wrightin/wrightinDoctor/独立软件）
    @param
    @return app产品类型
 */
const getAppProduct = ()=> {
    const app_uinfo = getCookie('app_uinfo')
    if (isEmpty(app_uinfo)) {
        return ''
    }
    const appProduct = app_uinfo.split('|')[3]
    if (isEmpty(appProduct)) {
        return ''
    }
    return appProduct
}

/**
	调用app方法（不对外开放）
	@param {Function}androidFun android方法
    @param {Function}iosFun ios方法
    @return
*/
const appFun = (androidFun:Function, iosFun:Function)=> {
	if (getBrowserType() != 'app') {
		return
	}
	if (getAppType() === 'android') {
		androidFun()
	} else if (getAppType() === 'ios') {
		iosFun()
	}
}

/**
    跳转登录
    @param
    @return
*/
const goLogin = ()=> {
	appFun(function() {
        window.jsInterface.goLogin()
    }, function() {
        window.webkit.messageHandlers.goLogin.postMessage(null)
    })
}

/**
    关闭webview
    @param
    @return
*/
const closeWindow = ()=> {
	appFun(()=> {
        window.jsInterface.closeWindow()
    }, function() {
        window.webkit.messageHandlers.closeWindow.postMessage(null)
    })
}

/**
	获取app的token
	@param
	@return {String} app的token
 */
const getToken = ()=> {
    const app_uinfo = getCookie('app_uinfo')
	if (isEmpty(app_uinfo)) {
        return ''
	}
    const token = app_uinfo.split('|')[1]
	if (isEmpty(token)) {
        return ''
    }
    return token
}

/**
	获取app的头部信息栏高度
	@param
	@return app头部
 */
const getHeadTop = ()=> {
    const app_uinfo = getCookie('app_uinfo')
	if (isEmpty(app_uinfo)) {
        return 0
	}
	const header = app_uinfo.split('|')[2]
	if (isEmpty(header)) {
        return 0
	}
    return Number(header)
}

/**
    获取页面距离头部高度
    @param
    @return 页面距离头部高度
 */
const getPageTop = ()=> {
    return Math.floor(document.body.clientWidth/375*44)+Number(getHeadTop())
}

/**
    跳转收益报表
    @param
    @return
*/
const goIncome = ()=> {
	appFun(()=> {
        window.jsInterface.goIncome()
    }, function() {
        window.webkit.messageHandlers.goIncome.postMessage(null)
    })
}
/**
    跳转我的业绩
    @param
    @return
*/
const goMyAch = ()=> {
	appFun(()=> {
        window.jsInterface.goMyAch()
    }, function() {
        window.webkit.messageHandlers.goMyAch.postMessage(null)
    })
}
/**
    跳转我的团队
    @param
    @return
*/
const goGroup = ()=> {
	appFun(()=> {
        window.jsInterface.goGroup()
    }, function() {
        window.webkit.messageHandlers.goGroup.postMessage(null)
    })
}
/**
    跳转团员业绩
    @param
    @return
*/
const goMemberAch = ()=> {
	appFun(()=> {
        window.jsInterface.goMemberAch()
    }, function() {
        window.webkit.messageHandlers.goMemberAch.postMessage(null)
    })
}

export {
    getAppType,
    getAppProduct,
    appFun,
    goLogin,
    closeWindow,
    getToken,
    getHeadTop,
    getPageTop,
    goIncome,
    goMyAch,
    goGroup,
    goMemberAch
}
