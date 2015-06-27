
var app = angular.module("contact", ["angular-md5"]);

app.controller("mainCtrl", function(md5) {

   if (document.documentElement.clientWidth > 767) {
      document.querySelector("meta[name=viewport]").setAttribute('content', 'initial-scale=1');
    };

  cScope = this;
  var defaultData = [{FirstName: "Son", LastName: "Truong", Email: "sont85@gmail.com", Phone: "707-246-1547", Gravatar: "http://www.gravatar.com/avatar/96d6b5ec926ebc3ecdc731eb03bf7aa6"}]
  var localStorageContacts = JSON.parse(localStorage.getItem("ContactList"))

  if (localStorageContacts === null ) {
    cScope.contactList = defaultData
  } else if (localStorageContacts.join() === "") {
    cScope.contactList = defaultData
  } else {
    cScope.contactList = localStorageContacts
  }

  cScope.addContact = function(contact) {
    contact.Gravatar = cScope.addGravatar(contact.Email);
    var copyContact = angular.copy(contact);
    cScope.contactList.push(copyContact);
    localStorage.setItem("ContactList", JSON.stringify(cScope.contactList));
  }

  cScope.addGravatar = function(email) {
    cScope.hash = md5.createHash(email || "");
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
