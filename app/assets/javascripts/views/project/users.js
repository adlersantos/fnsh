BC.Views.Users = Backbone.View.extend({
  initialize: function () {
    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.collection, event, that.render);
    });
  },

  template: JST['project/users'],

  events: {
    "click a.put-add-user-form": "putAddUserForm",
    "click .cancel-add-user": "cancelAddUser",
    "click button.add-user": "addUser",
  },

  addUser: function (event) {
    event.preventDefault();

    var userProjectData = {};
    userProjectData.username = $('form.add-user input').val();
    userProjectData.project_id = this.model.get('id');

    var that = this;
    $.ajax({
      url: "/projects/" + this.model.get('id') + "/user_projects",
      type: "POST",
      dataType: "json",
      data: userProjectData,
      success: function (responseData) {
        var newProjectUser = new BC.Models.User(responseData);
        that.collection.add(newProjectUser);
      }
    });
  },

  cancelAddUser: function (event) {
    $('a.put-add-user-form').toggleClass('hidden');
    $('form.add-user').toggleClass('hidden');
  },

  putAddUserForm: function (event) {
    $('a.put-add-user-form').toggleClass('hidden');
    $('form.add-user').toggleClass('hidden');
  },

  render: function () {
    var usersTemplate = this.template({projectUsers: this.collection});
    this.$el.html(usersTemplate);
    return this;
  }
});