main( actor, item )

async function main ( actor, item )
{

    const dauer = await new Roll("d6").roll({async:false}).total;// in Minuten
    const detailInfo = "Fallschaden wird weiterhin durch Wasser reduziert und auch bewusstes Eintauchen bleibt möglich. Befindet sich der Anwender unter Wasser kann er leicht auf die Oberfläche klettern."
    const msgheader = "<h2>Segen des Wasserdschinn</h2> ";
    const msgtext = msgheader + actor.name + " kann für eine kurze Zeit über Wasser laufen.<br/>" ;
    const description = "Kann für eine kurze Zeit über Wasser laufen, als wäre es fest. " + detailInfo;
    let verbrauch = "<h4>Der Ringstein ist dunkler und kleiner geworden.</h4>";
    const endVerbrauch = "<h4>Der Ringstein ist nun vollständig verschwunden</h4>";
    const label = "Wellenlaufen";
    const icon = "modules/tm-arsenal/media/wellen4.png";
    const duration = dauer * 60;
    const tmData = { "itemId": "wellenlaufen.ring" };
    const ringdescriptionverbraucht ='   <p><span style="font-family: Signika">Ein schön gearbeiteter silberner Ring, aber der Schmuckstein scheint zu fehlen. Ein Delphin und Wellenmuster sind eingraviert. </span></p><p><span style="font-family: Signika">Er scheint keine magischen Kräfte zu haben.</span></p>\n';
    const ringdescriptionnew ='   <p><span style="font-family: Signika">Ein schön gearbeiteter silberner Ring mit blauem Schmuckstein. Ein Delphin und Wellenmuster sind eingraviert. </span></p><p><span style="font-family: Signika">Man sagt er habe magische Kräfte.</span></p>\n';

    if ( actor.effects.find( function ( o ) {
        return o?.flags?.tmData?.itemId == tmData.itemId
    } ) )
    {
        ui.notifications.error( "Du bist bereits verzaubert." );
        return;
    }

    if ( item.system.structure.value < 1 )
    {
        ui.notifications.error( "Nichts geschieht. Der Ring hat all seine Kraft verloren." );
        return;
    }

    const zufall = await new Roll("d20").roll({async:false}).total;
    let structure = item.system.structure.value;

    if ( zufall > structure )
    {
        structure--;
        let updateData = { "system.structure.value": structure };
        if(structure<1)
        {
            verbrauch = endVerbrauch;
            updateData["system.description.value"] = ringdescriptionverbraucht;
        }
        item.update( updateData )
    }
     actor.addCondition( {
        "label": label,
        "icon": icon,
        "duration": { "seconds": duration },
        "flags": {
            "dsa5": {
                "description": description
            },
            "tmData": tmData
        }
    } );

    ChatMessage.create( {
        "content": msgtext+ "<br>" + verbrauch + "<br>" + detailInfo,
        "speaker": { "alias": item.name }
    } )


}
