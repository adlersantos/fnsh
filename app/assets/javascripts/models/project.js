BC.Models.Project = Backbone.Model.extend({
  parse: function (data) {
    var projectUsers = new BC.Collections.Users(data.users);
    data.users = projectUsers;
    return data;
  }
});