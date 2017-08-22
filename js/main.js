
$(document).ready(function() {

  console.log('haha');


  /* ev handler for generate links */
  $('#generate-links').on('click', function(){

    /* get input id and token */
    groupID = $('#id-input').val();
    myToken = $('#token-input').val();

    $('#msgs-table').empty();
    fileCount = 1;

    fetchGroupHistory(1000, Date.now);

  });


  /* ev handler for see who's on the team */
  $('#fetch').on('click', function(){
    console.log("fetch!");

    /* get input id and token */
    groupID = $('#id-input').val();
    myToken = $('#token-input').val();

    getGroupInfo();

  });




});
