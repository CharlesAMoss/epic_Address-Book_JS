function Contact(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
};

function createContact() {
    var first = $("input#new-first-name").val();
    var last = $("input#new-last-name").val();
    return new Contact(first, last);
}

function Address(street, city, state, typeOf) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.typeOf = typeOf;
}

Address.prototype.fullAddress = function() {
    return this.typeOf + "<br />" + this.street + ", " + this.city + ", " + this.state;
};

function resetFields() {
    $("input").val("");
}

function resetAddress(){
    $("input.new-typeOf").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}

$(document).ready(function() {
    $("#add-address").click(function() {
        $(".new-address").clone().last().appendTo("#new-addresses");
        resetAddress();
    });

    $("form#new-contact").submit(function(event) {
        event.preventDefault();

        var newContact = createContact();

        $(".new-address").each(function() {
            var inputtedTypeOf = $(this).find("input.new-typeOf").val();
            var inputtedStreet = $(this).find("input.new-street").val();
            var inputtedCity = $(this).find("input.new-city").val();
            var inputtedState = $(this).find("input.new-state").val();

            var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedTypeOf);
            newContact.addresses.push(newAddress);
        });


        $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

        $(".contact").last().click(function() {
            $("#show-contact").fadeIn("slow");
            $("#show-contact h2").text(newContact.fullName());
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);
            $("ul#addresses").text("");

            newContact.addresses.forEach(function(address) {
                $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
            });
        });

        $(".new-address").not(':first').remove();

        resetFields();
    });
});
