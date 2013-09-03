BC.Views.AddUser = Backbone.View.extend({

  template: JST['projects/add_user'],

  render: function () {
    var addUserForm = this.template;
    this.$el.html(addUserForm);
    return this;
  },
});