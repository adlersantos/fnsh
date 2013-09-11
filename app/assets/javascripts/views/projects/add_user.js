BC.Views.AddUser = Backbone.View.extend({

  events: {
    "click button.add-user": "addUser",
  },

  template: JST['projects/add_user'],

  render: function () {
    var addUserForm = this.template;
    this.$el.html(addUserForm);
    return this;
  },

  cancelAddUser: function (event) {
    $('a.add-user').show();
    this.$el.hide();
  }
});