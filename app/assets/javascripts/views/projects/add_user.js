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

    projectData = $('form.add-user').serialize();
    projectID = BC.getID('.project-name', 'project');
    project = BC.projects.get(projectID);

    // if textbox is empty, then don't do ajax request
    if ($('input.project-user').html()) {
      console.log('empty string is still true');
    }

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