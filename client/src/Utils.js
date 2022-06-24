function formatTimestamp(datetime) {

    var an = 0, luna = 0, ziua = 0, ora = 0, minutul = 0;

    for (var i = 0; i < 4; i++) {
        an = (an * 10) + parseInt(datetime[i]);

    }
    for (var i = 5; i < 7; i++) {
        luna = (luna * 10) + parseInt(datetime[i]);

    }
    for (var i = 8; i < 10; i++) {
        ziua = (ziua * 10) + parseInt(datetime[i]);

    }
    for (var i = 11; i < 13; i++) {
        ora = (ora * 10) + parseInt(datetime[i]);
    }
    ora+=3;
    for (var i = 14; i < 16; i++) {
        minutul = (minutul * 10) + parseInt(datetime[i]);
    }
    return(
        <>
        {ziua}/{luna}/{an} ora: {ora}:{minutul}
        </>
    )
}

export {
    formatTimestamp
} 