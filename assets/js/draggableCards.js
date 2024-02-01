// docs here: https://github.com/bevacqua/dragula

// TODO: prevent pulling roster cards into other sections and creating duplicate players
// TODO: remove element if dropped outside of container


var drake = dragula([
    document.getElementById('primary-cards'), 
    document.getElementById('secondary-cards'), 
    document.getElementById('asideSection')], {

    moves: function (el, target, source, sibling) {
        // don't sort 'asideSection' if asideIsSortable is 'false'
        if ($(source).attr('id') == 'asideSectionX') {
            return false;
        }
        return true
    },

    accepts: function (el, target, source, sibling) {

        // don't sort 'asideSection' if asideIsSortable is 'false'
        if ($(target).attr('id') == 'asideSectionX') {
            return false;
        }

        // don't sort 'primary-cards' if it already has 2 items
        if (target === document.getElementById('primary-cards')) {
            console.log(target.children.length)
            if ( (target.children.length > 1) || (isDuplicate(el.id)) ) {
                return false
            } 
        }
        
        // don't sort 'secondary-cards' if el is a duplicate
        if (target === document.getElementById('secondary-cards') ) {
            if (isDuplicate(el.id)) {
             return false
            }
        }

        return true
    }
})

// 
function isDuplicate(elID) {
    let uniqueID = true
    let cardCount = $('#primary-cards').children().length

    for (let i = 0; i < cardCount; i++) {
        if (elID == $('#primary-cards').children().eq(i).attr('id')) {
            badSection = "primary-cards"
            uniqueID = false 
            break
        }
    }
    cardCount = $('#secondary-cards').children().length
    for (let i = 0; i < cardCount; i++) {
        if (elID == $('#secondary-cards').children().eq(i).attr('id')) {
            badSection = "secondary-cards"
            uniqueID = false 
            break
        }
    }              
    if (!uniqueID) {
        // $(`#${badSection} #${el.id}`).remove()
        return true
    }
    else {
        return false
    }
}



drake.on('drop', function (el, target, source, sibling) {
    
    // transform cards into feature and vice versa when dragged to new section
    if (target.id == 'primary-cards') {
        createFeaturePlayerCard(el.id)
    }
    if (target.id == 'secondary-cards') {
        createPlayerCard(el.id)
    }
    if (target.id == 'asideSection') {
        getAsideRoster()
    }
    if (source.id == 'asideSection') {
        getAsideRoster()
    }

})

// killing mobile scrolling/navigation when touching 
$(document).on('touchmove', '#primary-cards, #secondary-cards', function(event) {
    event.preventDefault()
}, { passive: false })
drake.on('drag', function(el, source) {
    $('body').css('touch-action', 'none')
})
