BC.Collections.Users = Backbone.Collection.extend({
  model: BC.Models.User,
  url: '/users',
  comparator: function () {

  }
});