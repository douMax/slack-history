
var grouID, myToken;

/*  generated at
https://api.slack.com/custom-integrations/legacy-tokens
This is where I generate my slack legacy tokens and with that token I can use slack api like channels.histroy, groups.history
*/

// var baseURL = "https://slack.com/api/im.history";
var baseURL = "https://slack.com/api/groups.history";


var groupMembers = {};

var lastOldestTimeStamp = '';

var fileCount = 1;

/* fetch group history (recursive) */
/* https://api.slack.com/methods/groups.history */
var fetchGroupHistory = function(count, timeStamp){

  $.ajax({
    url: baseURL,
    data: {
      token: myToken,
      channel: groupID,
      count: count,
      latest: timeStamp
    }
  })
  .done(function(res){
    console.log(res);
    var messages = res.messages;

    // get from stack overflow, stringfy the response
    // and encode it as a text/json data string
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res));

    // build a table row with a download link
    var $row = $('<tr>').appendTo('#msgs-table');

    $histroy = $('<td>').text("No." + fileCount).appendTo($row);

    $link = $('<td>').appendTo($row);

    /* set the downlaod link's attr, which will generate a link like this:
    <a class="" href="data:text/json;charset=utf-8,.....(our data string)...." download="msgs_1.json">Download as.....
    */

    $('<a>').text('Download as JSON').addClass('button is-info').attr('href', dataStr).attr('download', 'msgs_'+ groupID + '_' + fileCount + '.json').appendTo($link);

    // slack api only allow maximum of 1000 history per ajax call. It will return a object with key "has_more", value: true to tell you there are more history messages
    if (res.has_more) {
      // increase the fileCount for the naming of the download file
      fileCount++;

      // get the oldest message's timeStamp, pass it as the latest varialbe in recursive calling of this function
      lastOldestTimeStamp = messages[ messages.length - 1 ].ts

      console.log(lastOldestTimeStamp);

      // set inclusive as false to avoid duplicates of the latest
      fetchGroupHistory(count, lastOldestTimeStamp)
    }


  })
}



/*  get group info  */
var getGroupInfo = function(){
  $.ajax({
    url: "https://slack.com/api/groups.info",
    data: {
      token: myToken,
      channel: groupID
    }
  })
  .done(function(res){

    var membersID = res.group.members;
    console.log(membersID);

    for (var i = 0; i < membersID.length; i++) {
      getUserProfile(membersID[i])
    }

  })
}

/* get Members Profile */
var getUserProfile = function(user){

  $.ajax({
    url: "https://slack.com/api/users.profile.get",
    data: {
      token: myToken,
      user: user
    }
  })
  .done(function(res){
    groupMembers[user] = res.profile
  })

}


var getIM = function(){
  $.ajax({
    url: "https://slack.com/api/im.list",
    data: {
      token: myToken,
    }
  })
  .done(function(res){
    console.log(res);
  });
};


var getFiles = function(type,page){
  $.ajax({
    url: "https://slack.com/api/files.list",
    data: {
      page:page,
      token: myToken,
      types: type,
      channel: groupID
    }
  })
  .done(function(res){
    console.log(res);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res));

    // build a table row with a download link
    var $row = $('<tr>').appendTo('#msgs-table');
    $histroy = $('<td>').text("No." + fileCount).appendTo($row);
    $link = $('<td>').appendTo($row);

    $('<a>').text('Download as JSON').addClass('button is-info').attr('href', dataStr).attr('download', 'files_'+ groupID + '_' + fileCount + '.json').appendTo($link);

    if (res.paging.page !== res.paging.pages) {
      getFiles(type, page+1)
    }

  });
}
