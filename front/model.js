//
// Model

var UserStory = function(subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type){
  
  if(subject != undefined || subject != null){
    this.id_us = Base64.encode(subject);
  }

  this.subject = subject;
  this.description = description;
  this.status = status;
  this.pt_ux = pt_ux;
  this.pt_design = pt_design;
  this.pt_front = pt_front;
  this.pt_back = pt_back;
  this.req_type = req_type;
  this.tasks = [];
};

UserStory.prototype.getPoints = function() {
  return parseFloat(this.pt_ux) + parseFloat(this.pt_design) + parseFloat(this.pt_front) + parseFloat(this.pt_back);
};

UserStory.prototype.getUserStories = function(project){
  return project.backlog;  
};

UserStory.prototype.getUserStory = function(project, id_us){
  var rt = undefined;
  $.each(project.backlog, function( index, value ) {
    if(value.id_us === id_us){
      rt = value;
    }
  });
  return rt;
}

//=========================================================================================================

var Project = function(name, description, est_sprints){
  
  if(name != undefined || name != null){
    this.id_project = Base64.encode(name);
  }

  this.name = name;
  this.description = description;
  this.issues = [];
  this.backlog = [];
  this.status_us =[];
  this.kanban = [];
  this.sprints = [];
  this.est_sprints = est_sprints;
};

Project.prototype.findProject = function(id_project){
  var rt = undefined;
  $.each(app.project_list, function( index, value ) {
    if(value.id_project === id_project){
      rt = value;
    }
  });
  return rt;
};

Project.prototype.getUSPoints = function(){
  var points = 0;
  $.each(this.backlog, function( index, value ) {
    points += value.getPoints();
  });
  return points;
};

Project.prototype.getUSCount = function(){
  return this.backlog.length;
};

Project.prototype.getIssueCount = function(){
  return this.issues.length;
};

Project.prototype.getUSDone = function(){
  var c = 0;
  $.each(this.backlog, function( index, value ) {
    if(value.status === "Done"){
      c++;
    }
  });
  return c;
}

//=========================================================================================================

var Issue = function(subject, description, type, severity, priority){
   if(subject != undefined || subject != null){
    this.id_issue = Base64.encode(subject);
  }

  this.subject = subject;
  this.description = description;
  this.type = type;
  this.severity = severity;
  this.priority = priority;
};

Issue.prototype.getIssues = function(project){
  return project.issues;  
};

Issue.prototype.getIssue = function(project, id_issue){
  var rt = undefined;
  $.each(project.issues, function( index, value ) {
    if(value.id_issue === id_issue){
      rt = value;
    }
  });
  return rt;
};

//=========================================================================================================

var Sprint = function(subject, date_start, date_finish_prog, status){

  if(subject != undefined || subject != null){
    this.id_name = Base64.encode(subject);
  }

  this.subject = subject;
  this.date_start = date_start;
  this.date_finish = date_finish;
  this.date_finish_prog = date_finish_prog;
  this.status = status;
  this.userstory_list = [];
  this.risks = [];
};

Sprint.prototype.addUserStory = function(story) {
  this.userstory_list.push(story.id_us);
};

Sprint.prototype.getDoneSprints = function(project) {
  var done = [];

  $.each(project.sprints, function( index, value ) {
    if(value.status === "Done"){
      done.append(value);
    }
  });

  return done;
};

Sprint.prototype.addRisk = function(risk){
  this.risks.append(risk);
};

//=========================================================================================================

var Risk = function(){
  this.type; //Business, Social, Tech, Cost N Schedule
  this.description;
  this.impact;  // (extreme, high, medium, low, negible)
  this.likehood; // probabilidade (almost certain, likely, moderate, ulikely, rare)
  this.status; // open closed, monitored 
  this.action;
};

Risk.prototype.getFactor = function(){

};