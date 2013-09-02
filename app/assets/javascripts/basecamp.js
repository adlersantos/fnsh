window.BC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    BC.projects = new BC.Collections.Projects();

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
  }
};

$(document).ready(function(){
  BC.initialize();
});
