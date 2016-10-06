//
// View

// https://github.com/janl/mustache.js

function top_proj_opt(id_proj){ 
    ht = '<li><a href="#/project/'+id_proj+'">Dashboard</a></li> \
    	    <li><a href="#/project/'+id_proj+'/backlog">Product Backlog</a></li> \
    	    <li><a href="#/project/'+id_proj+'/kanban">Kanban</a></li> \
          <li><a href="#/project/'+id_proj+'/sprint">Sprints</a></li> \
          <li><a href="#/project/'+id_proj+'/risks">Risks</a></li> \
          <li><a href="#/project/'+id_proj+'/issues">Issues</a></li>';
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

//=========================================================================================================

ProjectsView.prototype.viewProject = function(id_project){

  var project = new Project().findProject(id_project);
  var backlog = new UserStory().getUserStories(project);

  var template = $('#template_viewproject').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
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

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'line',
    options: {
        maintainAspectRatio: false,
        responsive: true
    },
    data: data
  });

};

ProjectsView.prototype.viewProjects = function() {
  
  var template = $('#template_viewprojects').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {name: "Luke"});
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
