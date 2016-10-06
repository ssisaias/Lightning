//
// Model

var Story = function(subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type){
  
  if(subject != undefined || subject != null){
    this.id_story = Base64.encode(subject);
  }

  this.subject = subject;
  this.description = description;
  this.status = status;
  this.pt_ux = pt_ux;
  this.pt_design = pt_design;
  this.pt_front = pt_front;
  this.pt_back = pt_back;
  this.req_type = req_type;
  //this.tasks = [];

  this.getPoints = function() {
    return parseFloat(this.pt_ux) + parseFloat(this.pt_design) + parseFloat(this.pt_front) + parseFloat(this.pt_back);
  };

  this.getUserStories = function(project){
    return project.backlog;  
  };

  this.getUserStory = function(project, id_story){
    var rt = undefined;
    $.each(project.backlog, function( index, value ) {
      if(value.id_story === id_story){
        rt = value;
      }
    });
    return rt;
  }

  this.changeStatus = function(status){
    this.status = status;
  };

};

//=========================================================================================================

var ProjectScrum = function(name, description, est_sprints){
  
  if(name != undefined || name != null){
    this.id_project = Base64.encode(name);
  }

  this.name = name;
  this.description = description;
  this.est_sprints = est_sprints;
  this.avg_point = 0;
  this.issues = new IssueCollection();
  this.sprints = new SprintCollection();
  this.backlog = new StoryCollection();
  //this.release = new Release(0, 0, 0);

};


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

  this.getIssues = function(project){
    return project.issues;  
  };

  this.getIssue = function(project, id_issue){
    var rt = undefined;
    $.each(project.issues, function( index, value ) {
      if(value.id_issue === id_issue){
        rt = value;
      }
    });
    return rt;
  };

  this.findProject = function(id_project){
    var rt = undefined;
    $.each(app.project_list, function( index, value ) {
      if(value.id_project === id_project){
        rt = value;
      }
    });
    return rt;
  };

  this.getUSPoints = function(){
    var points = 0;
    $.each(this.backlog, function( index, value ) {
      points += value.getPoints();
    });
    return points;
  };

  this.getUSCount = function(){
    return this.backlog.length;
  };

  this.getIssueCount = function(){
    return this.issues.length;
  };

  this.getUSDone = function(){
    var c = 0;
    $.each(this.backlog, function( index, value ) {
      if(value.status === "Done"){
        c++;
      }
    });
    return c;
  }

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
  this.backlog = new StoryCollection();
  //this.risks = [];

  this.addUserStory = function(story) {
    this.userstory_list.push(story.id_us);
  };

  this.getDoneSprints = function(project) {
    var done = [];

    $.each(project.sprints, function( index, value ) {
      if(value.status === "Done"){
        done.append(value);
      }
    });

    return done;
  };

  this.addRisk = function(risk){
    this.risks.append(risk);
  };

};

var project = new ProjectScrum("Teste", "Teste", 10);
application.projects.add(project);
console.log(application.projects.serialize());


//=========================================================================================================

/*
var Risk = function(){
  this.type; //Business, Social, Tech, Cost N Schedule
  this.description;
  this.impact;  // (extreme, high, medium, low, negible)
  this.likehood; // probabilidade (almost certain, likely, moderate, ulikely, rare)
  this.status; // open closed, monitored 
  this.action;

};

//=========================================================================================================

var Task = function(){
  this.status = ""; // Todo, doing, done
  this.subtasks = [];
};

//=========================================================================================================

var Release = function(){
  this.version;
  this.version_sprint;
  this.version_sprint_story;

  this.status;
  this.progresso;
  this.date_start;
  this.date_release;
};

//=========================================================================================================

var Process = function(){};
var ActivityCollection = function(){};
var Activity = function(){};

//=========================================================================================================

var Kanban = function(){};
var Table = function(){};
var Card = function(){};

*/


//
// Collection

var ProjectCollection = function(){
  this.projects = [];

  this.add = function(project){
    this.projects.push(project);
  };

  this.remove = function(id_project){
    $.each(this.projects, function( index_proj, project) {
      if(project.id_project === id_project){
        this.projects.splice(index_proj, 1);  
      }
    });
  };

  this.deserialize = function(object){
    var list = JSON.parse(object);
    $.each(list, function( index_proj, project) {
      
      if(project.issues != undefined){
        $.each(project.issues, function( index_proj, issue) { 
          //var issue = new Issue(subject, description, type, severity, priority);
        });
      }

      if(project.sprints != undefined){
        $.each(project.sprints, function( index_proj, sprint) { });
      }

      if(project.backlog != undefined){
        $.each(project.backlog, function( index_proj, backlog) { 
          //var story = new UserStory(subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type);
        });
      }
      
    });
  };

  this.serialize = function(){
    var list = [];
    $.each(this.projects, function( index_proj, project) {
      project.issues = project.issues.get();
      project.sprints = project.sprints.get();
      project.backlog = project.backlog.get();
      list.push(project);
    });
    return JSON.stringify(list);
  };
};

application.projects = new ProjectCollection();

var StoryCollection = function(){
  this.stories = [];

  this.add = function(story){
    this.stories.push(story);
  };

  this.remove = function(id_story){
    $.each(this.stories, function( index_s, story ) {
      if(story.id_story === id_story){
        this.stories.splice(index_s, 1);  
      }
    });
  };

  this.get = function(){
    return this.stories;
  };
}; 

var IssueCollection = function(){
  this.issues = [];

  this.add = function(issue){
    this.issues.push(issue);
  };

  this.remove = function(id_issue){
    $.each(this.issues, function( index_is, issue ) {
      if(issue.id_issue === id_issue){
        this.issues.splice(index_is, 1);  
      }
    });
  };

  this.get = function(){
    return this.issues;
  };
};

var SprintCollection = function(){
  this.sprints = [];

  this.add = function(sprint){
    this.sprints.push(sprint);
  };

  this.remove = function(id_sprint){
    $.each(this.sprints, function( index_s, sprint ) {
      if(sprint.id_sprint === id_sprint){
        this.issues.splice(index_s, 1);  
      }
    });
  };

  this.get = function(){
    return this.sprints;
  };
};
