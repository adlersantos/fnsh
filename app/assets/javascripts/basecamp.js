window.BC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(current_user) {
    BC.current_user = new BC.Models.User(current_user);
    BC.projects = new BC.Collections.Projects();
    BC.tasks = new BC.Collections.Tasks();
    BC.tasks.url = '/tasks/';

    BC.tasks.fetch();

    BC.projects.fetch({
      success: function () {
        var projectsRouter = new BC.Routers.Projects();
        Backbone.history.start();
      },
      wait: true
    });
  },

  getID: function (target, objectString) {
    var id = $(target).attr(objectString + '-id');
    return id;
  }
};

$(document).ready(function(){
  $.fn.selectRange = function(start, end) {
    return this.each(function() {
      if (this.setSelectionRange) {
        this.focus();
        this.setSelectionRange(start, end);
      } else if (this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    });
  };
});
