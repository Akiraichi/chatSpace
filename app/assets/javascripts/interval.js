var interval = setInterval(function () {
  function buildHTML(message) {

    var image_html = "";
    if (message.image_present) {
      image_html = `<img src="${message.image_url}">`;
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
                    ${image_html}
                  </div>
                </div>`;
    return html;
  };
  
  $.ajax({
    url: location.href.json,
  })
    .done(function (data) {
      var html = buildHTML(message);
      data.messages.forEach(function (message) {
        if (message.id > id) {
          $('.chatMain__body--list').append(html)
        }
      });
      $('.chatMain__body').animate({
        scrollTop: $('.chatMain__body')[0].scrollHeight
      }, 1000, 'swing');
  })
    .fail(function (data) {
      alert('自動更新に失敗しました');
   });
   
} , 5000);