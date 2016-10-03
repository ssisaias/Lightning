
var app = {};
app.project_list = [];

var Base64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

//
// Sync

var Sync = function(){
  this.url = "http://localhost:5000";
}

Sync.prototype.Save = function(obj){
  $.post( this.url, JSON.stringify(app.project_list)).done(function( data ) {
    console.log(data);
  });
};


app.Sync = new Sync();

//=========================================================================================================

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
};

Sprint.prototype.addUserStory = function(story) {
  this.userstory_list.push(story.id_us);
};

Sprint.prototype.getDoneSprints = function(project) {

};
