$(function () {
  function buildHTML(message) {

    var image_html = "";
    if (message.image_present) {
      image_html = `  <img src="${message.image_url}">`;
    }
    
    var html = `<div class='chatMain__body--list--message'>
                  <div class='chatMain__body--list--message--name'>
                    ${message.user_name}
                  </div>
                  <div class='chatMain__body--list--message--time'>
                    ${message.created_at}
                  </div>
                  <div class='chatMain__body--list--message--text'>
                    <p>${message.content}</p>
                    ${image_html}</div></div>`;
    return html;
  };

  $('#chatMain__footer--newMessage').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this); //フォームに入力された値をまとめて取得
    var url = $(this).attr('action'); //action属性にリンク先のURLがあるため
    var href = window.location.href;
    $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function (message) {
        var html = buildHTML(message);
        $('.chatMain__body--list').append(html)
        $('#messageBody').val('')
        $('.chatMain__body').animate({
          scrollTop: $('.chatMain__body')[0].scrollHeight
        }, 1000, 'swing');
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        $(".chatMain__footer--newMessage--submit").removeAttr("disabled");
      });
  });
});