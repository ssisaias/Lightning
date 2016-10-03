//
// Controller

StoryController.prototype.createStory = function(id_project, subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type){
  var project = new Project().findProject(id_project);
  var story = new UserStory(subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type);
  project.backlog.push(story);
  return story;
};

IssueController.prototype.createIssue = function(id_project, subject, description, type, severity, priority){
  var project = new Project().findProject(id_project);
  var issue = new Issue(subject, description, type, severity, priority);
  project.issues.push(issue);
  return issue;
};

IssueController.prototype.deleteIssue = function(id_issue){
  $.each(app.project_list, function( index, project ) {
    $.each(project.issues, function( index_is, issue ) {
      if(issue.id_issue === id_issue || issue.type === undefined){
        console.log("Deletou");
        app.project_list[index].issues.splice(index_is, 1);  
      }
    });
  });
};

ProjectController.prototype.createProject = function(name, description, sprints){
  var project = new Project(name, description, sprints);
  app.project_list.push(project);
  return project;
};

ProjectController.prototype.viewProject = function(id_project){
  var project = new Project().findProject(id_project);
  var backlog = new UserStory().getUserStories(project);
  new ProjectsView().render_project(project, backlog);
};

StoryController.prototype.viewStory = function(id_project, id_story){
  var project = new Project().findProject(id_project);
  var story = new UserStory().getUserStory(project, id_story);
  new StoriesView().render_story(story);
};

IssueController.prototype.viewIssue = function(id_project, id_issue){
  var project = new Project().findProject(id_project);
  var issue = new Issue().getIssue(project, id_issue);
  new IssuesView().render_issue(issue);
};

ProjectController.prototype.viewProjects = function(){
  new ProjectsView().render_projects(app.project_list);
};

IssueController.prototype.viewIssues = function(id_project){
  console.log(id_project);
  var project = new Project().findProject(id_project);
  var issues = new Issue().getIssues(project);
  console.log(issues);
  new IssuesView().render_issues(issues, project);
};

KanbanController.prototype.viewKanbanProject = function(id_project){
  var project = new Project().findProject(id_project);
  new KanbanView().render_kanban(project.backlog, project);
};

KanbanController.prototype.viewKanbanSprint = function(id_project){
  var project = new Project().findProject(id_project);

  //get sprints do projeto

  new KanbanView().render_kanban(project.backlog);
};

//
// Route

app.router = new Router()
.addRoute('#/project', function(req, next){ 
  new ProjectController().viewProjects();
})
.addRoute('#/project/:id_project', function(req, next){
  new ProjectController().viewProject(req.params.id_project);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.addRoute('#/project/:id_project/story/:id_story', function(req, next){
  new StoryController().viewStory(req.params.id_project, req.params.id_story);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.addRoute('#/project/:id_project/issues', function(req, next){
  new IssueController().viewIssues(req.params.id_project);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.addRoute('#/project/:id_project/issues/:id_issue', function(req, next){
  new IssueController().viewIssue(req.params.id_project, req.params.id_issue);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.addRoute('#/project/:id_project/kanban', function(req, next){
  new KanbanController().viewKanbanProject(req.params.id_project);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.addRoute('#/project/:id_project/sprint/:id_sprint', function(req, next){
  new KanbanController().viewKanbanSprint(req.params.id_project);
  $(".projopt").html(top_proj_opt(req.params.id_project));
})
.errors(404,function(){
  console.group();
  console.warn('404',arguments);
  console.groupEnd();
})     
.errors(500,function(){
  console.group();
  console.error('500',arguments);
  console.groupEnd();
});


$.get( "http://localhost:5000" ).done(function( data ) {
  console.log(data.length);
  if(data.length > 0){
    ret = (jQuery.parseJSON(data));
    $.each(ret, function( index, project ) {

      var f = new ProjectController().createProject(project.name, project.description, project.est_sprints);
      console.log(f);

      $.each(project.backlog, function( index, story ) { 
        new StoryController().createStory(project.id_project, story.subject, story.description, story.status, story.pt_ux, story.pt_design, story.pt_front, story.pt_back, story.req_type);
      });

      $.each(project.issues, function( index, issue ) { 
        new IssueController().createIssue(project.id_project, issue.subject, issue.description, issue.type, issue.severity, issue.priority);
      });

    });
  }

  app.router.run();
});

setInterval(function(){ app.Sync.Save() }, 5000);

