/*
 * 
 * WordPres版微信小程序
 * Original author: jianbo
 * Secondary development：蜷缩的蜗牛 www.alongparty.cn
 * 技术支持微信号：蜷缩的蜗牛
 * 开源协议：MIT
 * Copyright (c) 2017 https://www.alongparty.cn All rights reserved.
 */

const ald = require('./utils/ald-stat.js')
var push = require('./utils/pushsdk.js');

App({
    
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

      // 登录
      wx.login({
          success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
      })
      // 获取用户信息
      wx.getSetting({
          success: res => {
              if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                      success: res => {
                          // 可以将 res 发送给后台解码出 unionId
                          this.globalData.musicuserInfo = res.userInfo

                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                              this.userInfoReadyCallback(res)
                          }
                      }
                  })
              }
          }
      })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData:{
    userInfo:null,
    openid:'',
    isGetUserInfo:true,
    isGetOpenid:false,
      musicuserInfo: {},
      index: '',
      backgroundAudioManager: '',
      playList: {},
      loop: false,
      oneloop: true,
      random: true,
      //url: 'https://musicapi.leanapp.cn//',
      url: 'https://music.alongparty.cn/'

  }
})