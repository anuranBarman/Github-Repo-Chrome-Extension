function getRepos() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.github.com/users/anuranBarman/repos", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        populateList(response);


        $('#search').on('input',function(e){
          searchRepo(this.value,response);
        });
        //return response;

      }
    };


    xhttp.send();

}

function searchRepo(searchValue,res){
  var filterRepos=res.filter(repo=>repo.name.toUpperCase().includes(searchValue.toUpperCase()));
  populateList(filterRepos);
}

document.addEventListener('DOMContentLoaded',()=>{
  getRepos();

});


function populateList(response){
  document.getElementById('repoList').innerHTML='';
  var liItem="";
  for(var i=0;i<response.length;i++){
    // document.getElementById('repoList').appendChild("<li class='list-group-item'><b>"+response[i].name+"</b><a target='_blank' href='"+response[i].html_url+"'><button type='button' class='btn btn-primary'>Go to Repo</button></a></li>");
    liItem+="<li class='list-group-item'><b>"+response[i].name+"</b><a target='_blank' href='"+response[i].html_url+"'><button type='button' class='btn btn-primary'>Go to Repo</button></a></li>";
  }
  document.getElementById('repoList').innerHTML=liItem;
}
