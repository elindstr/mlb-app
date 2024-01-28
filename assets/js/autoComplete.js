// docs: https://jqueryui.com/autocomplete/

$( function() {
let autoItems = autoIds.map(function(item) {  
    return {
        label: `${item[0]} (${item[2]})`, // display: ':player name (:team)'
        value: item[1]  // TODO: This is messing up the label display when selected. Need to set the player_id as a data-value, so that it doesn't mess up the display label.
    }
});

$( "#searchQuery" ).autocomplete({
    source: autoItems,
    minLength: 1,
    select: function(event, ui) {
        event.preventDefault();
        $(this).val(ui.item.label); // restore label to text
        //console.log(ui.item.label, ui.item.value)
        createPlayerCard(ui.item.value)
    }
});
} );