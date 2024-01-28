// docs here: https://github.com/bevacqua/dragula

var drake = dragula([document.getElementById('secondary-cards'), document.getElementById('primary-cards')], {
    accepts: function (el, target, source, sibling) {
        if (target === document.getElementById('primary-cards')) {
            return target.children.length < 2
        }
        else {
            return true
        }
    }
});

drake.on("drop", function (el, target, source, sibling) {
    
    // transform cards into feature and vice versa when dragged to new section
    if (target.id == "primary-cards") {
        createFeaturePlayerCard(el.id)
    }
    if (target.id == "secondary-cards") {
        createPlayerCard(el.id)
    }
})

// killing mobile scrolling/navigation when touching 
$(document).on('touchmove', '#primary-cards, #secondary-cards', function(event) {
    event.preventDefault()
}, { passive: false });
drake.on('drag', function(el, source) {
    $('body').css('touch-action', 'none')
});
