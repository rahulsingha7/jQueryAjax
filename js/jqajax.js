//Ajax Request for Retrieving Data
function showdata(){
  output ="";
  $.ajax({
    url: "retrieve.php",
    method: "GET",
    dataType: "json",
    success: function(data){
      // console.log(data);
      if(data){
        x = data;
      }
      else {
        x = "";
      }
      for(i=0;i<x.length;i++){
       output += "<tr><td>"+x[i].id + "</td><td>" + x[i].name + "</td><td>" + x[i].email + "</td><td>" + x[i].password + "</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid=" +x[i].id+">Edit</button><button class='btn btn-danger btn-sm btn-del' data-sid=" +x[i].id+">Delete</button></td></tr>";
       }
       $("#tbody").html(output);
    }
  })
}
showdata();


$(document).ready(function(){
// AJAX Request for Insert Data
$("#btnadd").click(function(e){
  e.preventDefault();
  console.log("saved button clicked");
  let stid = $("#stuid").val();
  let nm = $("#nameid").val();
  let em = $("#emailid").val();
  let pw = $("#passwordid").val();
//   console.log(nm);
//   console.log(em);
//   console.log(pw);
mydata = {id:stid,name: nm,email :em,password :pw };
// console.log(mydata);
$.ajax({
    url: "insert.php",
    method: "POST",
    data: JSON.stringify(mydata),
    success: function(data){
        // console.log(data);
        msg= "<div class='alert alert-dark mt-3'>"+ data + "</div>";
        $("#msg").html(msg);
        $("#myform")[0].reset();
        showdata();
    },
});
});
//Ajax  Request for Deleting Data
$("tbody").on("click",".btn-del",function(){
  console.log("Delete Button Clicked");
  let id = $(this).attr("data-sid");
  // console.log(id);
  mydata = {sid: id};
  mythis = this;
  $.ajax({
    url: "delete.php",
    method: "POST",
    data: JSON.stringify(mydata),
    success: function (data){
      // console.log(data);
     if(data==1){
      msg= "<div class='alert alert-dark mt-3'>Student Deleted Successfully</div>";
      $(mythis).closest("tr").fadeOut();
     }
     else if(data==0){
      msg= "<div class='alert alert-dark mt-3'>Unable to Delete Student</div>";
     }
      $("#msg").html(msg);
      // showdata();
     
    }
  })
})
//Ajax Request For Editing Data
$("tbody").on("click",".btn-edit",function(){
  console.log("Edit Button Clicked");
  let id = $(this).attr("data-sid");
  // console.log(id);
  mydata = {sid:id};
  $.ajax({
    url: "edit.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(mydata),
    success:function(data){
      // console.log(data);
      $("#stuid").val(data.id);
      $("#nameid").val(data.name);
      $("#emailid").val(data.email);
      $("#passwordid").val(data.password);
    }
  })
});
});

