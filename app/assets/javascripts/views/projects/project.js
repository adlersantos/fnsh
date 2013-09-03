BC.Views.Project = Backbone.View.extend({

  events: {
    "click .project-name": "renameProject",
    "click a.add-user": "addUser"
  },

  template: JST['projects/project'],

  addUser: function (event) {
    event.stopPropagation();

    var addUserForm = new BC.Views.AddUser();
    addUserForm = addUserForm.render().$el
    addUserForm.insertBefore('a.add-user');
    $('a.add-user').hide();
  },

  renameProject: function (event) {
    event.stopPropagation();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var editNameForm = new BC.Views.EditProject({model: projectModel});

    $('.project-name').hide()
    $('.project').prepend(editNameForm.render().$el)
  },

  render: function () {
    var projectTemplate = this.template({
      project: this.model,
      projectUsers: this.model.get('users')
    });

    this.$el.html(projectTemplate);
    return this;
  }
});