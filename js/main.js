
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



    // $.getJSON('db/group_members.json').done(function(res){
    //   console.log('db file loaded');
    //   console.log(res);
    //
    //   // build a table, I should probably using a framework, anyway....
    //
    //   for (var key in res ) {
    //
    //     var member = res[key];
    //
    //     var $row = $('<tr>').appendTo('#members-table');
    //
    //
    //     var $avatar = $('<td>').appendTo($row)
    //     var $img = $('<img>').attr('src', member.image_48).css('border-radius', '5px').appendTo($avatar);
    //     var $name = $('<td>').text(member.real_name).appendTo($row);
    //     var $email = $('<td>').text(member.email).appendTo($row);
    //
    //   }
    // })

  });




});
