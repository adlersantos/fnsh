BC.Views.Project = Backbone.View.extend({
  initialize: function (opts) {
    this.project = opts['model'];

    var taskLists = new BC.Collections.TaskLists();
    taskLists.url = '/projects/' + this.project.get('id') + '/task_lists';
    this.taskLists = taskLists;
  },

  events: {
    "click .project-name": "renameProject",
    "click a.add-user": "putAddUserForm",
    "click a.put-task-list-form": "putCreateTaskListForm",
  },

  template: JST['projects/project'],

  putAddUserForm: function (event) {
    event.stopPropagation();

    var addUserForm = new BC.Views.AddUser();
    addUserForm = addUserForm.render().$el
    addUserForm.insertBefore('a.add-user');
    $('a.add-user').hide();
  },

  putCreateTaskListForm: function (event) {
    var createTaskListForm = new BC.Views.CreateTaskList({
      collection: this.taskLists
    });

    createTaskListForm = createTaskListForm.render().$el;
    createTaskListForm.insertBefore('a.put-task-list-form');
    $('a.put-task-list-form').hide();
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

    console.log('fetching tasks lists');
    this.taskLists.fetch({data: {project_id: this.project.get('id')}});

    var projectTemplate = this.template({
      project: this.model,
      projectUsers: this.model.get('users'),
      taskLists: this.taskLists
    });

    this.$el.append(projectTemplate);

    var taskListsView = new BC.Views.TaskList({
      model: this.model,
      collection: this.taskLists
    });

    this.$el.append(taskListsView.render().$el);

    return this;
  }
});