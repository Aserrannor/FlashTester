$(document).ready(function() {
    let interval;
    let isBlinking = false;

    $('#startButton').click(function() {
        if (isBlinking) {
            // Arrêter le clignotement
            clearInterval(interval);
            $('#indicator').css('background-color', 'grey');
            isBlinking = false;
            $(this).text('Démarrer');
        } else {
            // Récupérer les valeurs de fréquence et de rapport cyclique
            let frequency = parseFloat($('#frequency').val());
            let dutyCycle = parseFloat($('#dutyCycle').val()) / 100;

            // Valider les entrées
            if (isNaN(frequency) || isNaN(dutyCycle) || frequency <= 0 || dutyCycle <= 0 || dutyCycle > 1) {
                alert('Veuillez entrer des valeurs valides.');
                return;
            }

            // Calculer les temps allumé et éteint en millisecondes
            let period = 1000 / frequency; // Période en millisecondes
            let onTime = dutyCycle * period;
            let offTime = (1 - dutyCycle) * period;

            // Démarrer le clignotement
            interval = setInterval(function() {
                $('#indicator').css('background-color', 'green');
                setTimeout(function() {
                    $('#indicator').css('background-color', 'grey');
                }, onTime);
            }, period);

            isBlinking = true;
            $(this).text('Arrêter');
        }
    });
});
