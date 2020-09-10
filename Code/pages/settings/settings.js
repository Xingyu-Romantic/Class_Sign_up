const common = require('../../utils/common');
const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    elevatorFlag: 0,
    nameValue: '',
    phoneValue: '',
    region: ["省", "市", "区"],
    regionFlag: 1,
    textareaValue: '',
    floorValue: 0,
    remarksValue: '',
    addressStatus: 0,
    userID: 0
  },
  onLoad: function () {
    let self = this;
    this.setData({ userID: app.globalData.userID });
  },
  changeIconStatu: function () {
    var self = this;
    this.setData({ elevatorFlag: !self.data.elevatorFlag });
  },
  getNameValue: function (e) {
    this.setData({ nameValue: e.detail.value });
  },
  getPhoneValue: function (e) {
    this.setData({ phoneValue: e.detail.value });
  },
  bindRegionChange: function (e) {
    this.setData({ region: e.detail.value, regionFlag: 0 });
  },
  getTextareaValue: function (e) {
    this.setData({ textareaValue: e.detail.value });
  },
  getFloorValue: function (e) {
    this.setData({ floorValue: e.detail.value });
  },
  getRemarksValue: function (e) {
    this.setData({ remarksValue: e.detail.value });
  },
  defaultChange: function (e) {
    if (e.detail.value) {
      this.setData({ addressStatus: 1 });
    } else {
      this.setData({ addressStatus: 0 });
    }
  },
  saveNewAddress: function () {
    let self = this,
      regionFlag = self.data.regionFlag,
      addressStatus = self.data.addressStatus,
      region = self.data.region,
      str = '';
    for (let i = 0, len = region.length; i < len; i++) {
      if (region[i].length == 1) { region[i] = region[i - 1]; }
      str += region[i] + ' ';
    }
    let byUrl = api.INTERFACES.findByAddress, byData = { areaName: str };
    if (!common.ISNAME(self.data.nameValue)) {
      common.SHOWTIPS('请输入真实的姓名', 'none'); return;
    } else if (!common.ISPHONE(self.data.phoneValue)) {
      common.SHOWTIPS('请输入正确的11位手机号码', 'none'); return;
    } else if (self.data.regionFlag) {
      common.SHOWTIPS('请选择省市区', 'none'); return;
    } else if (!self.data.textareaValue) {
      common.SHOWTIPS('请输入详细地址', 'none'); return;
    } else if (!self.data.floorValue) {
      common.SHOWTIPS('请输入楼层号', 'none'); return;
    }
  }
});