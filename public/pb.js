var tab=document.getElementById("tab");
var btn1=document.getElementById("au");
var frm=document.getElementById("frm");
function adduser()
{
    hide(btn1);
    var form=document.createElement("form");
form.setAttribute("action","/add");
form.setAttribute("method","post");
form.setAttribute("onSubmit","unhide(btn1);hide(frm);addTolist()");
	var textname=document.createElement("input");
	textname.setAttribute("type","text");
	textname.setAttribute("class","box2");
    textname.setAttribute("name","name");
    textname.setAttribute("id","name");
	textname.setAttribute("placeholder","Name");
	textname.setAttribute("required","true");
	form.appendChild(textname);

 	blankline(form);
 	blankline(form);

 	var textemail=document.createElement("input");
     textemail.setAttribute("type","email");
     textemail.setAttribute("class","box2");
     textemail.setAttribute("name","email");
     textemail.setAttribute("id","email");
     textemail.setAttribute("placeholder","E-mail");
     textemail.setAttribute("required","true");
     form.appendChild(textemail);

	blankline(form);
 	blankline(form);

 	var textPhone=document.createElement("input");
     textPhone.setAttribute("type","number");
     textPhone.setAttribute("class","box2");
     textPhone.setAttribute("name","phone");
     textPhone.setAttribute("id","phone");
     textPhone.setAttribute("maxlength","10");
     textPhone.setAttribute("minlength","10");
     textPhone.setAttribute("placeholder","Phone number");
     textPhone.setAttribute("required","true");
     form.appendChild(textPhone);

	blankline(form);
 	blankline(form);

 	var textaddress=document.createElement("input");
     textaddress.setAttribute("type","text-area");
     textaddress.setAttribute("class","box2");
     textaddress.setAttribute("name","address");
     textaddress.setAttribute("id","address");
     textaddress.setAttribute("placeholder","Address");
     textaddress.setAttribute("required","true");
     form.appendChild(textaddress);

	blankline(form);
 	blankline(form);

 	var btn=document.createElement("button");
 	btn.setAttribute("type","submit");
 	btn.setAttribute("class","aub");
 	btn.innerHTML="Add User";

     form.appendChild(btn);
     
    frm.appendChild(form);
}
function hide(i)
{
i.setAttribute("style","visibility:hidden")
}
function unhide(i)
{
i.setAttribute("style","visibility:visible")
}
function blankline(i)
{
	var j=document.createElement("br")
	i.appendChild(j);
}
function addTolist()
{
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var name1=document.getElementById("name").value;
    var name=document.createTextNode(name1);
    td1.appendChild(name);
    var td2=document.createElement("td");
    var email1=document.getElementById("email").value;
    var email=document.createTextNode(email1);
    td2.appendChild(email);
    var td3=document.createElement("td");
    var phone1=parseInt(document.getElementById("phone").value);
    var phone=document.createTextNode(phone1);
    td3.appendChild(phone);
    var td4=document.createElement("td");
    var address1=document.getElementById("address").value;
    var address=document.createTextNode(address1);
    td4.appendChild(address);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tab.appendChild(tr);
    
}