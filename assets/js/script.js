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