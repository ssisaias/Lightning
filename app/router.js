//
// Route

// Projects - Project (Charts)
  // > Issues - Issue   
  
  // Backlog - Story
  // Project Sprints - Sprint
  // Kanban  - Sprint

//------------------------------
  // x Project Risks - Risk
  // x Project Tasks - Task
  // x Kanban Tasks

// Processes - Process
  // Process Activities

application.router.addRoute('#/', function(req, next){ 
  new ProjectsView().viewProjects();
})
.addRoute('#/project/:id_project/issues', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new IssuesView().viewIssues(req.params.id_project);
})
.addRoute('#/project/:id_project/issues/:id_issue', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new IssuesView().viewIssue(req.params.id_project, req.params.id_issue);
})
.addRoute('#/project/:id_project', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new ProjectsView().viewProject(req.params.id_project);
})
.addRoute('#/project/:id_project/sprint/:id_sprint', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new KanbanView().viewKanban(req.params.id_project, req.params.id_sprint);
})
.addRoute('#/project/:id_project/story/:id_story', function(req, next){
  $(".projopt").html(top_proj_opt(req.params.id_project));
  new StoriesView().viewStory(req.params.id_project, req.params.id_story);
})
//.addRoute('#/process/:id_process/risks', function(req, next){})
//.addRoute('#/process/:id_process/risks/:id_risk', function(req, next){})
//.addRoute('#/process/:id_process', function(req, next){})
//.addRoute('#/process/:id_process/activity/:id_activity', function(req, next){})
//.addRoute('#/process/:id_process/tasks', function(req, next){ //Kanban })
//.addRoute('#/process/:id_process/tasks/:id_task', function(req, next){})
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

application.router.run();
