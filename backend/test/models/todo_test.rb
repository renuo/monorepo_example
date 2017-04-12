require 'test_helper'

class TodoTest < ActiveSupport::TestCase
  test "can be built with a content and a 'completed' attribute" do
    todo = Todo.new(content: 'Hello world', completed: false)
    assert todo.valid?, true
  end
end
