
const api = require('./api');
const app = getApp();

//路由跳转
const NAVIGATE = function (_url) {
  wx.navigateTo({ url: _url })
}
const REDIRECT = function (_url) {
  wx.redirectTo({ url: _url })
}
const SWITCHTAB = function (_url) {
  wx.switchTab({ url: _url });
}
const TOBACK = function (_num) {
  wx.navigateBack({ delta: _num });
}

//时间戳格式化函数
const DATESTAMP = function (_time) {
  let time_ = new Date(_time),
    year = time_.getFullYear(),
    month = time_.getMonth() + 1,
    date = time_.getDate(),
    hour = time_.getHours(),
    minute = time_.getMinutes(),
    second = time_.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
}

//正则验证
//验证手机号
const ISPHONE = function (_phone) {
  let reg = /^[1][3, 4, 5, 6, 7, 8][0-9]{9}$/
  if (reg.test(_phone)) {
    return true;
  } else {
    return false;
  }
}
//验证验证码
const ISAUTHCODE = function (_authCode) {
  let reg = /^[0-9]{6}$/;
  if (reg.test(_authCode)) {
    return true;
  } else {
    return false;
  }
}
//验证密码
const ISPASS = function (_pass) {
  let reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
  if (reg.test(_pass)) {
    return true;
  } else {
    return false;
  }
}
//验证姓名
const ISNAME = function (_name) {
  let reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
  if (reg.test(_name)) {
    return true;
  } else {
    return false;
  }
}
//消息提示
const SHOWTIPS = function (_msg, _icon, _duration, cb) {
  wx.showToast({
    title: _msg,
    icon: _icon,
    duration: _duration || 1500,
    mask: true,
    success: function (res) {
      return typeof _cb === 'function' && _cb(res);
    },
    fail: function (err) {
      return typeof _cb === 'function' && _cb(false);
    }
  })
}
//验证是否空对象
const ISEMPTYOBJ = function (_obj) {
  for (let k in _obj) {
    return false;
  };
  return true;
};
//加载提示
const LOADTIPS = function (_msg, _cb) {
  wx.showLoading({
    title: _msg,
    mask: true,
    success: function (res) {
      return typeof _cb === 'function' && _cb(res);
    },
    fail: function (err) {
      return typeof _cb === 'function' && _cb(false);
    }
  })
}
//模态弹框
const MODALTIPS = function (_msg, _content, _cb) {
  wx.showModal({
    title: _msg,
    content: _content,
    success: function (res) {
      return typeof _cb === 'function' && _cb(res);
    }
  })
}

//请求数据
const REQUEST = function (_url, _data, _getWay, _cb) {
  wx.request({
    url: _url,
    data: _data || '',
    method: _getWay,
    header: {
      'content-type': 'application/json',
      'token': app.globalData.token,
    },
    success: function (res) {
      //code为2就是未登录，将状态换成未登录的0
      if (res.data.code == 2) {
        wx.setStorage({
          key: 'status',
          data: 0,
        })
        app.globalData.status = 0;

      }
      return typeof _cb === 'function' && _cb(res.data);
    },
    fail: function (err) {
      return typeof _cb === 'function' && _cb(false);
    }
  })
}

const BRINGHEADER_REQUEST = function (_url, _data, _getWay, _id, _cb) {
  wx.request({
    url: _url,
    data: _data || '',
    method: _getWay,
    header: {
      'Accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      'userid': _id
    },
    success: function (res) {
      return typeof _cb === 'function' && _cb(res.data);
    },
    fail: function (err) {
      return typeof _cb === 'function' && _cb(false);
    }
  })
}

//分享
const share = function () {
  //监听路由切换
  //间接实现全局设置分享内容
  wx.onAppRoute(function (res) {
    //获取加载的页面
    let pages = getCurrentPages(),
      //获取当前页面的对象
      view = pages[pages.length - 1],
      data;
    if (view) {
      data = view.data;
      console.log('是否重写分享方法', data.isOverShare);
      if (!data.isOverShare) {
        data.isOverShare = true;
        view.onShareAppMessage = function () {
          //分享配置
          return {
            title: '分享的标题',
            path: '/pages/index/index'
          };
        }
      }
    }
  })
}

//上传图片
const UPLOADFILE = function (_url, _file, _id, _cb) {
  wx.uploadFile({
    url: _url,
    filePath: _file,
    name: 'images',
    header: {
      'content-type': 'multipart/form-data',
    },
    success: function (res) {
      return typeof _cb === 'function' && _cb(res.data);
    }
  })
}

//预览图片
const PREVIEWPIC = function (_src, _picsArr) {
  wx.previewImage({
    current: _src,
    urls: _picsArr
  })
}
//图片自适应
const PICSLOAD = function (_e, _self, _vW, _vH) {
  let _width = _e.detail.width,
    _height = _e.detail.height,
    ratio = _width / _height,
    _viewW = _vW,
    _viewH = _vH,
    viewW = _viewH * ratio,
    viewH = _viewW / ratio,
    image = _self.data.images;
  if (_width > _height) {
    image[_e.target.dataset.index] = {
      width: viewW,
      height: _viewH
    }
  } else if (_width < _height) {
    image[_e.target.dataset.index] = {
      width: _viewW,
      height: viewH
    }
  } else {
    image[_e.target.dataset.index] = {
      width: _viewW,
      height: _viewH
    }
  }
  return image;
}

//图片按高度等比例适应
const Scaling = function (e, _viewH) {
  let imgWidth = _viewH / e.detail.height * e.detail.width
  return imgWidth
}

//图片按原图比例缩放
const Adapt = function (e) {
  let imageSize = {}
  //获取当前屏幕大小,注意:获取到的是px而非rpx
  wx.getSystemInfo({
    success: function (res) {
      console.log(res)
      let ratio = res.windowWidth / e.detail.width,
        imgW = res.windowWidth,
        imgH = e.detail.height * ratio;
      imageSize = { imageHeight: imgH, imageWidth: imgW }
    }
  })
  return imageSize
}

//设置本地存储
const SETSTORAGE = function (_key, _value) {
  wx.setStorage({
    key: _key,
    data: _value
  })
}

//获取本地存储
const GETSTORAGE = function (_key, _cb) {
  wx.getStorage({
    key: _key,
    success: function (res) {
      return typeof _cb === 'function' && _cb(res);
    },
    fail: function (err) {
      return typeof _cb === 'function' && _cb(false);
    }
  })
}

//移除本地存储
const REMOVESTORAGE = function (_key, _cb) {
  wx.removeStorage({
    key: _key,
    success: function (res) {
      return typeof _cb === 'function' && _cb(res);
    }
  })
}

//转发
const SHOWSHAREMENU = function () {
  wx.showShareMenu({
    success: function (res) {
      if (res.errMsg != "showShareMenu:ok") {
        common.showToast(common.ERR_MSGS.errStr, 'none'); return;
      }
    }
  })
}


module.exports = {
  NAVIGATE: NAVIGATE,
  REDIRECT: REDIRECT,
  SWITCHTAB: SWITCHTAB,
  TOBACK: TOBACK,
  DATESTAMP: DATESTAMP,
  REQUEST: REQUEST,
  BRINGHEADER_REQUEST: BRINGHEADER_REQUEST,
  ISPHONE: ISPHONE,
  ISAUTHCODE: ISAUTHCODE,
  ISPASS: ISPASS,
  SHOWTIPS: SHOWTIPS,
  LOADTIPS: LOADTIPS,
  MODALTIPS: MODALTIPS,
  ISNAME: ISNAME,
  PREVIEWPIC: PREVIEWPIC,
  PICSLOAD: PICSLOAD,
  UPLOADFILE: UPLOADFILE,
  SETSTORAGE: SETSTORAGE,
  GETSTORAGE: GETSTORAGE,
  REMOVESTORAGE: REMOVESTORAGE,
  ISEMPTYOBJ: ISEMPTYOBJ,
  SHOWSHAREMENU: SHOWSHAREMENU,
  share: share,
  Scaling: Scaling,
  Adapt: Adapt
}