$(function () {
  $('.chatMain__footer--newMessage').submit(function (e) {
    e.preventDefault();
    console.log(this)
  })
})