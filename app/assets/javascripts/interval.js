var interval = setInterval(function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    
    function buildHTML(message) {
      var image_html = "";
      if (message.image_present) {
        image_html = `<img src="${message.image_url}">`;
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
    if ($('.chatMain__body--list--message')[0]){
      var message_id = $('.chatMain__body--list--message').last().data('message-id');
    } else {
      var message_id = 0;
    }
    $.ajax({
      url: window.location.href,
      type: 'GET',
      data: { 
        id: message_id 
      },
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        debugger;
        $.each(data, function (i, data) { //'data'を'data'に代入してeachで回す
          debugger;
          var html = buildHTML(data.message);
          $('.chatMain__body--list').append(html);
        });
        // data.messages.forEach(function (message) {
        //   var html = buildHTML(message);
        //   $('.chatMain__body--list').append(html);
        // });
        $('.chatMain__body').animate({
          scrollTop: $('.chatMain__body')[0].scrollHeight
        }, 1000, 'swing');
      })
      .fail(function (data) {
        //alert('自動更新に失敗しました');
      });
  } else {
    clearInterval(interval);
  }
} , 5000);