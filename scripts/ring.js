
main(actor,item)

// game.actors.getName("tom")
// canvas.tokens.controlled[0]



// game.actors.getName("tom").getActiveTokens().forEach(function(o){o.toggleEffect(
//     new ActiveEffect({"label":"huhu","duration":{"seconds":20},"icon": "icons/svg/aura.svg"})
// )})
//
// game.items.find(function(o){return o.name=="Wellenläufer"})
//
//
// game.actors.getName("tom").getActiveTokens().forEach(function(o){o.toggleEffect(
//     game.items.find(function(o){return o.name=="Wellenläufer"})
// )})

async function main(actor,item)
{

    if ( item.system.structure.value < 1 )
    {
        ui.notifications.error("Nichts geschieht.");
        return;
    }

    let wellenlaufen = await CONFIG.statusEffects.find(function(o){
        return o.id=="wellenlaufen";
    });

    if(!wellenlaufen || !wellenlaufen.id)
    {
        wellenlaufen = JSON.parse(JSON.stringify(CONFIG.statusEffects[4]));
        wellenlaufen.id ="wellenlaufen"
        wellenlaufen.description = "Kann für eine kurze Zeit über Wasser laufen, als wäre es fest."
        wellenlaufen.label ="Wellenlaufen (Segen des Wasserdschinn)";
        wellenlaufen.icon ="tomsCore/wellen4.png";

    }else
    {
        ui.notifications.error("wellenlaufen gibt es bereits "+wellenlaufen.description);
    }

    let zufall = getRandomIntInclusive(1,20);
    let structure = item.system.structure.value;
    if(zufall > structure)
    {
        structure--;
        item.update({"system.structure.value":structure})
    }


    actor.getActiveTokens().forEach(function(o){o.toggleEffect(wellenlaufen)});

    game.actors.getName("tom").addCondition({
        "label":"Wellenlaufen (Segen des Wasserdschinn)"
        ,"icon":"tomsCore/wellen4.png"
        ,"duration":
        ,"flags":{
            "dsa5":{}

        }})


}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
