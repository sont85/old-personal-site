
var app = angular.module("contact", ["angular-md5"]);

app.controller("mainCtrl", function(md5) {
  cScope = this;
  var localStorageContacts = localStorage.getItem("ContactList")
  cScope.contactList = JSON.parse(localStorageContacts)

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
