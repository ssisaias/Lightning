//var issue = new Issue(subject, description, type, severity, priority);
//var project = new Project(name, description, sprints);
//var story = new UserStory(subject, description, status, pt_ux, pt_design, pt_front, pt_back, req_type);

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

$(".save_project").click(function(){ 
    var c = new ProjectController();
    c.createProject($(".p_name").val(), $(".p_desc").val(), 10);
    c.viewProjects();

    $('#newProjModal').modal('hide');
    $('.modal-backdrop').hide();
});

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

 