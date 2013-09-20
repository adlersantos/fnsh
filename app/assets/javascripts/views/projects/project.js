BC.Views.Project = Backbone.View.extend({
  initialize: function () {
    this.project = this.model;

    this.projectUsers = this.project.get('users');
    BC.ProjectUsers = this.projectUsers;
    this.projectUsersView = new BC.Views.Users({
      model: this.project,
      collection: this.projectUsers
    });

    this.taskLists = this.project.get('task_lists');
    this.taskListsView = new BC.Views.TaskLists({
      model: this.project,
      collection: this.taskLists
    });

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.project, event, that.render);
    });
  },

  template: JST['projects/project'],

  events: {
    "click h1.project-name": "putRenameProjectForm",
    "click input.cancel-rename-project": "cancelRenameProject",
    "click input.rename-project": "renameProject",
    "click .put-project-description-form": "putProjectDescriptionForm",
    "click .cancel-project-description": "cancelProjectDescription",
    "click .set-project-description": "setProjectDescription",
    "click p.project-description": "editProjectDescription"
  },

  cancelProjectDescription: function (event) {
    event.preventDefault();

    if (this.model.get('description')) {
      $('p.project-description, form.project-description').toggleClass('hidden');
    } else {
      $('.put-project-description-form, form.project-description').toggleClass('hidden');
    }
  },

  cancelRenameProject: function (event) {
    $('h1.project-name, form.edit-project').toggleClass('hidden');
  },

  editProjectDescription: function (event) {
    $('p.project-description, form.project-description').toggleClass('hidden');
    $('form.project-description textarea').focus();
  },

  putProjectDescriptionForm: function (event) {
    $('.put-project-description-form, form.project-description').toggleClass('hidden');
    $('form.project-description textarea').focus();
  },

  putRenameProjectForm: function (event) {
    $('h1.project-name, form.edit-project').toggleClass('hidden');
    $('form.edit-project input.project-name').selectRange(100, 100);
  },

  renameProject: function (event) {
    event.preventDefault();

    var projectData = $('form.edit-project').serializeJSON();

    if (projectData['project'].name == "") {
      return;
    };

    this.model.url = '/projects/' + this.model.get('id');
    this.model.save(projectData, {wait: true});
    this.cancelRenameProject();
  },

  render: function () {
    var projectTemplate = this.template({
      project: this.project
    });

    this.$el.html(projectTemplate);
    this.projectUsersView.setElement(this.$('.project-users')).render();
    this.taskListsView.setElement(this.$('.task-lists-container')).render();

    return this;
  },

  setProjectDescription: function (event) {
    event.preventDefault();
    var projectData = $('form.project-description').serializeJSON();
    this.project.url = '/projects/' + this.project.get('id');
    this.project.save(projectData, {wait: true});
  }
});