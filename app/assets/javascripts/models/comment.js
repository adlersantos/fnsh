BC.Models.Comment = Backbone.Model.extend({
  url: '/comments/',

  urlRoot: function (taskID) {
    return '/tasks/' + taskID + '/comments';
  }
});