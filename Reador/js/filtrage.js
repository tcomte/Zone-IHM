idRowFiltrage = 0;

function changeDropdownKeyword(toto) {
	$('#dropdownKeyword').val(toto);
	$('#dropdownKeyword').html(toto);
}

function addFiltre() {
	if ($('#keyword').val() == "") {
		return false
	}
	var id = 1;
	var classtr = "";
	if ($('#dropdownKeyword').val() == "ET") {
		id = 1;
		classtr = 'success';
	} else if ($('#dropdownKeyword').val() == "OU") {
		id = 0;
		classtr = 'info';
	} else if ($('#dropdownKeyword').val() == "SANS") {
		id = 2;
		classtr = 'error';
	}

	var motcle = $('#keyword').val();
	$('#tablesynonyme tbody > tr > td > label > input').each(function() {
		if ($(this).is(':checked')) {
			motcle += ', ' + $(this).val();
		}
	});
	var attr = $('#dropdownKeyword').html();
	if($('#tablefiltrage tr').length ==1)
		attr="";
	$('#tablefiltrage').append('<tr id="idrow' + idRowFiltrage + '" class="' + classtr + '"><td hidden>' + id + '</td><td class="tdkey">' + attr + '</td><td class="tdval span3">' + motcle + '</td><td><button class="btn"><i class="icon-remove" onclick="removelinefiltrage(\'idrow' + idRowFiltrage + '\')"></i></button></td></tr>');
	idRowFiltrage += 1;

	rebootFiltrage();
	//tritable();
	affichfiltre();
}

function rebootFiltrage() {
	$('#keyword').val('');
	$('#dropdownKeyword').text("ET");
	$('#dropdownKeyword').val("ET");
	unselect();
	$('#tablesynonyme tbody > tr').each(function() {
		$(this).remove();
	});
}

function tritable() {
	var rowCount = $('#tablefiltrage >tbody >tr').length;
	if (rowCount != 0) {
		$("#tablefiltrage").tablesorter({
			sortList : [[0, 0]]
		});
	}
}

function affichfiltre() {
	$("#areafiltre").val('');
	var i = 0;
	$('#tablefiltrage tbody > tr').each(function() {
		if (i == 0)
			$("#areafiltre").val($("#areafiltre").val() + $(this).find('td.tdval').html() + ' ');
		else
			$("#areafiltre").val($("#areafiltre").val() + $(this).find('td.tdkey').html() + ' ' + $(this).find('td.tdval').html() + ' ');
		i++;
	});

}

function select() {
	$('#tablesynonyme tbody > tr > td > label > input').each(function() {
		$(this).prop('checked', true);
	});
}

function unselect() {
	$('#tablesynonyme tbody > tr > td > label > input').each(function() {
		$(this).prop('checked', false);
	});
}

function removelinefiltrage(line) {
	$('#' + line).remove();
	var usersTable = $("#tablefiltrage");
	usersTable.trigger("update");

	affichfiltre();
}

function MAJtablesynonyme() {
	if ($('#keyword').val() == "") {
		$('#tablesynonyme tbody > tr').each(function() {
			$(this).remove();
		});
	}
	$('#fakesynonyme tbody > tr').each(function() {
		if ($('#keyword').val() == $(this).find('td.mot').html()) {
			$('#tablesynonyme').append('<tr><td><label class="checkbox"><input type="checkbox" value="' + $(this).find('td.synonyme').html() + '">' + $(this).find('td.synonyme').html() + '</label></td></tr>');
		}
	});
}

