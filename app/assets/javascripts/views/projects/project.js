BC.Views.Project = Backbone.View.extend({

  events: {
    "click .project-name": "renameProject",
    "click a.add-user": "addUser",
    "click a.put-task-list-form": "putTaskListForm",
    "click .put-task-form": "putAddTaskForm"
  },

  template: JST['projects/project'],

  addUser: function (event) {
    event.stopPropagation();

    var addUserForm = new BC.Views.AddUser();
    addUserForm = addUserForm.render().$el
    addUserForm.insertBefore('a.add-user');
    $('a.add-user').hide();
  },

  putAddTaskForm: function (event) {
    var createTaskForm = new BC.Views.AddTask();
    createTaskForm = createTaskForm.render().$el;
    createTaskForm.insertBefore(event.currentTarget);
    $(event.currentTarget).hide();
  },

  putTaskListForm: function (event) {
    var createTaskListForm = new BC.Views.CreateTaskList();
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
    var projectTemplate = this.template({
      project: this.model,
      projectUsers: this.model.get('users'),
      taskLists: this.model.get('task_lists')
    });

    this.$el.append(projectTemplate);

    var taskListsView = new BC.Views.TaskList({
      collection: this.model.get('task_lists')
    });

    this.$el.append(taskListsView.render().$el);

    return this;
  }
});