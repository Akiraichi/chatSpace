if @new_messages.present?
  json.array!  @new_messages.each do |message|
  json.user_name  message.user.name
  json.content message.content
  json.image_url message.image.url
  json.content_present message.content.present?
  json.image_present message.image.present?
  json.created_at message.created_at
  json.id message.id
  end
end