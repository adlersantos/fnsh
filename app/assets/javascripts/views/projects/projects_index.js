BC.Views.ProjectsIndex = Backbone.View.extend({
  initialize: function () {
    var that = this;
    that.$el = $('div.projects');
  },

  events: {
    "click .project-link": "showProject",
    "click .create-project": "createProject",
    "click .edit-project": "editProject"
  },

  template: JST['projects/index'],

  editProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.EditProject({model: projectModel});
    $('.project').html(projectView.render().$el)
  },

  render: function () {
    var that = this;
    var projectsIndex = that.template({projects: that.collection});

    that.$el.html(projectsIndex);

    return that;
  },

  showProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.Project({model: projectModel});
    $('.project').html(projectView.render().$el);
  },

  createProject: function (event) {
    event.preventDefault();

    var projectForm = new BC.Views.CreateProject();
    $('.project').html(projectForm.render().$el);
  }
});
