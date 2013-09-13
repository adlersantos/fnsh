BC.Views.ProjectsIndex = Backbone.View.extend({
  initialize: function () {
    this.$el = $('div.projects');

    this.once('clickProject', function () {
      if (BC.current_user.get('project_view')) {
       $('a[project-id=' + BC.current_user.get('project_view') + ']').trigger('click')
      }
    });

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.collection, event, that.render);
    });
  },

  events: {
    "click .project-link": "showProject",
    "click .create-project": "putCreateProjectForm",
    "click .delete-project": "deleteProject",
  },

  template: JST['projects/index'],

  deleteProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');

    var projectToDelete = this.collection.get(projectID);
    projectToDelete.url = '/projects/' + projectToDelete.get('id');
    projectToDelete.destroy();

    $('.project').empty();
  },

  putCreateProjectForm: function (event) {
    event.preventDefault();

    var projectID = $('.project h2').attr('project-id');
    var project = BC.projects.get(projectID);

    var projectForm = new BC.Views.CreateProject({model: project});
    $('.project').html(projectForm.render().$el);
    $('.task-detail').empty();
  },

  render: function () {
    var projectsView = this.template({projects: this.collection});

    $('.projects').html(projectsView);

    if (this.selectedProject) {
      $('a[project-id=' + this.selectedProject + ']').parent().toggleClass('active')
    }

    this.trigger('clickProject');
    return this;
  },

  showProject: function (event) {
    event.preventDefault();

    var projectID = BC.getID(event.currentTarget, 'project');
    BC.current_user.save(
      {user: {project_view: projectID}}
    );
    this.selectedProject = projectID;

    var projectModel = BC.projects.get(projectID);
    var projectView = new BC.Views.Project({
      model: projectModel
    });

    $('ul.nav .active').toggleClass('active');
    $(event.currentTarget.parentElement).toggleClass('active');

    $('.task-detail').html("<div class='well sidebar-nav sidebar-nav-fixed' style='text-align:center; width:357px;'><h4 class='text-muted'>Select a task to view its details.</h4></div>");
    $('.project').html(projectView.render().$el);
  }
});
