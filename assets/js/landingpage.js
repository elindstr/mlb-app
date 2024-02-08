$(document).ready(function() {
	$("#teamID").on('change', function() {
		var selTeamID = $(this).val()
		selTeamID = (isNaN(selTeamID) || selTeamID == '' || typeof selTeamID === 'undefined') ? 0 : parseInt(selTeamID)
		if (selTeamID == 0) {
			$("#imageFile").attr('src', './assets/media/team-logos/mlb_logo.png');
		} else {
			$("#imageFile").attr('src', './assets/media/team-logos/'+selTeamID+'.png');
		}
        //console.log($("#imageFile"))
	})
})