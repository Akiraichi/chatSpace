$(function () {
  var member_list = $("#user-search-result");
  function appendMenber(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    member_list.append(html);
  };
  function appendChatMenber(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    $("#chat-group-users").append(html);
  };
  
  //追加ボタン
  $("#user-search-result").on("click", ".chat-group-user", function () {
    $(this).remove();
    var user_name = $("a", this).attr("data-user-name");
    var user_id = $("a", this).attr("data-user-id");
    appendChatMenber(user_name, user_id);
  });
  //削除ボタン
  $("#chat-group-users").on("click", ".chat-group-user", function () {
    $(this).remove();
  });
  
  $(".chat-group-form__input").on("keyup", function () {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {
        keyword: input
      },
      dataType: 'json'
    })
      .done(function (users) {
        member_list.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendMenber(user);
          });
        }
      })
      .fail(function () {
        alert('error');
      })

  });
});