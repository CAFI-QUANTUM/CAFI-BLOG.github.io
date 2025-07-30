// mail-popup.js
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        // Crear HTML del popup dinámicamente
        const popupHTML = `
            <div class="overlay" id="mailOverlay" style="display:none;"></div>
            <div class="mail-popup" id="mailPopup" style="display:none;">
                <h3>Abrir correo con:</h3>
                <a id="gmailLink" target="_blank">Gmail</a>
                <a id="outlookLink" target="_blank">Outlook</a>
                <a href="#" id="copyEmail">Copiar correo</a>
                <div id="copyFeedback" style="color: #ffffffff; font-size: 14px; display: none;">¡Correo copiado!</div>
                <div class="close-btn" onclick="closePopup()">Cerrar</div>
            </div>
        `;
        const style = document.createElement('style');
        style.textContent = `
            .mail-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #000;
                border: 2px solid #fff;
                box-shadow: 0 0 15px aqua, 0 0 30px #0059ff;
                padding: 20px;
                border-radius: 10px;
                z-index: 9999;
                display: none;
                text-align: center;
                font-family: Arial, sans-serif;
                color: #fff;
            }
            .mail-popup h3 {
                color: #fff;
                margin-bottom: 15px;
            }
            .mail-popup a {
                display: block;
                margin: 10px auto;
                text-decoration: none;
                width: 200px;
                background: transparent;
                border: 2px solid var(--neon-1);
                color: var(--text-color);
                padding: 10px 20px;
                font-size: 1em;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 0 8px var(--neon-1);
                transition: all 0.3s ease;
            }
            .mail-popup a:hover {
                    background: var(--neon-1);
                    color: #000;
                    box-shadow: 0 0 20px var(--neon-1), 0 0 30px var(--neon-2);
                    transform: scale(1.05);
            }
            .overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                z-index: 9998;
                display: none;
            }
            .close-btn {
                margin-top: 10px;
                cursor: pointer;
                color: #fff;
                text-decoration: underline;
                font-family: "Doto", sans-serif;
                font-optical-sizing: auto;
                font-weight: <weight>;
                font-style: normal;
                font-variation-settings:
                "ROND" 0;
            }
        `;
        document.head.appendChild(style);
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('mailPopup');
        const overlay = document.getElementById('mailOverlay');
        const gmailLink = document.getElementById('gmailLink');
        const outlookLink = document.getElementById('outlookLink');
        const copyEmailBtn = document.getElementById('copyEmail');
        const feedback = document.getElementById('copyFeedback');

        window.closePopup = function () {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            feedback.style.display = 'none';
        }

        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = copyEmailBtn.dataset.email;
            navigator.clipboard.writeText(email).then(() => {
                feedback.style.display = 'block';
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 2000);
            });
        });

        // Buscar todos los enlaces con clase "mailtoui"
        document.querySelectorAll('a.mailtoui[href^="mailto:"]').forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                const email = el.href.replace('mailto:', '');

                gmailLink.href = `https://mail.google.com/mail/?view=cm&to=${email}&su=Hola`;
                outlookLink.href = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}&subject=Hola`;
                copyEmailBtn.dataset.email = email;

                popup.style.display = 'block';
                overlay.style.display = 'block';
            });
        });

        overlay.addEventListener('click', window.closePopup);
    });
})();
