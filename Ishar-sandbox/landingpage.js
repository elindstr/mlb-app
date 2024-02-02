$(document).ready(function()
{
    $("#team").modal('show');
    // $('#teanModal').modal({backdrop: static, keyboard: false})

	$("#teamID").on('change', function()
	{
		var selTeamID = $(this).val();
		console.log(selTeamID)
		if(selTeamID == 1)
		{
			$("#imageFile").attr('src', './assets/MLBTeamlogos/ArizonaDiamondbacks.gif');
		}
		else if(selTeamID == 2)
		{
			$("#imageFile").attr('src', './assets/MLBTeamlogos/AtlantaBraves.gif');
		}
		else if(selTeamID == 3)
		{
			$("#imageFile").attr('src', './assets/MLBTeamlogos/BaltimoreOrioles.gif');
		}

		else
		{
			$("#imageFile").attr('src', './assets/media/team-logos/mlb logo download.png');
		}
        console.log($("#imageFile"))
	});

	














});


