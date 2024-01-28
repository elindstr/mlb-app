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
    if (target.id == "primary-cards") {
        createFeaturePlayerCard(el.id)
    }
    if (target.id == "secondary-cards") {
        createPlayerCard(el.id)
    }
})