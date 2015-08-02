
function showError( errObj, errContainer ) {
	$(errContainer).parent().find('.label').remove();
	if ( errObj ) {
		console.log( "Adding error: " + errObj );
		$(errContainer).parent().addClass('error');
		$(errContainer).parent().append("<small class='error label'>" + errObj + "</small>");
	} else {
		$(errContainer).parent().removeClass('error');
	}
}

$(document).ready(function() {

	var successMessage = "Merci. Nous vous contacterons bientôt."

	$("#contact-form").on("submit", function(e) {
		e.preventDefault();

        var data = {
        	inbox: inboxName,
        	name: $("#content-name").val(),
        	email: $("#content-email").val(),
        	subject: $("#content-subject").val(),
        	comments: $("#content-message").val(),
        	recaptcha: grecaptcha.getResponse()
        };

        var submitUrl = "http://cloudmailer-rhanna.rhcloud.com/sendMail";
        //var submitUrl = "http://127.0.0.1:8080/sendMail";

        $.post( submitUrl, data, function( result ) {
       		$('#errors').html("").fadeIn('fast');
        	if ( result.success ) {
        		$('#contact-form').html(successMessage).fadeIn('fast');
        	} else {
	       		$('#errors').html('Error! Email not sent!').addClass('error').fadeIn('fast');
	       		if ( result.errors ) {
	       			showError( result.errors.name, '#content-name' );
	       			showError( result.errors.email, '#content-email' );
	       			showError( result.errors.subject, '#content-subject' );
	       			showError( result.errors.comments, '#content-message' );
	       			showError( result.errors.recaptcha, '.g-recaptcha' );
	       		}
        	}
        } )
        .fail( function() {
        	$('#errors').html("Error! Cannot connect to server. Please try again later.").addClass('error').fadeIn('fast');
        });
    });
});
