// pages/health/health.js
var app = getApp()
wx.cloud.init({
  env: 'tencent-c-9d0b3f'
})
const db = wx.cloud.database()
const now = new Date()

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
    totalSleepTime: null,
    cloudSleepData: null,
    startTimeString: null,
    sleepFormated: null,
    scrollTop: 10
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

  loadHistory: function () {
    const _ = db.command
    db.collection('sleep').where({
      totalSleepMinutes: _.gte(600)
    }).limit(10).
      get().then(res => {
        console.log(res.data)
        this.setData({
          cloudSleepData: res.data
        })
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    db.collection('sleep').where({
    }).limit(10).
      get().then(res => {
        console.log(res.data)
        this.setData({
          cloudSleepData: res.data
        })
      })
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
    console.log(date.toString())
    var y = date.getFullYear()
    var m = (date.getMonth() + 1).toString().padStart(2, '0')
    var d = date.getDate().toString().padStart(2, '0')
    var hh = date.getHours().toString().padStart(2, '0')
    var mm = date.getMinutes().toString().padStart(2, '0')
    var ss = date.getSeconds().toString().padStart(2, '0')
    var formattedTime = y + "-" + m + '-' + d + " " + hh + ":" + mm
    console.log(formattedTime)
    this.setData({
      startDay: date.toLocaleDateString(),
      startTime: date.getTime(),
      startTimeString: formattedTime,
      totalSleepTime: "Sleeping...",
      sleepFormated: "Sleeping..."
    })
    console.log(this.data.startDay)


  },
  stop: function (e) {
    // console.log(e)
    var date = new Date(e._relatedInfo.anchorTapTime)
    this.setData({
      stopDay: date.toLocaleDateString(),
      stopTime: date.getTime()
    })
    console.log(this.data.stopTime)
    if (this.data.startTime == null || this.data.stopTime == null) {
      console.log("no time...")
    } else {
      var timeShift = (this.data.stopTime - this.data.startTime)
      var days = parseInt(timeShift / (1000 * 60 * 60 * 24))
      var hours = parseInt((timeShift % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((timeShift % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = (timeShift % (1000 * 60)) / 1000
      var sleepTime = hours.toString().padStart(2, '0') + "(h)" + minutes.toString().padStart(2, '0') + "(m)" + seconds.toString().padStart(2, '0') + "(s)"
      var sleepMinutes = timeShift / 1000
      this.setData({
        totalSleepTime: sleepTime,
        totalSleepMinutes: sleepMinutes
      })
      db.collection('sleep').add({
        data: {
          startDay: this.data.startDay,
          startTimeString: this.data.startTimeString,
          totalSleepTime: this.data.totalSleepTime,
          totalSleepMinutes: this.data.totalSleepMinutes
        }
      }).then(res => {
        // console.log(res)
      })
      db.collection('sleep').where({
        startDay: this.data.startDay
      }).
        get().then(res => {
          console.log(res.data)
          var sum = 0
          for (let i = 0; i < res.data.length; i++) {
            sum += res.data[i].totalSleepMinutes
          }
          var minuteTime = 0
          var hourTime = 0
          var secondTime = parseInt(sum)
          if (secondTime > 60) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if (minuteTime > 60) {
              hourTime = parseInt(minuteTime / 60);
              minuteTime = parseInt(minuteTime % 60);
            }
          }
          var sleepComputedMinutes = (sum / 60).toFixed(2)
          var sleepComputedSeconds = sum % 60
          var sleepFormated = hourTime + "小时" + minuteTime + "分钟" + secondTime + "秒"
          this.setData({
            cloudSleepData: res.data,
            sleepFormated: sleepFormated
          })
        })
      // console.log(this.data.cloudSleepData)
      // for (let i = 0; i < this.data.cloudSleepData)
      // console.log(this.data.totalSleepMinutes)
    }
  }


})