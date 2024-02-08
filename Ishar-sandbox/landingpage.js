$(document).ready(function()
{
	$("#teamID").on('change', function()
	{
		var selTeamID = $(this).val();
		console.log(selTeamID)
		selTeamID = (isNaN(selTeamID) || selTeamID == '' || typeof selTeamID === 'undefined') ? 0 : parseInt(selTeamID);

		if(selTeamID == 0)
		{
			$("#imageFile").attr('src', './assets/media2/team-logos/mlb logo download.png');

		}
		else 
		{
			$("#imageFile").attr('src', './assets/media2/team-logos/'+selTeamID+'.png');
		}
        console.log($("#imageFile"))


	});
});
