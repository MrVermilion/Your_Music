document.addEventListener('DOMContentLoaded', function () {
    // Seleciona a div de animação de abertura e o conteúdo principal
    const loadingAnimation = document.getElementById('loadingAnimation');
    const mainContent = document.getElementById('mainContent');

    // Define um tempo de exibição para a animação de abertura (3 segundos)
    setTimeout(() => {
        // Adiciona a classe 'fade-out' para iniciar a animação de saída suave
        loadingAnimation.classList.add('fade-out');
        // Espera 1 segundo para a animação de fade-out completar antes de esconder a div
        setTimeout(() => {
            loadingAnimation.style.display = 'none'; // Esconde a animação de abertura
            mainContent.style.display = 'block'; // Mostra o conteúdo principal
        }, 1000);
    }, 1550);

    // Define os players de música com seus elementos de controle
    const players = [
        { 
            audio: document.getElementById('audioPlayer1'), 
            playBtn: document.getElementById('playPauseBtn1'), 
            progressBar: document.querySelector('.player01 .progress-bar'), 
            totalTime: document.querySelector('.player01 .total-time'), 
            elapsedTime: document.getElementById('tempoDecorrido1') 
        },
        { 
            audio: document.getElementById('audioPlayer2'), 
            playBtn: document.getElementById('playPauseBtn2'), 
            progressBar: document.querySelector('.player02 .progress-bar'), 
            totalTime: document.querySelector('.player02 .total-time'), 
            elapsedTime: document.getElementById('tempoDecorrido2') 
        }
    ];

    // Define um player simples sem barra de progresso e tempo total
    const simplePlayers = [
        { 
            audio: document.getElementById('audioPlayer3'), 
            playBtn: document.getElementById('playPauseBtn3') 
        }
    ];

    // Configura eventos para os players com barra de progresso
    players.forEach(player => {
        // Evento de clique no botão play/pause
        player.playBtn.addEventListener('click', () => {
            if (player.audio.paused) {
                player.audio.play(); // Toca a música
                player.playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Altera o ícone para pause
            } else {
                player.audio.pause(); // Pausa a música
                player.playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Altera o ícone para play
            }
        });

        // Atualiza a barra de progresso e o tempo decorrido durante a reprodução
        player.audio.addEventListener('timeupdate', () => {
            const currentTime = player.audio.currentTime; // Tempo atual da música
            const duration = player.audio.duration; // Duração total da música
            player.progressBar.style.width = (currentTime / duration) * 100 + '%'; // Atualiza a barra de progresso

            // Atualiza o tempo decorrido
            const elapsedMinutes = Math.floor(currentTime / 60);
            const elapsedSeconds = Math.floor(currentTime % 60);
            player.elapsedTime.textContent = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' : ''}${elapsedSeconds}`;

            // Atualiza o tempo total
            const totalMinutes = Math.floor(duration / 60);
            const totalSeconds = Math.floor(duration % 60);
            player.totalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        });

        // Reseta os controles quando a música termina
        player.audio.addEventListener('ended', () => {
            player.playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Altera o ícone para play
            player.progressBar.style.width = '0'; // Reseta a barra de progresso
            player.elapsedTime.textContent = '00:00'; // Reseta o tempo decorrido
        });
    });

    // Configura eventos para os players simples
    simplePlayers.forEach(player => {
        // Evento de clique no botão play/pause
        player.playBtn.addEventListener('click', () => {
            if (player.audio.paused) {
                player.audio.play(); // Toca a música
                player.playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Altera o ícone para pause
            } else {
                player.audio.pause(); // Pausa a música
                player.playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Altera o ícone para play
            }
        });

        // Reseta o ícone do botão quando a música termina
        player.audio.addEventListener('ended', () => {
            player.playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Altera o ícone para play
        });
    });
});
