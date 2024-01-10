var empDataArray = [];
var emaildup=[];

$("#empFormSubmit").click(a => {
  var fName = $("#fName").val();
  var lName = $("#lName").val();
  var email = $("#email").val();
  var pwd = $("#pwd").val();

  var empData = {
    fName: fName,
    lName: lName,
    email: email,
    pwd: pwd
  }
  fName == "" || lName == "" || email == "" || pwd == "" ? error() : submit(empData);

});
$('body').on('click', '.btn-danger', function () {
 
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    var Id = $(this).attr("id");
      empDataArray = empDataArray.filter(a => a.email !== Id);
      emaildup=emaildup.filter((a)=>a.email== Id);
      randerFunction();
      if (result.isConfirmed){
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
      });
     }
  });
});

function randerFunction() {
  var secret = "abc%@1708";
  var enc= CryptoJS.AES.encrypt( $("#pwd").val(), secret).toString();
   alert(enc);
  var empHtmlString = "";
  empDataArray.forEach(a => {
    
    empHtmlString += "<tr>"
    empHtmlString += "<td>" + a.fName + "</td>"
    empHtmlString += "<td>" + a.lName + "</td>"
    empHtmlString += "<td>" + a.email + "</td>"
    empHtmlString += "<td>" + enc + "</td>"
    empHtmlString += `<td><button class="btn btn-delete btn-danger fa fa-trash-o" id="${a.email}"> </button> </td>`
    empHtmlString += "</tr>"
  })

  $("#empData").html(empHtmlString);
}
function clearField() {
  $("#fName").val("");
  $("#lName").val("");
  $("#email").val("");
  $("#pwd").val("");
}

function submit(empData) {
  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(emaildup.indexOf(empData.email) != -1)
  {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The email you entered is already registered",
      //footer: '<a href="#">Why do I have this issue?</a>'
    });
    return;
  }
 
  else
  {
    emaildup.push(empData.email);
  
  }

  if (pattern.test(empData.email))

   {


    empDataArray.push(empData);
    console.log(empDataArray);


    clearField();
    Swal.fire({
      title: "Employee Data has been stored",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  else 
  {
    Swal.fire({
      icon: "error",
      title: "Oops... Invalid emai;",
      text: "Plz enter correct email!",
     // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  randerFunction();
}
function error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "All fields are mandatory....",
    //footer: '<a href="#">Why do I have this issue?</a>'
  });
}