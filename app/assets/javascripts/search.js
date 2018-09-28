$(function () {
  var member_list = $("#chat-group-users");
  function appendMenber(group) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${group.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${group.id}" data-user-name="${group.name}">追加</a>
                </div>`;
    member_list.append(html);
}

  $(".chat-group-form__input").on("keyup", function () {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/groups/new',
      data: {
        keyword: input
      },
      dataType: 'json'
    })
      .done(function (groups) {
        $("#chat-group-users").empty();

        if (products.length !== 0) {
          groups.forEach(function (group) {
            appendMenber(group);
          });
        }
      })
      .fail(function () {
        alert('error');
      })

  });
});