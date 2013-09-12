BC.Views.Subtasks = Backbone.View.extend({
  initialize: function () {
    this.task = this.model;
    this.subtasks = this.collection;

    var that = this;
    that.subtasks.each(function (subtask) {
      that['subtask' + subtask.get('id')] = new BC.Views.Subtask({model: subtask});
    });

    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.collection, event, that.render);
    });
  },

  events: {
    "click button.add-subtask": "addSubtask"
  },

  addSubtask: function (event) {
    event.preventDefault();
    var subtaskData = $('form.create-subtask').serializeJSON();
    var newSubtask = new BC.Models.Subtask(subtaskData);
    newSubtask.url = newSubtask.url(this.task.get('id'));

    debugger

    var that = this;
    newSubtask.save(subtaskData, {
      success: function (responseData) {
        that['subtask' + newSubtask.get('id')] = new BC.Views.Subtask({model: newSubtask});
        that['subtask' + newSubtask.get('id')].setElement(that.$('.subtask-' + newSubtask.get('id')));
        that.subtasks.add(responseData);
        that.$el.find('.put-add-subtask-form').trigger('click');
      },
      wait: true
    });
  },

  template: JST['subtasks/subtasks'],

  render: function (event) {
    var subtasksTemplate = this.template({
      task: this.model,
      subtasks: this.collection
    });

    this.$el.html(subtasksTemplate);

    var that = this;
    that.subtasks.each(function (subtask) {
      var id = subtask.get('id');
      that['subtask' + id].setElement(that.$('.subtask-' + id)).render();
    });

    return this;
  }
});