BC.Views.Comments = Backbone.View.extend({
  initialize: function () {
    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.collection, event, that.render);
    });
  },

  events: {
    "click button.create-comment": "createComment"
  },

  template: JST['tasks/comments'],

  createComment: function (event) {
    event.preventDefault();
    var commentData = $('form.create-comment').serializeJSON();
    var newComment = new BC.Models.Comment(commentData);

    var that = this;
    newComment.save(commentData, {
      success: function (responseData) {
        that.collection.add(responseData);
      }
    });
  },

  render: function () {
    var commentsTemplate = this.template({
      task: this.model,
      comments: this.collection
    });

    this.$el.html(commentsTemplate);
    return this;
  }
});