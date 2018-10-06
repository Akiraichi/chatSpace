if @new_messages.present?
  json.array!  @new_messages.each do |message|
    json.user_name  message.user.name
    json.content message.content
    json.image message.image
    json.created_at message.created_at
    json.id message.id
  end
end