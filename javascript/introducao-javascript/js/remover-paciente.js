var pacientes = document.querySelectorAll('table');

pacientes.forEach(function(paciente) {
    paciente.addEventListener('dblclick', function(){
        var alvoEvento = event.target;
        var paiDoAlvo = alvoEvento.parentNode;
        paiDoAlvo.classList.add("fadeOut");
        setTimeout(function(){
            paiDoAlvo.remove();
        }, 490);
    });
});