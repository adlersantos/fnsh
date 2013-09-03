BC.Views.Project = Backbone.View.extend({
  events: {
    "click .project-name": "editProjectName",
  },

  template: JST['projects/project'],

  editProjectName: function (event) {
    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.EditProject({model: projectModel});
    $('.project').html(projectView.render().$el)
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