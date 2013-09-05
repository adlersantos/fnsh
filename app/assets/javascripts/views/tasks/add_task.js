BC.Views.AddTask = Backbone.View.extend({

  events: {
    "click .add-task": "createTask"
  },

  template: JST['tasks/add_task'],

  createTask: function () {
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
    var addTaskForm = this.template;
    this.$el.html(addTaskForm);
    return this;
  }
});