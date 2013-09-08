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
  },

  events: {
    "click .project-name": "renameProject",
    "click a.add-user": "putAddUserForm",
  },

  putAddUserForm: function (event) {
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
      project: this.model
    });

    this.$el.html(projectTemplate);
    this.projectUsersView.setElement(this.$('.project-users')).render();
    this.taskListsView.setElement(this.$('.task-lists-container')).render();

    // console.log('fetching tasks lists');
    // this.taskLists.fetch({data: {project_id: this.project.get('id')}});

    // var taskListsView = new BC.Views.TaskList({
    //   model: this.model,
    //   collection: this.taskLists
    // });

    // this.$el.append(taskListsView.render().$el);

    return this;
  },

  template: JST['projects/project']

});