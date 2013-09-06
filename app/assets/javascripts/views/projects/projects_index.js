BC.Views.ProjectsIndex = Backbone.View.extend({
  initialize: function () {
    var that = this;
    that.$el = $('div.projects');

    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(BC.projects, event, that.render);
    });
  },

  events: {
    "click .project-link": "showProject",
    "click .create-project": "putCreateProjectForm",
    "click .edit-project": "putEditProjectForm",
    "click .delete-project": "deleteProject",
  },

  template: JST['projects/index'],

  deleteProject: function (event) {
    event.preventDefault();

    var projectID = parseInt(BC.getID(event.currentTarget, 'project'));

    var projectToDelete = this.collection.get(projectID);
    projectToDelete.destroy();

    $('.project').empty();
  },

  putEditProjectForm: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.EditProject({model: projectModel});
    $('.project').html(projectView.render().$el)
  },

  putCreateProjectForm: function (event) {
    event.preventDefault();

    var projectID = $('.project h2').attr('project-id');
    var project = BC.projects.get(projectID);

    var projectForm = new BC.Views.CreateProject({model: project});
    $('.project').html(projectForm.render().$el);
  },

  render: function () {
    var that = this;
    var projectsIndex = that.template({projects: that.collection});

    $('.projects').html(projectsIndex);

    return that;
  },

  showProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.Project({
      model: projectModel
    });

    $('ul.nav .active').toggleClass('active')
    $(event.currentTarget.parentElement).toggleClass('active');
    $('.project').html(projectView.render().$el);
  }
});
