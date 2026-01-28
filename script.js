// ============================================================================
// TTS ENGINE - Sistema de Text-to-Speech
// ============================================================================

class TTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentUtterance = null;
        this.isPlaying = false;
        
        // Cargar voces disponibles
        this.loadVoices();
        
        // Algunos navegadores requieren este evento
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
    }
    
    getVoicesByLanguage(lang) {
        return this.voices.filter(voice => voice.lang.startsWith(lang));
    }
    
    speak(text, lang = 'en-US', rate = 1.0, pitch = 1.0, voiceName = null) {
        // Cancelar cualquier lectura en curso
        this.stop();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        
        // Seleccionar voz específica si se proporciona
        if (voiceName) {
            const voice = this.voices.find(v => v.name === voiceName);
            if (voice) utterance.voice = voice;
        } else {
            // Seleccionar la mejor voz disponible para el idioma
            const availableVoices = this.getVoicesByLanguage(lang);
            if (availableVoices.length > 0) {
                utterance.voice = availableVoices[0];
            }
        }
        
        utterance.onstart = () => {
            this.isPlaying = true;
        };
        
        utterance.onend = () => {
            this.isPlaying = false;
            this.currentUtterance = null;
        };
        
        utterance.onerror = (event) => {
            console.error('Error en TTS:', event);
            this.isPlaying = false;
        };
        
        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    }
    
    pause() {
        if (this.isPlaying) {
            this.synth.pause();
        }
    }
    
    resume() {
        if (this.synth.paused) {
            this.synth.resume();
        }
    }
    
    stop() {
        this.synth.cancel();
        this.isPlaying = false;
        this.currentUtterance = null;
    }
}

// Instancia global del TTS
const ttsEngine = new TTSEngine();

// ============================================================================
// CONTENIDOS HTML - Todas las secciones
// ============================================================================

const contenidosHTML = `
<!-- TIEMPOS VERBALES -->
<section class="seccion" id="tiempos" style="--color-seccion: #ff00ff;">
    <h2><i class="fas fa-clock"></i> Tiempos Verbales</h2>
    
    <h3>Present Simple</h3>
    <p><strong>Uso:</strong> Rutinas, hábitos y hechos generales.</p>
    <div class="ejemplo">
        <strong>Ejemplos:</strong><br>
        • Trabajo en IT → <strong>I work in IT.</strong><br>
        • Los servidores funcionan 24/7 → <strong>Servers run 24/7.</strong><br>
        • Empiezo a trabajar a las 8 → <strong>I start work at 8.</strong>
    </div>
    
    <h3>Present Continuous</h3>
    <p><strong>Uso:</strong> Acción actual o situación temporal.</p>
    <div class="ejemplo">
        <strong>Ejemplos:</strong><br>
        • Estoy estudiando inglés → <strong>I am studying English.</strong><br>
        • Estamos configurando el firewall → <strong>We are configuring the firewall.</strong><br>
        • Trabajo desde casa este mes → <strong>I am working from home this month.</strong>
    </div>
    
    <h3>Present Perfect</h3>
    <p><strong>Uso:</strong> Experiencia o pasado conectado al presente.</p>
    <div class="ejemplo">
        <strong>Ejemplos:</strong><br>
        • He trabajado 9 años en IT → <strong>I have worked in IT for 9 years.</strong><br>
        • Ya hemos terminado → <strong>We have already finished.</strong><br>
        • ¿Has usado Linux alguna vez? → <strong>Have you ever used Linux?</strong>
    </div>
    
    <h3>Past Simple</h3>
    <p><strong>Uso:</strong> Acción terminada en un momento concreto.</p>
    <div class="ejemplo">
        <strong>Ejemplos:</strong><br>
        • Instalé Debian ayer → <strong>I installed Debian yesterday.</strong><br>
        • Trabajé como técnico → <strong>I worked as a technician.</strong><br>
        • Configuramos la red → <strong>We configured the network.</strong>
    </div>
    
    <h3>Future Perfect</h3>
    <p><strong>Uso:</strong> Acción terminada antes de un momento futuro.</p>
    <div class="ejemplo">
        <strong>Ejemplos:</strong><br>
        • Para el viernes lo habré terminado → <strong>I will have finished it by Friday.</strong><br>
        • Habré aprobado → <strong>I will have passed.</strong><br>
        • Habremos configurado el sistema → <strong>We will have configured the system.</strong>
    </div>
</section>

<!-- VERBOS MODALES -->
<section class="seccion" id="modales" style="--color-seccion: #00ffff;">
    <h2><i class="fas fa-balance-scale"></i> Verbos Modales</h2>
    
    <h3>SHOULD / OUGHT TO</h3>
    <p><strong>Uso:</strong> Recomendación, consejo, expectativa lógica, crítica (con <em>should have</em>).</p>
    <div class="ejemplo">
        • Deberías actualizar el software → <strong>You should update the software.</strong><br>
        • No deberías usar contraseñas débiles → <strong>You shouldn't use weak passwords.</strong><br>
        • Ya deberían haber llegado los resultados → <strong>The results should have arrived by now.</strong>
    </div>
    
    <h3>COULD</h3>
    <p><strong>Uso:</strong> Posibilidad, capacidad en el pasado, sugerencia educada.</p>
    <div class="ejemplo">
        • Podrías probar reiniciar el servicio → <strong>You could try restarting the service.</strong><br>
        • Antes podía programar en C++ → <strong>I could code in C++ before.</strong><br>
        • Podría ser un error de sintaxis → <strong>It could be a syntax error.</strong>
    </div>
    
    <h3>MUST / HAVE TO</h3>
    <p><strong>Uso:</strong> Obligación, necesidad fuerte (must = subjetivo, have to = objetivo).</p>
    <div class="ejemplo">
        • Debes encriptar los datos sensibles → <strong>You must encrypt sensitive data.</strong><br>
        • Tenemos que entregar el informe hoy → <strong>We have to submit the report today.</strong><br>
        • No debe faltar energía → <strong>The power must not fail.</strong>
    </div>
</section>

<!-- GERUNDIO Y PARTICIPIO -->
<section class="seccion" id="gerundio" style="--color-seccion: #ffff00;">
    <h2><i class="fas fa-infinity"></i> Gerundio & Participio</h2>
    
    <h3>Gerundio (-ING)</h3>
    <p><strong>Uso:</strong> Como sujeto, tras preposiciones, tras ciertos verbos (avoid, enjoy, recommend).</p>
    <div class="ejemplo">
        • <strong>Debugging</strong> es esencial → <strong>Debugging is essential.</strong><br>
        • Antes de <strong>instalar</strong> el paquete, haz backup → <strong>Before installing the package, back up.</strong><br>
        • Evita <strong>reiniciar</strong> durante la actualización → <strong>Avoid restarting during the update.</strong>
    </div>
    
    <h3>Participio (-ED / -ING)</h3>
    <p><strong>Uso:</strong> Para formar tiempos compuestos, voz pasiva, adjetivos.</p>
    <div class="ejemplo">
        • El servidor está <strong>configurado</strong> → <strong>The server is configured.</strong><br>
        • Un error <strong>inesperado</strong> apareció → <strong>An unexpected error appeared.</strong><br>
        • He <strong>terminado</strong> la migración → <strong>I have finished the migration.</strong>
    </div>
</section>

<!-- VERBOS IT -->
<section class="seccion" id="verbos-it" style="--color-seccion: #ff5500;">
    <h2><i class="fas fa-laptop-code"></i> Verbos Típicos en Informática</h2>
    
    <table class="tabla">
        <thead>
            <tr>
                <th>Verbo</th>
                <th>Uso Común</th>
                <th>Ejemplo en Contexto</th>
            </tr>
        </thead>
        <tbody>
            <tr><td><strong>To run</strong></td><td>Ejecutar un programa/servicio</td><td><strong>Run</strong> the script with admin rights.</td></tr>
            <tr><td><strong>To deploy</strong></td><td>Desplegar una aplicación</td><td>We <strong>deploy</strong> updates every Friday.</td></tr>
            <tr><td><strong>To debug</strong></td><td>Depurar código</td><td>I spent hours <strong>debugging</strong> that function.</td></tr>
            <tr><td><strong>To compile</strong></td><td>Compilar código fuente</td><td><strong>Compile</strong> the project before testing.</td></tr>
            <tr><td><strong>To encrypt</strong></td><td>Cifrar datos</td><td>Always <strong>encrypt</strong> sensitive communications.</td></tr>
            <tr><td><strong>To back up</strong></td><td>Hacer copia de seguridad</td><td><strong>Back up</strong> the database daily.</td></tr>
            <tr><td><strong>To restore</strong></td><td>Restaurar desde copia</td><td>We <strong>restored</strong> the system after the crash.</td></tr>
            <tr><td><strong>To configure</strong></td><td>Configurar un sistema</td><td><strong>Configure</strong> the firewall properly.</td></tr>
            <tr><td><strong>To troubleshoot</strong></td><td>Diagnosticar problemas</td><td>She is <strong>troubleshooting</strong> the network issue.</td></tr>
            <tr><td><strong>To grant/revoke</strong></td><td>Conceder/revocar permisos</td><td><strong>Grant</strong> read access only to authorized users.</td></tr>
        </tbody>
    </table>
</section>

<!-- FRASES IT -->
<section class="seccion" id="frases-it" style="--color-seccion: #9d00ff;">
    <h2><i class="fas fa-comment-dots"></i> Frases Útiles en Contexto IT (C1)</h2>
    
    <ul>
        <li><strong>It is recommended that you…</strong> → Se recomienda que…</li>
        <li><strong>Failure to comply may result in…</strong> → El incumplimiento puede resultar en…</li>
        <li><strong>The system is prone to crashing if…</strong> → El sistema tiende a fallar si…</li>
        <li><strong>Should any issues arise, contact…</strong> → Si surge algún problema, contacte con…</li>
        <li><strong>This must be carried out prior to…</strong> → Esto debe llevarse a cabo antes de…</li>
        <li><strong>A thorough investigation is warranted…</strong> → Se justifica una investigación exhaustiva…</li>
        <li><strong>From a security standpoint…</strong> → Desde un punto de vista de seguridad…</li>
    </ul>
</section>

<!-- ESTRUCTURAS AVANZADAS -->
<section class="seccion" id="estructuras" style="--color-seccion: #00ffaa;">
    <h2><i class="fas fa-project-diagram"></i> Estructuras Avanzadas (C1)</h2>
    
    <h3>Condicionales Mixtos</h3>
    <div class="ejemplo">
        • If I <strong>had installed</strong> the patch earlier, the system <strong>wouldn't be</strong> vulnerable now.
    </div>
    
    <h3>Voz Pasiva Avanzada</h3>
    <div class="ejemplo">
        • The data <strong>is being encrypted</strong> as we speak.<br>
        • The server <strong>should have been configured</strong> by the team.
    </div>
    
    <h3>Reported Speech con Términos Técnicos</h3>
    <div class="ejemplo">
        • He said: "The server <strong>crashed</strong>." → He said that the server <strong>had crashed</strong>.
    </div>
    
    <h3>Inversión (Énfasis negativo)</h3>
    <div class="ejemplo">
        • <strong>Not only does</strong> it save time, but it also improves security.<br>
        • <strong>Under no circumstances should</strong> you disable the firewall.
    </div>
</section>

<!-- EXPRESIONES IDIOMÁTICAS -->
<section class="seccion" id="idiomaticas" style="--color-seccion: #ff0066;">
    <h2><i class="fas fa-star"></i> Expresiones Idiomáticas Útiles en IT</h2>
    
    <ul>
        <li><strong>To be up and running</strong> → Estar operativo.</li>
        <li><strong>To hit a snag</strong> → Encontrar un problema inesperado.</li>
        <li><strong>To go the extra mile</strong> → Hacer un esfuerzo adicional.</li>
        <li><strong>To be on the same page</strong> → Estar de acuerdo / en sintonía.</li>
        <li><strong>To think outside the box</strong> → Pensar de forma creativa.</li>
        <li><strong>To get the ball rolling</strong> → Poner en marcha un proyecto.</li>
        <li><strong>To be in the loop</strong> → Estar informado/al tanto.</li>
        <li><strong>To touch base</strong> → Ponerse en contacto brevemente.</li>
    </ul>
</section>

<!-- CONSEJOS EXAMEN -->
<section class="seccion" id="consejos" style="--color-seccion: #00ccff;">
    <h2><i class="fas fa-lightbulb"></i> Consejos para el Examen C1</h2>
    
    <ul>
        <li>Usa <strong>sinónimos avanzados</strong> (ej: <em>implement</em> en lugar de <em>do</em>).</li>
        <li>Practica la <strong>formulación de hipótesis</strong> con <em>might have</em>, <em>could have</em>.</li>
        <li>No olvides los <strong>linking words avanzados</strong>: <em>Nevertheless</em>, <em>Furthermore</em>, <em>Whereas</em>.</li>
        <li>En escritura, estructura bien: <strong>introducción, desarrollo, conclusión</strong>.</li>
        <li>En speaking, muestra fluidez y capacidad de argumentar con <strong>ejemplos técnicos</strong>.</li>
        <li>Gestión del tiempo: dedica minutos a planificar antes de escribir/hablar.</li>
        <li>Revisa siempre gramática avanzada: <strong>inversión, condicionales mixtos, énfasis</strong>.</li>
    </ul>
    
    <div class="ejemplo">
        <strong>✅ ¡RECUERDA!</strong> La práctica y la exposición a contenido técnico en inglés son clave.
    </div>
</section>

<!-- FRASES COMUNES -->
<section class="seccion" id="frases-comunes" style="--color-seccion: #aa00ff;">
    <h2><i class="fas fa-handshake"></i> Frases de Uso Común (C1)</h2>
    
    <h3>Presentarse (Profesional)</h3>
    <div class="ejemplo">
        • <strong>Allow me to introduce myself.</strong> I'm [Nombre], and I specialize in [área].<br>
        • <strong>I come from a background in</strong> [campo], with over [X] years of experience.
    </div>
    
    <h3>Debatir / Expresar Opinión</h3>
    <div class="ejemplo">
        • <strong>From where I stand,</strong> the core issue lies in scalability.<br>
        • <strong>I'd argue that</strong> a microservices approach offers greater flexibility.<br>
        • <strong>I see your point, but</strong> I tend to look at it from a different angle.
    </div>
    
    <h3>Pedir Disculpas (Profesional)</h3>
    <div class="ejemplo">
        • <strong>I sincerely apologize for</strong> the oversight in the deployment script.<br>
        • <strong>My apologies for</strong> the delayed response; I was troubleshooting an outage.
    </div>
    
    <h3>Expresar Deseo de Aprender</h3>
    <div class="ejemplo">
        • <strong>I'm eager to expand my knowledge of</strong> container orchestration.<br>
        • <strong>Could you point me toward</strong> any good resources for learning about...?
    </div>
    
    <h3>Agradecer (Avanzado)</h3>
    <div class="ejemplo">
        • <strong>Thank you for your prompt assistance;</strong> it was invaluable.<br>
        • <strong>I'm deeply indebted to the team</strong> for their support during the migration.
    </div>
    
    <h3>Admirar / Elogiar</h3>
    <div class="ejemplo">
        • <strong>I truly admire your ability to</strong> explain complex concepts clearly.<br>
        • <strong>The elegance of that solution is</strong> really impressive. Well done.
    </div>
    
    <h3>Compartir Información / Ideas</h3>
    <div class="ejemplo">
        • <strong>Based on my experience,</strong> I've found that a multi-layered cache works best.<br>
        • <strong>I'd be happy to walk you through</strong> my setup if you're interested.
    </div>
</section>

<!-- NUEVA SECCIÓN: PRÁCTICA DE LECTURA CON TTS -->
<section class="seccion" id="lectura-tts" style="--color-seccion: #ff9900;">
    <h2><i class="fas fa-volume-up"></i> Práctica de Escucha con TTS</h2>
    
    <p class="intro-tts">
        Mejora tu comprensión auditiva practicando con textos nivel C1. 
        Selecciona un texto y escúchalo en inglés o español con diferentes voces y velocidades.
    </p>
    
    <div class="tts-textos-container">
        <!-- TEXTO 1: Cloud Migration -->
        <div class="texto-card">
            <h3>
                <i class="fas fa-cloud"></i> Cloud Migration Strategy
                <span class="nivel-badge">C1 - Advanced</span>
            </h3>
            
            <div class="texto-bilingue">
                <div class="texto-columna" data-lang="en-US">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect fill='%23012169' width='60' height='30'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23FFF' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4' clip-path='inset(0)'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23FFF' stroke-width='10'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" alt="UK" class="flag-icon"> English</h4>
                    <p class="texto-contenido" id="texto1-en">
                        Migrating legacy systems to cloud infrastructure represents a substantial undertaking that demands meticulous planning and execution. Organizations must thoroughly assess their current architecture, identifying dependencies and potential bottlenecks before embarking on the transition. A phased approach is generally recommended, whereby critical services are migrated incrementally rather than attempting a wholesale shift. This methodology not only mitigates risk but also allows teams to troubleshoot issues as they arise, ensuring minimal disruption to business operations. Furthermore, security considerations must remain paramount throughout the process, with particular attention paid to data encryption, access controls, and compliance requirements. The benefits of cloud migration are manifold: enhanced scalability, improved disaster recovery capabilities, and significant cost reductions in the long term. Nevertheless, success hinges on having a well-defined strategy and the expertise to implement it effectively.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto1-en', 'en-US')">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Stop
                        </button>
                        <label>
                            Speed: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto1-en" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
                
                <div class="texto-columna" data-lang="es-ES">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect fill='%23c60b1e' width='3' height='2'/%3E%3Crect fill='%23ffc400' y='0.66' width='3' height='0.66'/%3E%3C/svg%3E" alt="ES" class="flag-icon"> Español</h4>
                    <p class="texto-contenido" id="texto1-es">
                        Migrar sistemas heredados a infraestructura en la nube representa una empresa sustancial que demanda planificación y ejecución meticulosas. Las organizaciones deben evaluar minuciosamente su arquitectura actual, identificando dependencias y posibles cuellos de botella antes de embarcarse en la transición. Generalmente se recomienda un enfoque por fases, mediante el cual los servicios críticos se migran de forma incremental en lugar de intentar un cambio total. Esta metodología no solo mitiga el riesgo, sino que también permite a los equipos solucionar problemas a medida que surgen, garantizando una interrupción mínima en las operaciones comerciales. Además, las consideraciones de seguridad deben permanecer primordiales durante todo el proceso, prestando especial atención al cifrado de datos, controles de acceso y requisitos de cumplimiento normativo. Los beneficios de la migración a la nube son múltiples: escalabilidad mejorada, capacidades superiores de recuperación ante desastres y reducciones significativas de costos a largo plazo. No obstante, el éxito depende de tener una estrategia bien definida y la experiencia para implementarla eficazmente.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto1-es', 'es-ES')">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pausar
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Detener
                        </button>
                        <label>
                            Velocidad: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto1-es" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- TEXTO 2: Cybersecurity -->
        <div class="texto-card">
            <h3>
                <i class="fas fa-shield-alt"></i> Cybersecurity Best Practices
                <span class="nivel-badge">C1 - Advanced</span>
            </h3>
            
            <div class="texto-bilingue">
                <div class="texto-columna" data-lang="en-US">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect fill='%23012169' width='60' height='30'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23FFF' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4' clip-path='inset(0)'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23FFF' stroke-width='10'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" alt="UK" class="flag-icon"> English</h4>
                    <p class="texto-contenido" id="texto2-en">
                        In an era where cyber threats are increasingly sophisticated, implementing robust security measures has become imperative for organizations of all sizes. The principle of defense in depth advocates for multiple layers of security controls, ensuring that should one measure fail, others remain in place to thwart potential breaches. Regular security audits and penetration testing are essential to identify vulnerabilities before malicious actors can exploit them. Moreover, employee training constitutes a critical component of any comprehensive security strategy, as human error remains one of the most significant security risks. Two-factor authentication, encryption of sensitive data both at rest and in transit, and maintaining up-to-date software patches represent fundamental practices. Organizations should also establish incident response protocols to enable swift action in the event of a security breach. Ultimately, cybersecurity is not merely a technical challenge but an ongoing commitment that requires vigilance, resources, and a culture of security awareness throughout the organization.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto2-en', 'en-US')">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Stop
                        </button>
                        <label>
                            Speed: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto2-en" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
                
                <div class="texto-columna" data-lang="es-ES">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect fill='%23c60b1e' width='3' height='2'/%3E%3Crect fill='%23ffc400' y='0.66' width='3' height='0.66'/%3E%3C/svg%3E" alt="ES" class="flag-icon"> Español</h4>
                    <p class="texto-contenido" id="texto2-es">
                        En una era donde las amenazas cibernéticas son cada vez más sofisticadas, implementar medidas de seguridad robustas se ha vuelto imperativo para organizaciones de todos los tamaños. El principio de defensa en profundidad aboga por múltiples capas de controles de seguridad, asegurando que si una medida falla, otras permanezcan en su lugar para frustrar posibles brechas. Las auditorías de seguridad regulares y las pruebas de penetración son esenciales para identificar vulnerabilidades antes de que actores maliciosos puedan explotarlas. Además, la capacitación de empleados constituye un componente crítico de cualquier estrategia de seguridad integral, ya que el error humano sigue siendo uno de los riesgos de seguridad más significativos. La autenticación de dos factores, el cifrado de datos sensibles tanto en reposo como en tránsito, y el mantenimiento de parches de software actualizados representan prácticas fundamentales. Las organizaciones también deberían establecer protocolos de respuesta a incidentes para permitir una acción rápida en caso de una brecha de seguridad. En última instancia, la ciberseguridad no es meramente un desafío técnico sino un compromiso continuo que requiere vigilancia, recursos y una cultura de conciencia de seguridad en toda la organización.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto2-es', 'es-ES')">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pausar
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Detener
                        </button>
                        <label>
                            Velocidad: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto2-es" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- TEXTO 3: Agile Development -->
        <div class="texto-card">
            <h3>
                <i class="fas fa-sync-alt"></i> Agile Software Development
                <span class="nivel-badge">C1 - Advanced</span>
            </h3>
            
            <div class="texto-bilingue">
                <div class="texto-columna" data-lang="en-US">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect fill='%23012169' width='60' height='30'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23FFF' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4' clip-path='inset(0)'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23FFF' stroke-width='10'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" alt="UK" class="flag-icon"> English</h4>
                    <p class="texto-contenido" id="texto3-en">
                        Agile methodologies have fundamentally transformed the landscape of software development by emphasizing flexibility, collaboration, and iterative progress. Unlike traditional waterfall approaches, which follow a rigid sequential process, Agile frameworks such as Scrum and Kanban promote adaptive planning and evolutionary development. Sprint cycles, typically lasting two to four weeks, enable teams to deliver functional increments of software regularly, thereby facilitating continuous feedback from stakeholders. Daily stand-up meetings foster transparency and accountability, allowing team members to identify impediments promptly and adjust their strategies accordingly. The retrospective meetings held at the conclusion of each sprint provide valuable opportunities for reflection and continuous improvement. However, successful Agile implementation requires more than merely adopting specific practices; it necessitates a cultural shift toward embracing change, empowering teams, and prioritizing customer satisfaction. Organizations that fully commit to Agile principles often experience enhanced productivity, higher quality deliverables, and improved team morale.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto3-en', 'en-US')">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Stop
                        </button>
                        <label>
                            Speed: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto3-en" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
                
                <div class="texto-columna" data-lang="es-ES">
                    <h4><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect fill='%23c60b1e' width='3' height='2'/%3E%3Crect fill='%23ffc400' y='0.66' width='3' height='0.66'/%3E%3C/svg%3E" alt="ES" class="flag-icon"> Español</h4>
                    <p class="texto-contenido" id="texto3-es">
                        Las metodologías ágiles han transformado fundamentalmente el panorama del desarrollo de software al enfatizar la flexibilidad, la colaboración y el progreso iterativo. A diferencia de los enfoques tradicionales en cascada, que siguen un proceso secuencial rígido, los marcos ágiles como Scrum y Kanban promueven la planificación adaptativa y el desarrollo evolutivo. Los ciclos de sprint, que típicamente duran de dos a cuatro semanas, permiten a los equipos entregar incrementos funcionales de software regularmente, facilitando así la retroalimentación continua de las partes interesadas. Las reuniones diarias de pie fomentan la transparencia y la responsabilidad, permitiendo a los miembros del equipo identificar impedimentos rápidamente y ajustar sus estrategias en consecuencia. Las reuniones retrospectivas realizadas al final de cada sprint proporcionan valiosas oportunidades para la reflexión y la mejora continua. Sin embargo, la implementación exitosa de Agile requiere más que simplemente adoptar prácticas específicas; necesita un cambio cultural hacia abrazar el cambio, empoderar a los equipos y priorizar la satisfacción del cliente. Las organizaciones que se comprometen plenamente con los principios ágiles a menudo experimentan una productividad mejorada, entregables de mayor calidad y una moral de equipo superior.
                    </p>
                    <div class="tts-controls">
                        <button class="btn-tts btn-play" onclick="playText('texto3-es', 'es-ES')">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button class="btn-tts btn-pause" onclick="ttsEngine.pause()">
                            <i class="fas fa-pause"></i> Pausar
                        </button>
                        <button class="btn-tts btn-stop" onclick="ttsEngine.stop()">
                            <i class="fas fa-stop"></i> Detener
                        </button>
                        <label>
                            Velocidad: 
                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="speed-slider" id="speed-texto3-es" oninput="this.nextElementSibling.textContent = this.value + 'x'">
                            <span class="speed-value">1x</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="tts-info">
        <h3><i class="fas fa-info-circle"></i> Consejos para la Práctica de Escucha</h3>
        <ul>
            <li><strong>Escucha activa:</strong> Primero escucha sin leer, luego compara con el texto.</li>
            <li><strong>Varía la velocidad:</strong> Comienza a velocidad normal, luego aumenta gradualmente.</li>
            <li><strong>Practica bilingüe:</strong> Escucha en ambos idiomas para mejorar la comprensión.</li>
            <li><strong>Repite secciones:</strong> Identifica palabras o frases difíciles y repítelas.</li>
            <li><strong>Sombrea (Shadowing):</strong> Intenta repetir lo que escuchas simultáneamente.</li>
        </ul>
    </div>
</section>

<div class="final">
    <h3 class="neon-text" style="text-align: center; margin-top: 50px;">FIN DE LA CHULETA — ¡MUCHA SUERTE EN EL EXAMEN! 🚀</h3>
</div>
`;

// ============================================================================
// FUNCIÓN PARA REPRODUCIR TEXTO CON TTS
// ============================================================================

function playText(elementId, lang) {
    const textElement = document.getElementById(elementId);
    const speedSlider = document.getElementById('speed-' + elementId);
    
    if (!textElement) {
        console.error('Elemento no encontrado:', elementId);
        return;
    }
    
    const text = textElement.textContent.trim();
    const speed = speedSlider ? parseFloat(speedSlider.value) : 1.0;
    
    // Reproducir con TTS
    ttsEngine.speak(text, lang, speed, 1.0);
    
    // Feedback visual
    const allPlayButtons = document.querySelectorAll('.btn-play');
    allPlayButtons.forEach(btn => btn.classList.remove('playing'));
    
    const playButton = textElement.closest('.texto-columna').querySelector('.btn-play');
    if (playButton) {
        playButton.classList.add('playing');
    }
}

// ============================================================================
// CARGA DE CONTENIDOS Y NAVEGACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contenidoDiv = document.getElementById('contenido');
    const cardsIndice = document.querySelectorAll('.card-indice');
    
    // Función para cargar la sección seleccionada
    function cargarContenido(idSeccion) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contenidosHTML, 'text/html');
        const seccion = doc.getElementById(idSeccion);
        
        if (seccion) {
            contenidoDiv.innerHTML = seccion.outerHTML;
            
            // Scroll suave al contenido
            contenidoDiv.scrollIntoView({ behavior: 'smooth' });
            
            // Actualizar URL hash
            window.location.hash = idSeccion;
        } else {
            contenidoDiv.innerHTML = `<div class="error"><p>Sección no encontrada.</p></div>`;
        }
    }
    
    // Cargar la primera sección por defecto
    cargarContenido('tiempos');
    
    // Event listeners para las cards del índice
    cardsIndice.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Efecto visual en la card clickeada
            cardsIndice.forEach(c => c.classList.remove('activa'));
            this.classList.add('activa');
            
            // Cargar contenido
            cargarContenido(targetId);
        });
    });
    
    // Soporte para navegación por URL hash
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        cargarContenido(hashId);
    }
});
