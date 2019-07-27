const previewSwiperImage = (current, swiperList, success=()=>{}) => {
  const urls = [];
  swiperList.forEach((currentValue) => {
    urls[urls.length] = currentValue.image
  })
  wx.previewImage({
    current,
    urls,
    success: (res) => {
      success()
    },
    fail: (res) => {},
  })
}
module.exports = {
  previewSwiperImage
}
