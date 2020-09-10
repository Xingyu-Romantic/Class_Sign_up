var app = getApp()
Page({
  data: {
    user: {},
    array: ['高等数学', '大学物理'],
  },
  onShow: function (options) {
    console.log()
    var that = this;
    
  },
  onLoad:function(){
    this.getclasslist();
    this.setData({
      index: 0
    });
    
  },
  bindPickerChange: function(e) {
    console.log(e.detail)
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      data: this.data.array[e.detail.value],
      key: 'current_class_name',
    })
  },
  getclasslist:function(){
    wx.request({
      url: 'http://39.99.142.253:5000/get_class',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: { openid: wx.getStorageSync('openid') },
      success: res => {
       // wx.hideLoading()

        let data = res.data
        console.log(data)
        if (!data.code) {
          wx.showToast({
            title: '班级信息加载完毕',
            icon:'none'
          })
          var array = []
          for(var i =0 ;i < data.data.length ; i++)
          {
            array[i] = data.data[i].class_name;
          }
          this.setData({
            array:array,
          })
          wx.setStorage({
            data: data.data[0].class_name,
            key: 'current_class_name',
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: '班级信息加载失败',
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        // console.log('加载失败', res)
        wx.showToast({
          icon: 'none',
          title: '班级信息加载失败',
        })
      }
    })
  }
})