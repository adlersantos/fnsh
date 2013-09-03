BC.Views.AddUser = Backbone.View.extend({

  events: {
    "click button.add-user": "addUser",
    "click .cancel-add-user": "cancelAddUser"
  },

  template: JST['projects/add_user'],

  render: function () {
    var addUserForm = this.template;
    this.$el.html(addUserForm);
    return this;
  },

  addUser: function (event) {
    event.preventDefault();

    var projectData = $('form.add-user').serialize();
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

  cancelAddUser: function (event) {
    $('a.add-user').show();
    this.$el.hide();
  }
});