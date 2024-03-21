function iniciarLeitura() {
    const botaoLer = document.getElementById('botaoLer');
    const audioPlayer = document.getElementById('audioPlayer');
    let utterance;
    let isLendo = false;
    let lastCharIndex = 0;

    botaoLer.addEventListener('click', function () {
        // Encontrar o primeiro elemento de conteúdo após o cabeçalho
        const primeiroElementoDeConteudo = document.querySelector('body > *:not(header)');
        
        // Verificar se foi encontrado algum elemento de conteúdo
        if (primeiroElementoDeConteudo) {
            const texto = pegarTextoElemento(primeiroElementoDeConteudo);
            if (!isLendo) {
                isLendo = true;
                botaoLer.classList.add('pausado'); // Adiciona a classe 'pausado' para alterar o ícone
                botaoLer.textContent = 'Pause';
                if (!utterance) {
                    utterance = new SpeechSynthesisUtterance(texto);
                    utterance.lang = 'pt-BR'; // Define o idioma como português do Brasil
                    utterance.onend = function () {
                        isLendo = false;
                        botaoLer.textContent = 'Play';
                        botaoLer.classList.remove('pausado'); // Remove a classe 'pausado' para alterar o ícone de volta para play
                    };
                } else {
                    window.speechSynthesis.resume();
                }
                utterance.text = texto;
                window.speechSynthesis.speak(utterance);
                audioPlayer.src = URL.createObjectURL(new Blob([texto], { type: 'text/plain' }));
            } else {
                isLendo = false;
                botaoLer.classList.remove('pausado'); // Remove a classe 'pausado' para alterar o ícone de volta para play
                botaoLer.textContent = 'Play';
                window.speechSynthesis.pause();
            }
        } else {
            alert('Não há conteúdo para ler.');
        }
    });

    // Função para pegar o texto de um elemento e seus filhos
    function pegarTextoElemento(elemento) {
        let texto = '';
        const filhos = elemento.childNodes;
        filhos.forEach(filho => {
            if (filho.nodeType === Node.TEXT_NODE) {
                texto += filho.textContent.trim() + ' ';
            } else if (filho.nodeType === Node.ELEMENT_NODE) {
                texto += pegarTextoElemento(filho);
            }
        });
        return texto.trim();
    }
}