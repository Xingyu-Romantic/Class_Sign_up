//index.js
//获取应用实例
const app = getApp()
var touch = [0, 0];
Page({
  data: {
    motto: 'Hello World',
    showModalStatus: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageIndex: 1,
    pageSize: 8,
    storyList: [],
    loading: true,
    movieData: [{
      id: 0,
      class_name: '壁花少年',
      class_id: '青春 / 成长 / 美国 / 爱情',
      button_name:'班级管理'
      },
      {
        id: 1,
        class_name:'班级名称',
        class_id: '青春 / 成长 / 美国 / 爱情',
        button_name:'添加班级'
      }
    ],
    testCurrentNav: 0,
    currentIndex: 0,
    currentMovie: {},
    // movieAnimationData: '',
    movieDistance: 0,
    classArray: ['active', 'next'],
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  powerDrawer: function(e){
    var name = e.currentTarget.dataset.btnName;
    var index = e.currentTarget.dataset.id;
    var class_name = this.data.movieData[index].class_name;
    var class_id = this.data.movieData[index].class_id;
     if ( name == '班级管理')
     {
      wx.navigateTo({
        url: '../classdata/classdata?class_name='+class_name+'&class_id='+class_id
      })
      }
      else{
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu);
        
        
      }
    

      
      
    
  },
  submitform:function(e){
   
    wx.setStorage({
      key: 'class_id',
      data: e.detail.value.class_id,
    })
    wx.setStorage({
      key: 'class_name',
      data: e.detail.value.class_name,
    })
  },

  naivgatetoface: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var class_id = wx.getStorageSync('class_id')
    var class_name = wx.getStorageSync('class_name')
    this.util(currentStatu);
    if(class_id == '' && class_name == '')
    {
      wx.showToast({
        title: '班级ID或班级姓名为空',
        icon:'none'
      })
      return 
    }
    wx.navigateTo({
      url: '/pages/addclass/addclass',
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 150,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1,
      loading: true
    })
    this.loadMrysData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getMovieList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 开始滑动
  onTouchStart(e) {
    touch[0] = e.touches[0].clientX;  // touch为全局变量
  },
  // 结束滑动
  onTouchEnd(e) {
    touch[1] = e.changedTouches[0].clientX;
    if (touch[0] - touch[1] > 5) {  // 
      this.addClassName('left');
    } else if (touch[1] - touch[0] > 5) {
      this.addClassName('right');
    }
  },
  addClassName(direction) {
    // 当前（显示）电影序号
    let currentIndex = this.data.currentIndex;
    // 当前电影信息
    let currentMovie = {};
    // 所有电影信息
    let movieData = this.data.movieData;
    let length = movieData.length;
    // 样式列表
    let classArray = new Array(length);

    if (direction === 'left') {  // 向左滑动
      // 是否为最后一项
      if (++currentIndex >= length) return
      // 若不是，则添加样式至样式数组
      /* 样式数组与view视图中的卡片class绑定，可以实现数据动态更新*/
      classArray[currentIndex] = 'active';
      classArray[currentIndex - 1] = 'prev';
      // 是否存在下一张卡片，存在则为其添加样式
      if (currentIndex + 1 < length) {
        classArray[currentIndex + 1] = 'next';
      }
    } else if (direction === 'right') {  // 向右滑动
      // 逻辑同上
      if (--currentIndex < 0) return

      if (currentIndex - 1 >= 0) {
        classArray[currentIndex - 1] = 'prev';
      }
      classArray[currentIndex] = 'active';
      classArray[currentIndex + 1] = 'next';
    }

    currentMovie = movieData[currentIndex];
    this.moveCard(direction);  // 动画操作
    /* 更新当前显示电影序列号，样式数组以及当前电影信息（该项用于用户点击时，查看电影详情信息）*/
    this.setData({
      currentIndex,
      classArray,
      currentMovie,
    })
  },
  // 卡片移动
  moveCard(direction) {
    let currentIndex = this.data.currentIndex + 1;
    let movieDistance = this.data.movieDistance;

    if (direction === 'left') {
      movieDistance -= 549;
    } else if (direction === 'right') {
      movieDistance += 549;
    }

    this.setData({
      movieDistance,
    })
  } ,
 jumptosettings: function () { wx.navigateTo({ url: '/pages/settings/settings', }) },
  

  getMovieList() {
     
     console.log(1)
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

        if (!data.code) {
          wx.showToast({
            title: '班级信息加载完毕',
            icon:'none'
          })
          this.setData({
            movieData: data.data,
            currentMovie: data.data[0]
          })
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
  },

})




