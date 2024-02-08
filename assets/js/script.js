// global variable
let myTeamId

$(function() { //on load

    // check local storage
    let myTeamIdStorage = localStorage.getItem('myTeamId');
    if (myTeamIdStorage) {
        myTeamId = myTeamIdStorage
        updateTeam()
    }

    else {
        // show modal if no local storage
        const modal = document.getElementById('teamModal');
        $('#teamModal').modal('show')
    }
});

// called if user makes selection
$("#modalSelectButton").on("click", function () {
    selectorInput = parseInt($('#modalTeamSelector').val())
    console.log(selectorInput)
    if (selectorInput !== 0) {
        myTeamId = selectorInput
        updateTeam()

        // close modal
        $('#teamModal').modal('hide')
    }
})

// update selector images
$("#modalTeamSelector").on('change', function() {
    selectorInput = parseInt($('#modalTeamSelector').val())

    var imgSrc;
    if (selectorInput === 0) {
        imgSrc = './assets/media/team-logos/mlb_logo.png'
    } else {
        imgSrc = './assets/media/team-logos/' + selectorInput + '.png'
    }

    $("#imageFile").attr('src', imgSrc)
})