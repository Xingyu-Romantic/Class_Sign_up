// pages/signdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_name:'',
    class_id:'',     
    sign_info:'',
    unsign_info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.setData({
         sign_info:options.signdata,
         unsign_info:options.unsigndata
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

  get_sign_info: function(){
    wx.request({
      url: 'http://39.99.142.253:5000/get_sign_info',
      method:'post',
      data:{
        class_name: wx.getStorageSync('current_class_name')
      }
    })
  }
})