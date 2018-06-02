const maxLength = 200;

$(document).ready(() => {
	strictLetter(maxLength);
	activeMenu();
});

function strictLetter(maxlength) {
	let remainingLetter = maxlength;
	let string = `Còn ${remainingLetter}/${maxLength} ký tự`;

	$('#strict-letter').html(string);
	$('#questionContent').on('input', function (e) {
		let textLength = $(this).val().length;
		remainingLetter = maxlength - textLength;
		string = `Còn ${remainingLetter}/${maxLength} ký tự`;
		$('#strict-letter').html(string);
	});
}

function activeMenu() {
	if(window.location.pathname === '/') {
		$('.link-home').addClass('active');
		$('.link-asks').removeClass('active');
	} else {
		$('.link-home').removeClass('active');
		$('.link-asks').addClass('active');
	}
}