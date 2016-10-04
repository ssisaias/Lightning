//
// Route

app.router.addRoute('#/project', function(req, next){ 
  new ProjectsView().viewProjects();
})
.addRoute('#/project/:id_project', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new ProjectsView().viewProject(req.params.id_project);
})
.addRoute('#/project/:id_project/story/:id_story', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new StoriesView().viewStory(req.params.id_project, req.params.id_story);
})
.addRoute('#/project/:id_project/issues', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new IssuesView().viewIssues(req.params.id_project);
})
.addRoute('#/project/:id_project/issues/:id_issue', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new IssuesView().viewIssue(req.params.id_project, req.params.id_issue);
})
.addRoute('#/project/:id_project/kanban', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new KanbanView().viewKanban(req.params.id_project);
})
.addRoute('#/project/:id_project/sprint/:id_sprint', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new KanbanView().viewKanban(req.params.id_project, req.params.id_sprint);
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

// Preciso refatorar essa parte
// O router so pode dar .run() dps da sync get

$.get( "http://localhost:5000" ).done(function( data ) {
  
  if(data.length > 0){
    ret = (jQuery.parseJSON(data));
    $.each(ret, function( index, project ) {

      var f = new ProjectController().createProject(project.name, project.description, project.est_sprints);

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

