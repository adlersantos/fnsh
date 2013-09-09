BC.Views.ProjectsIndex = Backbone.View.extend({
  initialize: function () {
    this.$el = $('div.projects');

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.collection, event, that.render);
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
    var projectsView = this.template({projects: this.collection});

    $('.projects').html(projectsView);

    if (this.selectedProject) {
      $('a[project-id=' + this.selectedProject + ']').parent().toggleClass('active')
    }

    return this;
  },

  showProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    this.selectedProject = projectID;

    var projectModel = BC.projects.get(projectID);
    var projectView = new BC.Views.Project({
      model: projectModel
    });

    $('ul.nav .active').toggleClass('active');
    $(event.currentTarget.parentElement).toggleClass('active');

    $('.task-detail').html('<h4>Select a task to view its details.</h4>');
    $('.project').html(projectView.render().$el);
  }
});
