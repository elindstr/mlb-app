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

drake.on('drag', function(el, source) {

    // kill mobile page scrolling while dragging an item
    function preventDefault(e) {
        e.preventDefault()
    }
    $(window).on('touchmove', preventDefault, { passive: false })
})

drake.on("drop", function (el, target, source, sibling) {
    
    // restore mobile page scrolling after the end of a drag drop
    if (el._preventDefaultHandler) {
        $(window).off('touchmove', el._preventDefaultHandler)
    }
    // transform cards into feature and vice versa when dragged to new section
    if (target.id == "primary-cards") {
        createFeaturePlayerCard(el.id)
    }
    if (target.id == "secondary-cards") {
        createPlayerCard(el.id)
    }
})

