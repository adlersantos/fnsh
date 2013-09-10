BC.Routers.Projects = Backbone.Router.extend({

  initialize: function (el) {
    this.$el = $('.container');
  },

  routes: {
    '': 'index'
  },

  index: function () {
    var view = new BC.Views.ProjectsIndex({collection: BC.projects});

    this.$el.children('.projects').html(view.render().$el);
  }
});
