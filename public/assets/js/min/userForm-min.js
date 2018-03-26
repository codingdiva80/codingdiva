class UserForm{constructor(e){this.user=e,this.setFormError(),this.initForms(),this.modal}setFormError(){this.formError={message:"",oFormEntity:null}}initForms(){let e=document.getElementById("signup"),r=document.getElementById("login");e&&(e.onclick=(()=>{this.verifyNewUser()?this.submitNewUser():this.errorHandler()})),r&&(r.onclick=(()=>{this.verifyLogin()?this.submitLogin():this.errorHandler()}))}submitLogin(){this.modal=new Modal,this.modal.showWait=!0,this.modal.createCoverMessage("Checking login");let e={email:document.getElementById("login_email").value,password:document.getElementById("login_password").value};fetch("/member/login",{method:"post",headers:{Accept:"application/json, text/plain, text/html, */*","Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>e.json()).then(r=>{r.error?(this.modal.close(),this.formError.oFormEntity=document.getElementById("login_email"),this.formError.message="Email/password combination incorrect",this.errorHandler()):(this.modal.updateMessage("Logged in, redirecting you to the homepage"),this.user.storeLogin(e),setTimeout(()=>{document.location.href="/"},1e3))})}submitNewUser(){this.modal=new Modal,this.modal.showWait=!0,this.modal.createCoverMessage("Submitting your information");let e={email:document.getElementById("signup_email").value,username:document.getElementById("signup_username").value,password:document.getElementById("signup_pass").value};fetch("/member/newsignup",{method:"post",headers:{Accept:"application/json, text/plain, text/html, */*","Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>e.json()).then(r=>{r.error&&"email exists"===r.error?(this.modal.close(),this.formError.oFormEntity=document.getElementById("signup_email"),this.formError.message="This email already exists in our system",this.errorHandler()):(this.modal.updateMessage("User added, logging you in..."),this.user.storeLogin(e),setTimeout(()=>{document.location.href="/"},1e3))})}verifyNewUser(){this.setFormError(),this.unsetErrors();let e=document.getElementById("signup_username"),r=document.getElementById("signup_email"),t=document.getElementById("signup_pass"),o=document.getElementById("signup_pass2");return""===e.value?(this.formError.message="Missing username",this.formError.oFormEntity=e,!1):e.value.length<5?(this.formError.message="Username must be at least 5 characters long",this.formError.oFormEntity=e,!1):""===r.value?(this.formError.message="Missing email",this.formError.oFormEntity=r,!1):r.value.length<5?(this.formError.message="Email must be at least 5 characters long",this.formError.oFormEntity=r,!1):""===t.value?(this.formError.message="Missing password",this.formError.oFormEntity=t,!1):""===o.value?(this.formError.message="Missing password confirm",this.formError.oFormEntity=o,!1):t.value.length<5?(this.formError.message="Password must be at least 5 characters long",this.formError.oFormEntity=t,!1):o.value===t.value||(this.formError.message="Passwords do not match",this.formError.oFormEntity=o,!1)}verifyLogin(){this.setFormError(),this.unsetErrors();let e=document.getElementById("login_email"),r=document.getElementById("login_password");return""===e.value?(this.formError.message="Login is blank",this.formError.oFormEntity=e,!1):e.value.length<5||-1===e.value.indexOf("@")?(this.formError.message="Not a valid email address",this.formError.oFormEntity=e,!1):""===r.value?(this.formError.message="Password cannot be left blank",this.formError.oFormEntity=r,!1):!(r.value.length<5)||(this.formError.message="Password must be at least 5 characters",this.formError.oFormEntity=r,!1)}errorHandler(){let e=this.formError.oFormEntity,r=document.createElement("div");r.style.width="200px",r.style.padding="5px",r.style.textAlign="right",r.style.color="red",e.parentNode.insertBefore(r,e.parentNode.childNodes[0]),r.innerHTML=this.formError.message,r.id="error-msg",e.classList.add("form-error")}unsetErrors(){let e=document.getElementById("error-msg");e&&e.parentNode.removeChild(e);let r=document.querySelector(".form-error");r&&r.classList.remove("form-error")}}