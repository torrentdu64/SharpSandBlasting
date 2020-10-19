import $ from "jquery";



  $(function () {

  // Get the form.
  var form = $("#inquery");



  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Get the messages div.
    var formMessages = $("#form-messages");

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("d-none alert-danger");
        $(formMessages).addClass("d-block alert-success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#fname").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#comment").val("");

      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("d-none alert-success");
        $(formMessages).addClass("d-block alert-danger");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });


});





