BC.Collections.TaskLists = Backbone.Collection.extend({
  model: BC.Models.TaskList,

  url: '/task_lists/',

  comparator: function (taskList) {
    return taskList.get('position');
  }
})