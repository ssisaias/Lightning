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