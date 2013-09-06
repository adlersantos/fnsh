window.BC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    BC.projects = new BC.Collections.Projects();
    BC.tasks = new BC.Collections.Tasks();
    BC.tasks.url = '/tasks/';

    BC.tasks.fetch();

    BC.projects.fetch({
      success: function () {
        var projectsRouter = new BC.Routers.Projects();
        Backbone.history.start();
      }
    });
  },

  getID: function (target, objectString) {
    var id = $(target).attr(objectString + '-id');
    return id;
  },

  regenerateProjectView: function (param) {
    if (param instanceof Backbone.Model) {

      var projectModel = BC.projects.get(param.get('id'));
      var projectView = new BC.Views.Project({
        model: projectModel,
      });
      $('.project').html(projectView.render().$el);

    } else if (param instanceof jQuery.Event) {

      var projectID = BC.getID(param.currentTarget, 'project');
      var projectModel = BC.projects.get(projectID);
      var projectView = new BC.Views.Project({
        model: projectModel
      });
      $('.project').html(projectView.render().$el)

    } else if (typeof(param) === "undefined") {

      $('.project').empty();

    }
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

  BC.initialize();
});
