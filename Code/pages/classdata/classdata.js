Page({
  data: {
  class_name:'',
  class_id:'',
  listData:[
      {'num':'','name':'','beizhu':''}
  ]
  },
  onLoad: function (options) {
  this.setData({
      class_name:options.class_name,
      class_id:options.class_id
    })
  this.get_class_info();
    
  },
  

  get_class_info(){
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: 'http://39.99.142.253:5000/get_class_info',
      method:'post',
      data:{
          'class_name':this.data.class_name,
          'class_id':this.data.class_id,
          'openid': openid
      },
      success:res=>{
        if(res.data.code == 0){
          wx.showToast({
            title: '班级信息加载成功',
            icon:'none'
          });
          this.setData({
            listData:res.data.data
          })
        }
      }
    })
  }
 })