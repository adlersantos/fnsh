Fnsh
===

Fnsh is a productivity app that's based on [Asana](http://asana.com). It's written in Ruby on Rails and Backbone.js. Almost everything in Fnsh is clickable; names and descriptions can be clicked for editing.

### Technologies Used 

* [Ruby on Rails](rubyonrails.org)
* [Backbone.js](backbonejs.org)
* [Postgres](postgresapp.com)
* [RABL](https://github.com/nesquena/rabl)
* [jQuery UI](jqueryui.com)
* [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker)
* [Heroku](heroku.com)
* [Sendgrid](sendgrid.com)
* [Paperclip](https://github.com/thoughtbot/paperclip)

### Demo

Check out the live demo [here](http://fnsh.herokuapp.com). Login with the following email and password:

```sh
email: fnsh@adlersantos.com
password: demo
```

Alternatively, you can run the app locally by cloning the repo and running the following in the command line (with Ruby, Rails, and Postgres set up):

```sh
$ git clone https://github.com/adlersantos/fnsh.git
$ cd fnsh
$ bundle install
$ rake db:migrate
$ rails s
```

Navigate to `localhost:3000` and enjoy! :)

### Projects

Projects are at the heart of Fnsh. You can add an optional description to each project. Each project can be treated as a super item that contains all other sub items. The sub items are as follows:

* ####Participants
A list of users collaborating on a project. A participant can be added if one knows the email address that the person is using to login to Fnsh.

* ####Task Lists
A task list is a category or group of tasks. Task lists can be renamed, deleted, and reordered via drag/drop.

* ####Tasks
A task is an item that can be completed. Just like task lists, tasks can be renamed, deleted, and reordered via drag/drop. Each task contains further information:

    * Description - contains what the task is all about.
    * Assignee - assign a participant that's responsible for the task.
    * Due Date - set a due date on when the task needs to be completed.
    * Subtasks - used when tasks can still be broken down into more detailed steps.
    * Comments - used to have discussions and clarifications regarding the said task

### To Do
Here are some of the things that I still haven't implemented:
* activation email
* archiving of completed tasks and subtasks
* password reset
* invite participants by email
* password confirmation upon signup
* validations and flash messages
* drag and drop to rearrange projects
* user avatars
* delete authored comments
