//
// View

function top_proj_opt(id_proj){ 
    ht = '<li><a href="#/project/'+id_proj+'">Product Backlog</a></li> \
    	  <li><a href="#/project/'+id_proj+'/kanban">Kanban</a></li> \
          <li><a href="#/project/'+id_proj+'/sprint">Sprints</a></li> \
          <li><a href="#/project/'+id_proj+'/roadmap">Roadmap</a></li> \
          <li><a href="#/project/'+id_proj+'/issues">Issues</a></li>';
    return ht;
}

//=========================================================================================================

var ProjectsView = function(){
  this.target_class = "container";
};

ProjectsView.prototype.render_project = function(project, backlog){

  sprints = '<table class="table">\
  				<caption>Lasts Sprint <button class="btn btn-primary pull-right" type="submit" data-toggle="modal" data-target="#newSprintModal">New Sprint</button></caption> \
  				<thead> <tr> <th>Sprint</th> <th>Points</th> <th>Time</th> </tr> </thead> <tbody> <tr> <td>Mark</td> <td><span class="badge">10</span></td> <td>@mdo</td> </tr> <tr> \
  <td>Jacob</td> <td><span class="badge">10</span></td> <td>@fat</td> </tr> <tr> <td>Larry</td> <td><span class="badge">10</span></td> <td>@twitter</td> </tr> </tbody> </table>';

  ht = '<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'+project["name"]+'</h3></div><div class="panel-body">';
  ht += '<div class="row"><div class="col-md-8">';
  ht += '<div class="row">'
  ht += '<div class="col-md-6"><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div></div>'
  ht += '<div class="col-md-3"><span class="badge">' + project.getUSPoints() + '</span> Defined Points </div>'
  ht += '<div class="col-md-3"><span class="badge">' + project.getUSDone() + '</span> Closed Points </div>'
  ht += '</div>';
  ht += '<canvas id="myChart" width="300" height="300"></canvas></div>';
  ht += '<div class="col-md-4">'+sprints+'</div> </div></div></div>'

  ht += '<div class="row"><div class="col-md-8"><div class="panel panel-primary"> \
        <div class="panel-heading"> \
          <h3 class="panel-title">User Stories</h3> \
        </div> \
        <div class="panel-body"> \
          <button class="btn btn-primary pull-right" type="submit" data-toggle="modal" data-target="#newUSModal">New User Story</button> \
          <table class="table"> \
            <thead> \
              <tr> \
                <th>Story</th><th>Points</th><th>UX / Design / Front / Back</th><th>Status</th>\
              </tr> \
            </thead> \
            <tbody>';

  $.each(backlog, function( index, value ) {
    ht += '<tr><th><a href="#/project/'+project["id_project"]+'/story/'+value["id_us"]+'">'+value["subject"]+'</a></th>';
    ht += '<th>'+value.getPoints()+'</th><th>';
    ht += '<span class="badge">'+value["pt_ux"]+'</span> ';
    ht += '<span class="badge">'+value["pt_design"]+'</span> ';
    ht += '<span class="badge">'+value["pt_front"]+'</span> ';
    ht += '<span class="badge">'+value["pt_back"]+'</span></th>';
    ht += '<th>'+value["status"]+'</tr>';
  });

  ht += '</tbody></table></div></div></div><div class="col-md-4"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">Sprint</h3></div><div class="panel-body">LOL</div></div></div>'

  ht += '<div class="modal fade" id="newUSModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
  ht += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
  ht += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  ht += '<h4 class="modal-title" id="myModalLabel">New User Story</h4></div>';
  ht += '<div class="modal-body">';
  ht += '<input type="text" class="form-control userstory" placeholder="User Story">';
  ht += '<textarea class="form-control description" rows="3" placeholder="Description"></textarea>';
  
  ht += '<div class="row"><div class="col-md-3">UX<select class="form-control uxpt">';
  ht += '<option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="8">8</option><option value="13">13</option><option value="20">20</option><option value="40">40</option><option value="100">100</option></select></div><div class="col-md-3">Design<select class="form-control dpt">';
  ht += '<option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="8">8</option><option value="13">13</option><option value="20">20</option><option value="40">40</option><option value="100">100</option></select></div><div class="col-md-3">Frontend<select class="form-control fpt">';
  ht += '<option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="8">8</option><option value="13">13</option><option value="20">20</option><option value="40">40</option><option value="100">100</option></select></div><div class="col-md-3">Backend<select class="form-control bpt">';
  ht += '<option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="8">8</option><option value="13">13</option><option value="20">20</option><option value="40">40</option><option value="100">100</option></select></div></div>Status';

  ht += '<select class="form-control status"><option value="New">New</option><option value="Ready">Ready</option><option value="In Progress">In Progress</option>';
  ht += '<option value="Ready for test">Ready for test</option><option value="Done">Done</option><option value="Archived">Archived</option></select></div><div class="modal-footer">';
  ht += '<button type="button" class="btn btn-primary save_story">Create Story</button></div></div></div></div>';

  $('.' + this.target_class).html(ht);

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

  /*

{
          label: 'Programmed',
          data: [55, 45, 35, 25, 15, 10, 0],
          backgroundColor: "rgba(255, 255, 0, 0.2)",
        },
        {
          label: 'Closed',
          data: [52, 30, 25, 20, 10, 5, 0],
          backgroundColor: "rgba(0, 0, 255, 0.5)",
        }

  */

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'line',
    options: {
        maintainAspectRatio: false,
        responsive: true
    },
    data: data
  });

  $(".save_story").click(function(){   
    var subject = $('.userstory').val();
    var description = $('.description').val(); 
    var pt_ux = $('.uxpt').val(); 
    var pt_design = $('.dpt').val(); 
    var pt_front = $('.fpt').val(); 
    var pt_back = $('.bpt').val(); 
    var status = $('.status').val();

    new StoryController().createStory(project["id_project"], subject, description, status, pt_ux, pt_design, pt_front, pt_back, "Client");
    new ProjectController().viewProject(project["id_project"]);

    $('#newUSModal').modal('hide');
    $('.modal-backdrop').hide();
  });

};

ProjectsView.prototype.render_projects = function(list) {
  console.log(list);

  ht = '<div class="panel panel-primary">'+
        '<div class="panel-heading">'+
          '<h3 class="panel-title">Projects</h3>'+
        '</div>'+
        '<div class="panel-body">'+
          '<button class="btn btn-primary pull-right" type="submit" data-toggle="modal" data-target="#newProjModal">New Project</button>'+
          '<table class="table">'+
            '<thead>'+
              '<tr>'+
                '<th>Name</th><th>Description</th><th>User Stories / Issues</th><th>Progress</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>';

  $.each(list, function( index, value ) {
    var done = (value.getUSCount() / value.getUSDone()) * 100;
    
    if(done == Infinity){
      done = 0;
    }

    ht += '<tr><th><a href="#/project/'+value["id_project"]+'">'+value["name"]+'</a></th>'
    ht += '<th>'+value["description"]+'</th>'
    ht += '<th><span class="badge">'+value.getUSCount()+'</span> <span class="badge">'+value.getIssueCount()+'</span></th>'
    ht += '<th><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="'+done+'" aria-valuemin="0" ' 
    ht += 'aria-valuemax="100" style="width: '+done+'%;">'+done+'%</div></div> </th></tr>'
  });

  ht += '</tbody></table></div></div>';
  ht += '<div class="modal fade" id="newProjModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
      '<div class="modal-dialog" role="document">'+
        '<div class="modal-content">'+
          '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" id="myModalLabel">Novo Projeto</h4>'+
          '</div>'+
          '<div class="modal-body">'+
            '<input type="text" class="p_name form-control" placeholder="Project Name">'+
            '<textarea class="p_desc form-control" rows="3" placeholder="Description"></textarea>'+
          '</div>'+
          '<div class="modal-footer">'+
            '<button type="button" class="btn btn-primary save_project">Create</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';

  $('.' + this.target_class).html(ht);
  $(".save_project").click(function(){ 
    var c = new ProjectController();
    c.createProject($(".p_name").val(), $(".p_desc").val(), 10);
    c.viewProjects();

    $('#newProjModal').modal('hide');
    $('.modal-backdrop').hide();
  });
};    

//=========================================================================================================

var StoriesView = function(){};

StoriesView.prototype.render_story = function(story){

    var ht = '<div class="panel panel-primary"> ';
    ht += '    <div class="panel-heading"> '
    ht += '      <button type="button" class="btn btn-primary btn-xs pull-right">'
    ht += '      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>'
    ht += '      Edit</button>'
    ht += '      <h3 class="panel-title">'+ story["subject"]+'</h3> \
    	<input type="text" class="form-control" id="story" placeholder="Story" value="'+story["subject"]+'"> \
        </div> \
        <div class="panel-body">';





  ht += story["description"] + '<br><br><button type="button" class="btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button><br><br>'; 

  ht += story.getPoints() + ' Total - ';
  ht += '<span class="badge">'+story["pt_ux"]+'</span> ';
  ht += '<span class="badge">'+story["pt_design"]+'</span> ';
  ht += '<span class="badge">'+story["pt_front"]+'</span> ';
  ht += '<span class="badge">'+story["pt_back"]+'</span>';
  ht += '<button type="button" class="btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button><br>';

  ht += '<h2>Tasks</h2>';
  $.each(story.tasks, function( index, value ) {
    ht += '<p>'+value+'</p><br>';    
  });

  ht += '</div';

  $('.container').html(ht);
};

//=========================================================================================================

var IssuesView = function(){};

IssuesView.prototype.render_issues = function(issues, project){
  ht = '<div class="panel panel-primary"><div class="panel-heading">'
  ht += '<h3 class="panel-title">Issues</h3></div><div class="panel-body">'
  ht += '<button class="btn btn-primary pull-right" data-toggle="modal" data-target="#newIssueModal">New Issue</button>'
  ht += '<table class="table"><thead><tr><th>Subject</th><th>Description</th>'
  ht += '<th>Type</th><th>Severity</th><th>Priority</th></tr></thead><tbody>';
  
  $.each(issues, function( index, value ) {
    ht += '<tr><th><a href="#/project/'+project["id_project"]+'/issues/'+value["id_issue"]+'">'+value["subject"]+'</a></th>';
    ht += '<th>'+value["description"]+'</th><th>'+value["type"]+'</th>';
    ht += '<th><span class="label label-danger">'+value["severity"]+'</span></th>';
    ht += '<th><span class="label label-danger">'+value["priority"]+'</span></th></tr>';
  });

  ht += '</tbody></table></div></div>';

  ht += '<div class="modal fade" id="newIssueModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
  ht += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
  ht += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  ht += '<h4 class="modal-title" id="myModalLabel">New Issue</h4></div>';
  

 
  ht += '<div class="modal-body">';
  ht += '<input type="text" class="form-control issue" placeholder="Issue"><textarea class="form-control description" rows="3" placeholder="Description"></textarea>';
  ht += '<div class="row"><br>'
  ht += '<div class="col-md-3"><select class="form-control type"><option value="Bug">Bug</option><option value="Question">Question</option><option value="Enhancement">Enhancement</option></select></div>';
  ht += '<div class="col-md-3"><select class="form-control priority"><option value="Low">Low</option><option value="Normal">Normal</option><option value="High">High</option></select></div>';
  ht += '<div class="col-md-3"><select class="form-control severity"><option value="Wishlist">Wishlist</option><option value="Minor">Minor</option><option value="Normal">Normal</option><option value="Critical">Critical</option></select></div></div></div>';
  ht += '<div class="modal-footer"><button type="button" class="btn btn-primary save_issue">Create Story</button></div></div></div></div>';


  $('.container').html(ht);

  $(".save_issue").click(function(){ 
    var subject = $('.issue').val();
    var description = $('.description').val();
    var type = $('.type').val();
    var priority = $('.priority').val(); 
    var severity = $('.severity').val();

    new IssueController().createIssue(project["id_project"], subject, description, type, severity, priority);
    new IssueController().viewIssues(project["id_project"]);

    $('#newIssueModal').modal('hide');
    $('.modal-backdrop').hide();
  });

  
}

IssuesView.prototype.render_issue = function(issue){
  ht = '<div class="panel panel-primary">'+
        '<div class="panel-heading">'+
          '<h3 class="panel-title">'+issue["subject"]+'</h3>'+
        '</div>'+
        '<div class="panel-body">';

  ht += issue["description"]; 

  ht += '</div';

  $('.container').html(ht);
};









var KanbanView = function(){};
KanbanView.prototype.render_kanban = function(stories, project){

  var tables = ["New", "Ready", "In Progress", "Ready for test", "Done", "Archived"];

  // Colocar outros status de US

  if(project != undefined){

  }

  ht = '<div id="sortableKanbanBoards" class="row">'

  $.each(tables, function( index, value ) {
    
    ht += ' <div class="panel panel-primary kanban-col"> \
                <div class="panel-heading">' + value+ '<i class="fa fa-2x fa-plus-circle pull-right"></i></div> \
                <div class="panel-body"> \
                  <div id="' + value + '" class="kanban-centered">'; 
                  
    $.each(stories, function( index_, story ) {
      if(story.status == value){
        ht += '<article class="kanban-entry grab" id="item_'+story["id_us"]+'" draggable="true"> \
              <div class="kanban-entry-inner"> \
                  <div class="kanban-label"> \
                    <h2>'+story["subject"]+'</h2> \
                    <p>'+story["description"]+'</p> \
                  </div> \
              </div> \
            </article> ';
      }
    });

    ht += '</div></div> \
                <div class="panel-footer"><a href="#">Add a card...</a></div> \
            </div> \
        ';

  });

  ht += '</div>';


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

  $('.container').html(ht);
};




















        

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


                    // Post data 
                    setTimeout(function () {
                        var element = document.getElementById(elementId);
                        children.prepend(element);
                        $('#processing-modal').modal('toggle'); // after post
                    }, 1000);

                }

                event.preventDefault();
            });
        }




/*

      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Sprints</h3>
        </div>
        <div class="panel-body">
          <button class="btn btn-primary pull-right" type="submit">New Sprint</button>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Period</th>
                <th>Total Stories</th>
                <th>Closed Stories</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <th>Primeira Sprint</th>
                <th>00/00/00 - 11/11/11</th>
                <th>10</th>
                <th>6</th>
                <th>
                  <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>





          









*/