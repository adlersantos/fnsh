BC.Views.CreateTaskList = Backbone.View.extend({

  events: {
    "click button.cancel-create-task-list": "cancelCreateTaskList",
    "click button.create-task-list": "createTaskList"
  },

  template: JST['task_lists/create_task_list'],

  cancelCreateTaskList: function (event) {
    $('a.put-task-list-form').show();
    this.$el.hide();
  },

  createTaskList: function (event) {
    event.preventDefault();

    var taskListData = $('form.create-task-list').serializeJSON();

    this.collection.create(taskListData,{
      success: function (responseData) {
        console.log('TASK CREATED!');
        console.log(responseData);
      },
      wait: true
    });
    this.collection.fetch(function () {});
  },

  render: function () {
    var createTaskListForm = this.template;
    this.$el.html(createTaskListForm);
    return this;
  }
});