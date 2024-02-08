// run on load
$(function() {
    myTeamId = "137" // default
    getLocalStorage()

    updateTeam()
    checkforEmptyDropBoxes()
})

// for development use in console: 
//      localStorage.removeItem('myTeamId');

function getLocalStorage() {
    let myTeamIdStorage = localStorage.getItem('myTeamId');
    if (myTeamIdStorage) {
        myTeamId = myTeamIdStorage
    }
    else {
        // display modal for new users
        // ...

    }
}


$(document).ready(function()
{
	$("#teamID").on('change', function()
	{
		var selTeamID = $(this).val();
		console.log(selTeamID)
		selTeamID = (isNaN(selTeamID) || selTeamID == '' || typeof selTeamID === 'undefined') ? 0 : parseInt(selTeamID);

		if(selTeamID == 0)
		{
			$("#imageFile").attr('src', './assets/media/team-logos/mlb logo download.png');

		}
		else 
		{
			$("#imageFile").attr('src', './assets/media/team-logos/'+selTeamID+'.png');
		}
        console.log($("#imageFile"))


	});
});
