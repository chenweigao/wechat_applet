// pages/health/health.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: true,
    plain: false,
    loading: false,
    startDay: null,
    stopDay: null,
    startTime: null,
    stopTime: null,
    totalSleepTime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  start: function (e) {
    console.log(e)
    var date = new Date(e._relatedInfo.anchorTapTime)
    // console.log(date.toLocaleDateString())
    this.setData({ startDay: date.toLocaleDateString(), startTime: date.getTime() })
    console.log(this.data.startTime)

  },
  stop: function (e) {
    console.log(e)
    var date = new Date(e._relatedInfo.anchorTapTime)
    this.setData({ stopDay: date.toLocaleDateString(), stopTime: date.getTime() })
    console.log(this.data.stopTime)
    if (this.data.startTime == null || this.data.stopTime == null) {
      console.log("no time...")
    }
    else {
      var timeShift = (this.data.stopTime - this.data.startTime)
      var days = parseInt(timeShift / (1000 * 60 * 60 * 24))
      var hours = parseInt((timeShift % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((timeShift % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = (timeShift % (1000 * 60)) / 1000
      var sleepTime = hours + " hours " + minutes + " minutes " + seconds + " seconds"
      this.setData({ totalSleepTime: sleepTime })
      console.log(this.data.totalSleepTime)
    }
  },
  getSleepTime: function () {
    if (this.data.startTime == null || this.data.stopTime == null) {
      console.log("no time...")
    }
    else {
      var timeShift = (this.data.stopTime - this.data.startTime)
      var days = parseInt(timeShift / (1000 * 60 * 60 * 24))
      var hours = parseInt((timeShift % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((timeShift % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = (timeShift % (1000 * 60)) / 1000
      var sleepTime = hours + " hours " + minutes + " minutes " + seconds + " seconds"
      this.setData({ totalSleepTime: sleepTime })
      console.log(this.data.totalSleepTime)
    }
  }

})