$(function () {
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
    .done(function (message) {
        var html = buildHTML(message);
      })
      .fail(function () {
        alert('error');
      })

  });
});