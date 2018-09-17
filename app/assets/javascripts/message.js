$(function () {
  function buildHTML(message) {
    var html = `<div class='chatMain__body--list--message'>
                  <div class='chatMain__body--list--message--name'>
                  ${message.user_name}
                  </div>
                  <div class='chatMain__body--list--message--time'>
                  ${message.created_at}</div>
                  <div class='chatMain__body--list--message--text'>`;
    debugger;
    if (message.content_present) {
      html += `<p>${message.content}</p>`;
      debugger;
    }
    html += `</div></div>`;
                  
                  // <p>${message.content}</p>
                  // </div>
                  // </div>

                //    <% if ${message.content_present}? %>
                //       <p>${message.content}</p>
                //    <%= image_tag ${message.image_url}  if ${message.image_present}? %>
                //   </div>
                // </div>`
    return html;
  };

  //   var html = `.chatMain__body--list--message
  //                 .chatMain__body--list--message--name
  //                   = ${message.user_name}
  //                 .chatMain__body--list--message--time
  //                   = format_posted_time(${message.created_at})
  //                 .chatMain__body--list--message--text
  //                   - if ${message.content_present}?
  //                     %p
  //                       = ${message.content}
  //                   = image_tag ${message.image_url}  if ${message.image_present}?`

  //   return html;
  // }

  $('.chatMain__footer--newMessage').submit(function (e) {
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
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        $(".chatMain__footer--newMessage--submit").removeAttr("disabled");
      });
  });
});