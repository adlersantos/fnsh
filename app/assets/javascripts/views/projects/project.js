BC.Views.Project = Backbone.View.extend({
  initialize: function () {
    this.project = this.model;
    this.projectUsers = this.project.get('users');
    this.taskLists = this.project.get('task_lists');

    this.projectUsersView = new BC.Views.Users({collection: this.projectUsers});
    this.taskListsView = new BC.Views.TaskLists({
      model: this.project,
      collection: this.taskLists
    });

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.model, event, that.render);
    });
  },

  template: JST['projects/project'],

  events: {
    "click .project-name": "renameProject",
    "click a.add-user": "putAddUserForm",
    "click .put-project-description-form": "putProjectDescriptionForm",
    "click .cancel-project-description": "cancelProjectDescription",
    "click .set-project-description": "setProjectDescription",
    "click p.project-description": "editProjectDescription"
  },

  cancelProjectDescription: function (event) {
    event.preventDefault();

    if (this.model.get('description')) {
      $('p.project-description').toggleClass('hidden');
      $('form.project-description').toggleClass('hidden');
    } else {
      $('.put-project-description-form').toggleClass('hidden');
      $('form.project-description').toggleClass('hidden');
    }
  },

  editProjectDescription: function (event) {
    $('p.project-description').toggleClass('hidden');
    $('form.project-description').toggleClass('hidden');
    $('form.project-description textarea').focus();
  },

  putAddUserForm: function (event) {
    event.stopPropagation();

    var addUserForm = new BC.Views.AddUser();
    addUserForm = addUserForm.render().$el
    addUserForm.insertBefore('a.add-user');
    $('a.add-user').hide();
  },

  putProjectDescriptionForm: function (event) {
    $('.put-project-description-form').toggleClass('hidden');
    $('form.project-description').toggleClass('hidden');
    $('form.project-description textarea').focus();
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
      project: this.model
    });

    this.$el.html(projectTemplate);
    this.projectUsersView.setElement(this.$('.project-users')).render();
    this.taskListsView.setElement(this.$('.task-lists-container')).render();

    return this;
  },

  setProjectDescription: function (event) {
    event.preventDefault();
    var projectData = $('form.project-description').serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(projectData, {wait: true});
  }
});