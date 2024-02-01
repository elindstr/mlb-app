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
            if (target.children.length > 1) {
                return false
            } 
        }

        return true
    }
})

// 
$(document).ready(function() {
    $('body').on('mouseup', function () {
        console.log("mouseup")
        killDuplicates()
    })
})

function killDuplicates () {
    let uniqueList = []    
    let primaryCards = document.getElementById('primary-cards').children
    for (let i = 0; i < primaryCards.length; i ++) {
        if (!uniqueList.includes(primaryCards[i].id)) {
            uniqueList.push(primaryCards[i].id)
        }
        else {
            primaryCards[i].remove()
            break
        }
    }
    let secondaryCards = document.getElementById('secondary-cards').children
    for (let i = 0; i < secondaryCards.length; i ++) {
        if (!uniqueList.includes(secondaryCards[i].id)) {
            uniqueList.push(secondaryCards[i].id)
        }
        else {
            secondaryCards[i].remove()
            break
        }
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
