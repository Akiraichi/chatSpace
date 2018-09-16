$(function () {
  $('.chatMain__footer--newMessage').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this); //フォームに入力された値をまとめて取得
    var url = $(this).attr('action'); //action属性にリンク先のURLがあるため
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});
