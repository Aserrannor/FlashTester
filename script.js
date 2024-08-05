$(document).ready(function() {
    let interval;
    let isBlinking = false;

    $('#startButton').click(function() {
        if (isBlinking) {
            clearInterval(interval);
            $('#indicator').css('background-color', 'grey');
            isBlinking = false;
            $(this).text('Démarrer');
        } else {
            let frequency = parseFloat($('#frequency').val());
            let dutyCycle = parseFloat($('#dutyCycle').val()) / 100;
            if (isNaN(frequency) || isNaN(dutyCycle) || frequency <= 0 || dutyCycle <= 0 || dutyCycle > 1) {
                alert('Veuillez entrer des valeurs valides.');
                return;
            }

            let onTime = dutyCycle / frequency * 1000;
            let offTime = (1 - dutyCycle) / frequency * 1000;

            interval = setInterval(function() {
                $('#indicator').css('background-color', function(_, currentColor) {
                    return currentColor === 'rgb(128, 128, 128)' ? 'green' : 'grey';
                });
            }, onTime + offTime);

            isBlinking = true;
            $(this).text('Arrêter');
        }
    });
});
