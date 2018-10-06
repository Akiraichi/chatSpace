var interval = setInterval(function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    
    function buildHTML(message) {
      var image_html = "";
      debugger;
      if (message.image["url"]) {
        image_html = `<img src="${message.image.url}">`;
      }
      var html = `<div class='chatMain__body--list--message' data-message-id = "${message.id}">
                    <div class='chatMain__body--list--message--name'>
                      ${message.user_name}
                    </div>
                    <div class='chatMain__body--list--message--time'>
                      ${message.created_at}
                    </div>
                    <div class='chatMain__body--list--message--text'>
                      <p>${message.content}</p>
                      ${image_html}
                    </div>
                  </div>`;
      return html;
    };
    var message_id = 0;
    if ($('.chatMain__body--list--message')[0]){
      message_id = $('.chatMain__body--list--message').last().data('message-id');
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: (`id=${message_id}`),
      dataType: 'json',
      processData: false
    })
      .done(function (data) {
        $.each(data, function (i, data) { //'data'を'data'に代入してeachで回す
          var html = buildHTML(data);
          $('.chatMain__body--list').append(html);
        });
        $('.chatMain__body').animate({
          scrollTop: $('.chatMain__body')[0].scrollHeight
        }, 1000, 'swing');
      })
      .fail(function (data) {
        alert('自動更新に失敗しました');
      });
  } else {
    clearInterval(interval);
  }
} , 5000);