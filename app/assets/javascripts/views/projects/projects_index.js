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
    "click .create-project": "createProject",
    "click .edit-project": "editProject",
    "click .delete-project": "deleteProject",
  },

  template: JST['projects/index'],

  createProject: function (event) {
    event.preventDefault();

    var projectID = $('.project h2').attr('project-id');
    var project = BC.projects.get(projectID);

    var projectForm = new BC.Views.CreateProject({model: project});
    $('.project').html(projectForm.render().$el);
  },

  deleteProject: function (event) {
    event.preventDefault();

    var projectID = parseInt(BC.getID(event.currentTarget, 'project'));

    var projectToDelete = this.collection.get(projectID);
    projectToDelete.destroy();

    $('.project').empty();
  },

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

    $('.projects').html(projectsIndex);

    return that;
  },

  showProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var projectView = new BC.Views.Project({
      model: projectModel
      // taskLists: projectModel.get('task_lists')
    });
    $('.project').html(projectView.render().$el);
  }
});
