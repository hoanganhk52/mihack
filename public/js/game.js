$(document).ready(function () {
	let html = `<tr>
                    <td></td>
                </tr>`;


	let rows = $('#game-table tbody tr');
	let sums = $('.sum');
	let sumVal = 0;

	if (rows.length > 0) {
		for (let i = 0; i < 4; i++) {
			sumVal = 0;
			rows.each(function () {
				sumVal = sumVal + parseInt($(this).find('.score').eq(i).val());
			});
			sums.eq(i).html(sumVal);
		}
	}

	$('#add-round').on('click', function (e) {
		let tbody = $(document).find('#game-table tbody');

		let html = `<tr class="rounds" data-index="-1">
	                    <td>Round ${tbody.children('tr.rounds').length + 1}</td>
	                    <td><input type="number" value="0" name="score" class="score"></td>
	                    <td><input type="number" value="0" name="score" class="score"></td>
	                    <td><input type="number" value="0" name="score" class="score"></td>
	                    <td><input type="number" value="0" name="score" class="score"></td>
	                </tr>`;

		$('.no-rounds').remove();
		tbody.append(html);
	});

	$(document).on('change', '.score', function (e) {
		let parentTr = $(this).closest('tr');
		let scores = [];
		let gameId = $('#game-id').val();

		parentTr.find('td input').each(function (index) {
			scores.push($(this).val());
		});

		if (scores.reduce(function(acc, val) { return parseInt(acc) + parseInt(val); })) {
			alert('Tong score cua round phai bang 0')
		} else {
			$.ajax({
				url: `/game/${gameId}/save`,
				type: "POST",
				data: {
					scores: scores,
					roundIndex: parentTr.data('index')
				},
				success: function (data) {
					alert('Thanh cong');
				},
				error: function (error) {
					console.log(error);
				}
			})
		}
	});
});