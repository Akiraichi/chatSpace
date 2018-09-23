json.array! @groups do |group|
  json.id group.id
  json.title group.title
  json.image group.image_url
  json.detail group.detail
end