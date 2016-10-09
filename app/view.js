//
// View

// https://github.com/janl/mustache.js

function top_proj_opt(id_proj){ 
  ht = '<li><a href="#/project/'+id_proj+'">Dashboard n\' Backlog</a></li> \
        <li><a href="#/project/'+id_proj+'/tasks">Tasks</a></li> \
        <li><a href="#/project/'+id_proj+'/sprint">Sprints</a></li> \
        <li><a href="#/project/'+id_proj+'/risks">Risks</a></li> \
        <li><a href="#/project/'+id_proj+'/issues">Issues</a></li> \
        <li><a href="#/project/'+id_proj+'/releases">Releases</a></li> \
        <li><a href="#/project/'+id_proj+'/canvas">Canvas Plan</a></li> \
        <li><a href="#/project/'+id_proj+'/wiki">Project Wiki</a></li> ';
  return ht;
}

function draggableInit() {
    var sourceId;

    $('[draggable=true]').bind('dragstart', function (event) {
        sourceId = $(this).parent().attr('id');
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    });

    $('.panel-body').bind('dragover', function (event) {
        event.preventDefault();
    });

    $('.panel-body').bind('drop', function (event) {
      var children = $(this).children();
      var targetId = children.attr('id');

      if (sourceId != targetId) {
        var elementId = event.originalEvent.dataTransfer.getData("text/plain");

        $('#processing-modal').modal('toggle'); //before post 
          setTimeout(function () {
            var element = document.getElementById(elementId);
            children.prepend(element);
            $('#processing-modal').modal('toggle'); // after post
          }, 1000);
        }

        event.preventDefault();
    });
}

function dragndrop_sprint(){
  var sourceId;

    $('[draggable=true]').bind('dragstart', function (event) {
        sourceId = $(this).parent().attr('id');
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    });

    $('.sprintitemsdroparea').bind('dragover', function (event) {
        event.preventDefault();
    });

    $('.sprintitemsdroparea').bind('drop', function (event) {
      var children = $(this).children();
      var targetId = children.attr('id');
      console.log(children);

      if (sourceId != targetId) {
        var elementId = event.originalEvent.dataTransfer.getData("text/plain");
        var element = document.getElementById(elementId);
        children.prepend(element);
      }

        event.preventDefault();
    });
}

//=========================================================================================================

ProjectsView.prototype.viewProject = function(id_project){

  

  var project = application.projects.findProject(id_project);
  var backlog = project.backlog.get();

  //if(this instanceof Story || this instanceof Issue){}

  var view = {
    "backlog" : backlog,
    "column1": function(){ 
      return this.subject;
    },
    "column2": function(){ 
      return this.description;
    },
    "column3": function(){ 
      if(this instanceof Story){
        return 'Total de pontos';
      }
      if(this instanceof Issue){
        return this.type + ' - ' + this.status;
      }
    },
    "column4": function(){ 
      if(this instanceof Story){
        return this.pt_ux + ' ' + this.pt_design + ' ' + this.pt_front + ' ' + this.pt_back;
      }
      if(this instanceof Issue){
        return this.severity;
      } 
    },
    "column5": function(){ 
      if(this instanceof Story){
        return this.status;
      }
      if(this instanceof Issue){
        return this.priority;
      }  
    },
    "column6": function(){ return 0; },
  };

  var template = $('#template_viewscrumproject').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, view);
  $('#container').html(rendered);
  
  var pontos_projeto = project.getUSPoints(); // Pontuação total do projeto
  var est_sprints = project["est_sprints"];
  var media_pontos_sprint = pontos_projeto / est_sprints;

  var data =  {
      labels: [],
      datasets: [
        {
          label: 'Future Sprints',
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          data: []
        }
      ]
  };

  for(i = 1; i <= est_sprints+1; i++){
    data.labels.push("Sprint " +i);
  }

  for(i = 1; i <= est_sprints+1; i++){
    data.datasets[0].data.push(pontos_projeto-media_pontos_sprint*i + media_pontos_sprint);
  }

   $('#sprintchart').css('background-color', 'rgba(0, 0, 0, 0)');
  $('#riskchart').css('background-color', 'rgba(0, 0, 0, 0)');

  var ctx = document.getElementById("sprintchart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'line',
    options: {
        maintainAspectRatio: false,
        responsive: false
    },
    data: data
  });
  ctx.fillStyle='white';


    var data_risk =  {
      labels: [],
      datasets: [
        {
          label: 'Risks',
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          data: []
        }
      ]
  };

  for(i = 1; i <= est_sprints+1; i++){
    data_risk.labels.push("Sprint " +i);
  }

  var ctx2 = document.getElementById("riskchart").getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: 'line',
    options: {
        maintainAspectRatio: false,
        responsive: false
    },
    data: data_risk
  });
  

  dragndrop_sprint();

};

ProjectsView.prototype.viewProjects = function() {
  
  var view = {
    "projects" : application.projects.projects,
    "id": function(){
      return this.id_project;
    },
    "progress": function () {
      if(this.getUSCount() == 0 || this.getUSDone() == 0){
        return (this.getUSCount() / this.getUSDone()) * 100;
      }
      return 0;
    }, 
    "name": function () {
      return this.name;
    }, 
    "story_count": function () {
      return this.getUSCount();
    }, 
    "issue_count": function () {
      return this.getIssueCount();
    }  
  };

  var template = $('#template_viewprojects').html();
  Mustache.parse(template);   
  var rendered = Mustache.render(template, view);
  $('#container').html(rendered);
};    

//=========================================================================================================

StoriesView.prototype.viewStory = function(id_project, id_story){

	var project = new Project().findProject(id_project);
  var story = new UserStory().getUserStory(project, id_story);

  var template = $('#template_').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#container').html(rendered);

};

//=========================================================================================================

IssuesView.prototype.viewIssues = function(id_project){

  var project = new Project().findProject(id_project);
  var issues = new Issue().getIssues(project);

  var template = $('#template_').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#container').html(rendered);
  
}

IssuesView.prototype.viewIssue = function(id_project, id_issue){

  var project = new Project().findProject(id_project);
  var issue = new Issue().getIssue(project, id_issue);

  var template = $('#template_').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#container').html(rendered);

};

//=========================================================================================================

KanbanView.prototype.viewKanban = function(id_sprint){

	var project = new Project().findProject(id_project);

  var template = $('#template_').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
  $('#container').html(rendered);
  
  //var tables = ["New", "Ready", "In Progress", "Ready for test", "Done", "Archived"];

  //idenktificar se é um projeto ou sprint
  //if(id_sprint == undefined){
  //		stories =  project.backlog;
  //}else{}
   
  $(function () {
    var kanbanCol = $('.panel-body');
    kanbanCol.css('max-height', (window.innerHeight - 110) + 'px');

    var kanbanColCount = parseInt(kanbanCol.length);
    $('.container').css('min-width', (kanbanColCount * 350) + 'px');

    $('.container').css('margin-left', '25px'); 
    $('.container').css('overflow-x:', 'hidden'); 
    //$('#sortableKanbanBoards').css('overflow-x:', 'scroll'); 

    draggableInit();

    $('.panel-heading').click(function() {
      var $panelBody = $(this).parent().children('.panel-body');
      $panelBody.slideToggle();
    });
  });
  
};
