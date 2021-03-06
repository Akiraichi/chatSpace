require "rails_helper"

RSpec.describe Message, type: :model do
  describe "#create" do
    context "can seve" do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end
      it 'is valid with image' do
        expect(build(:message, content:  nil)).to be_valid
      end
      it 'is valid with image&content' do
        expect(build(:message)).to be_valid
      end
    end

    context "can not seve" do
      it 'is invalid with not image&content' do
        message=build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
      it 'is invalid with not group' do
        message=build(:message, group_id:nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it 'is invalid with not user_id' do
        message=build(:message, user_id:nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end