require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @todo = todos(:one)
  end

  test "should get index" do
    get todos_url, as: :json
    assert_response :success
    json_response = JSON.parse(response.body, symbolize_names: true)
    assert_equal(2, json_response.length)
    assert_equal('Kill everyone', json_response[0][:content])
  end

  test "should create todo" do
    assert_difference('Todo.count') do
      post todos_url, params: { todo: { completed: @todo.completed, content: @todo.content } }, as: :json
    end
    assert_response 201
  end

  test "should show todo" do
    get todo_url(@todo), as: :json
    assert_response :success
    json_response = JSON.parse(response.body, symbolize_names: true)
    assert_equal('Go shopping', json_response[:content])
  end

  test "should update todo" do
    patch todo_url(@todo), params: { todo: { completed: @todo.completed, content: @todo.content } }, as: :json
    assert_response 200
  end

  test "should destroy todo" do
    assert_difference('Todo.count', -1) do
      delete todo_url(@todo), as: :json
    end
    assert_response 204
  end
end
