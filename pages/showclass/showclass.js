// pages/showclass/showclass.js
var touch = [0, 0];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    face_list:[
      {id:0,
        data:'',
        name:'',
        stuid:0
    }
    ],
    classArray: ['active', 'next'],
    testCurrentNav: 0,
    currentIndex: 0,
    currentMovie: {},
    movieDistance: 0,
    commitbool:false
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
      var base64_face = wx.getStorageSync('base64_face');
      var face_list = this.data.face_list;
      var k ={};
      for(var i =0;i<base64_face.length;i++)
      {
        base64_face[i] = base64_face[i].replace(/[\r\n]/g, '')
        k = {id:i, data: base64_face[i]};
        face_list[i]=k;
      }
      this.setData({
        face_list:face_list
      })
  },
  onPullDownRefresh: function () {
    this.getMovieList()
  },
  // 开始滑动
  onTouchStart(e) {

    touch[0] = e.touches[0].clientX
  },
  // 结束滑动
  onTouchEnd(e) {
    touch[1] = e.changedTouches[0].clientX;
    if (touch[0] - touch[1] > 5) {
      this.addClassName('left');
    } else if (touch[1] - touch[0] > 5) {
      this.addClassName('right');
    }
  },
  moveCard(direction) {
    let currentIndex = this.data.currentIndex + 1
    let movieDistance = this.data.movieDistance

    if (direction === 'left') {
      movieDistance -= 549
    } else if (direction === 'right') {
      movieDistance += 549
    }

    this.setData({
      movieDistance
    })
  },
  addClassName(direction) {
    // 当前（显示）电影序号
    let currentIndex = this.data.currentIndex;
    // 当前电影信息
    let currentMovie = {};
    // 所有电影信息
    let face_list = this.data.face_list;
    let length = face_list.length;
    // 样式列表
    let classArray = new Array(length);

    if (direction === 'left') {  // 向左滑动
      // 是否为最后一项
  
      if (++currentIndex >= length) {
        this.setData({
          commitbool:true
        });
        return
      }
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

    currentMovie = face_list[currentIndex];
    this.moveCard(direction);  // 动画操作
    /* 更新当前显示电影序列号，样式数组以及当前电影信息（该项用于用户点击时，查看电影详情信息）*/
    this.setData({
      currentIndex,
      classArray,
      currentMovie,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  commit_info:function(){
    var face_list = this.data.face_list;
    var class_name = wx.getStorageSync('class_name')
    var class_id = wx.getStorageSync('class_id')
    var wx_openid = wx.getStorageSync('openid')
     for(var i =0;i< face_list.length;i++)
     {
       if(face_list[i]['name'] == undefined && face_list[i]['stuid'] == undefined)
       {
         console.log('未定义')
         wx.showToast({
           title: '姓名或学号为空',
           icon:'none'
         })
         return
       }
     }
     wx.request({
       url: 'http://39.99.142.253:5000/sign_up_face',
       method:'POST',
       header:{ 'content-type': 'application/json'},
       data:{
              face_list : face_list,
              class_name:class_name,
              class_id:class_id,
              wx_openid:wx_openid
             },
       success:function(res){
         if(res.data.code == 0){
           console.log('Success!')
           wx.showToast({
             title: res.data.data,
             icon:'none'
           })
          
         }
         else{
           wx.showToast({
             title: '添加班级失败',
           })
         }
       }
     })

  },
  Name_input: function(e){
    var index = e.currentTarget.dataset.id;
    var name = e.detail.value;
    this.data.face_list[index]['name'] = name; 
  },
  Id_input:function(e){
    var index = e.currentTarget.dataset.id;
    var stuid = e.detail.value;
    this.data.face_list[index]['stuid'] = stuid;
  }
})

