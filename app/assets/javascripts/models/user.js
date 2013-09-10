BC.Models.User = Backbone.Model.extend({
  url: function () {
    return '/users/' + this.get('id');
  }
});