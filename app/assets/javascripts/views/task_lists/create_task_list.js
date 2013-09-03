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

    var projectData = $('form.create-task-list').serialize();
    var projectID = BC.getID('.project-name', 'project');
    var project = BC.projects.get(projectID);

    $.ajax({
      url: '/projects/' + projectID,
      type: 'PUT',
      data: projectData,
      dataType: 'json',
      success: function (responseData) {
        console.log(responseData);
        project.fetch({
          success: function () {
            BC.regenerateProjectView(project);
          }
        });
      }
    });
  },

  render: function () {
    var createTaskListForm = this.template;
    this.$el.html(createTaskListForm);
    return this;
  }
});