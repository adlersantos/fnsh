BC.Views.Users = Backbone.View.extend({

  template: JST['project/users'],

  render: function () {
    var usersTemplate = this.template({projectUsers: this.collection});
    this.$el.html(usersTemplate);
    return this;
  }
});