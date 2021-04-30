var url="https://codequotient.com/api/";
var langSelec;
var codeEdi;
var compBtn;
var langid;
var editorCode;
var outHeading;


function compileClick(){
    langSelec=document.getElementById("langSelect");
    codeEdi=ace.edit("editor");
    compBtn=document.getElementById("btn");
    outHeading=document.getElementById("outHead");
    setLangId();
    setCode();
    sendCode();
}
function sendCode(){
    var urlSend=url+"executeCode";
    var request=new XMLHttpRequest();
    request.open("POST",urlSend);
    request.setRequestHeader("Content-Type","application/json");
    var objSend={code: editorCode,langId: langid};
    console.log(objSend);
    request.send(JSON.stringify(objSend));
    request.addEventListener("load",function(){
       var response=JSON.parse(request.responseText);
       //console.log(response);
       if("codeId" in response)
       {
           var coid=response.codeId;
           resultOfCode(coid);
       }
       else
       {
           alert("You hzve to Write Code");

       }
    });
}
function resultOfCode(coid){

    var utlCh=url+"codeResult/"+coid;
    var request=new XMLHttpRequest();
    request.open("GET",utlCh);
    request.send();
     request.addEventListener("load",function(){
         var response=JSON.parse(request.responseText);
         var data=JSON.parse(response.data);
          if(data.status=="Pending")
          {
              resultOfCode(coid);
          }
          else{
              if(data.errors!="")
              {
                  outHeading.innerHTML="OUTPUT:  "+data.errors;
              }
              else
              {
                  outHeading.innerHTML="OUTPUT:    "+data.output;
              }
          }
         console.log(response);
     });
}
function setCode(){
    editorCode=codeEdi.getValue();
    //console.log(editorCode);
}
function setLangId(){
    var selectedLang=langSelec.value;
    switch(selectedLang)
    {
        case "Java": langid="8"; break;
         case "Python": langid="0"; break;
          case "C": langid="7"; break;
           case "C++": langid="77"; break;
         default: langid="8"; break;
    }
   // console.log("Selected language", langId);
}
