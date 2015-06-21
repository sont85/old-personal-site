
var app = angular.module("contact", ["angular-md5"]);

app.controller("mainCtrl", function(md5) {
  cScope = this;
  var defaultData = [{firstName: "Son", lastName: "Truong", email: "sont85@gmail.com", phoneNumber: "707-246-1547", gravatar: "http://www.gravatar.com/avatar/96d6b5ec926ebc3ecdc731eb03bf7aa6"}]
  var localStorageContacts = JSON.parse(localStorage.getItem("ContactList")) 
  if (localStorageContacts === null ) {
    cScope.contactList = defaultData
  } else if (localStorageContacts.join() === "") {
    cScope.contactList = defaultData
  } else {
    cScope.contactList = localStorageContacts
  }

  cScope.headerList = Object.keys(cScope.contactList[0])
  cScope.addContact = function(contact) {
    var copyContact = angular.copy(contact);
    copyContact.gravatar = cScope.addGravatar(contact.email);
    cScope.contactList.push(copyContact);
    localStorage.setItem("ContactList", JSON.stringify(cScope.contactList));
  }

  cScope.addGravatar = function(email) {
    cScope.hash = md5.createHash(email || "");
    console.log(cScope.gravatar);
    return "http://www.gravatar.com/avatar/"+cScope.hash;
  }
  cScope.sort = function(header) {
    cScope.sortHeaderName = header;
  }
  cScope.deleteRow = function($index) {
    cScope.contactList.splice($index, 1);
    localStorage.setItem("ContactList", JSON.stringify(cScope.contactList));
  }
  cScope.editRow = function($index) {
    cScope.edit = $index;
  }
  cScope.submitEdit = function(contact, $index){
    cScope.contactList.slice($index, contact);
    localStorage.setItem("ContactList", JSON.stringify(cScope.contactList));
    cScope.edit = false;
  }
  

});
