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

<!-- CONVERSACIONES COTIDIANAS -->
<section class="seccion" id="conversaciones-cotidianas" style="--color-seccion: #ff6600;">
    <h2><i class="fas fa-coffee"></i> Conversaciones Cotidianas</h2>
    
    <h3>En el Restaurante</h3>
    <div class="dialogo">
        <p><strong>Waiter:</strong> Good evening! Welcome to our restaurant. Do you have a reservation?</p>
        <p><strong>Customer:</strong> Yes, I booked a table for two under the name García.</p>
        <p><strong>Waiter:</strong> Perfect, Mr. García. Right this way, please. Here are your menus. Can I get you something to drink while you decide?</p>
        <p><strong>Customer:</strong> I'd like a glass of red wine, please. And my wife will have sparkling water.</p>
        <p><strong>Waiter:</strong> Excellent choice. I'll be back in a moment with your drinks.</p>
    </div>
    <div class="dialogo">
        <p><strong>Customer:</strong> Excuse me, could we see the dessert menu, please?</p>
        <p><strong>Waiter:</strong> Of course! Here you go. Our chocolate lava cake is particularly popular tonight.</p>
        <p><strong>Customer:</strong> That sounds delicious. We'll have two of those, please.</p>
        <p><strong>Waiter:</strong> Wonderful. Would you like coffee as well?</p>
        <p><strong>Customer:</strong> Yes, two espressos, please. And could we have the bill?</p>
    </div>
    
    <h3>De Compras</h3>
    <div class="dialogo">
        <p><strong>Shop Assistant:</strong> Hi there! Can I help you find anything today?</p>
        <p><strong>Customer:</strong> Yes, I'm looking for a blue shirt in medium size.</p>
        <p><strong>Shop Assistant:</strong> Our shirts are right over here. Let me check... Yes, we have this one in medium. Would you like to try it on?</p>
        <p><strong>Customer:</strong> Yes, please. Where are the fitting rooms?</p>
        <p><strong>Shop Assistant:</strong> Just around the corner to your left. Let me know if you need a different size.</p>
    </div>
    <div class="dialogo">
        <p><strong>Customer:</strong> This shirt fits perfectly. How much is it?</p>
        <p><Shop Assistant:</strong> It's £45. We also have a promotion: if you buy two items, you get 20% off.</p>
        <p><strong>Customer:</strong> That's a good deal. I'll take this shirt and those grey trousers as well.</p>
        <p><strong>Shop Assistant:</strong> Great choice! That'll be £68 with the discount. Cash or card?</p>
        <p><strong>Customer:</strong> Card, please.</p>
    </div>
    
    <h3>En el Aeropuerto</h3>
    <div class="dialogo">
        <p><strong>Passenger:</strong> Excuse me, where is the check-in desk for flight BA284 to London?</p>
        <p><strong>Staff:</strong> That's at counters 45-50, straight ahead and to your right.</p>
        <p><strong>Passenger:</strong> Thank you. Also, what's the baggage allowance for this flight?</p>
        <p><strong>Staff:</strong> You can check in one bag up to 23 kilograms and bring one carry-on item.</p>
        <p><strong>Passenger:</strong> Perfect. And is the flight on time?</p>
        <p><strong>Staff:</strong> Currently, yes, departing at 14:30 as scheduled.</p>
    </div>
    <div class="dialogo">
        <p><strong>Security Officer:</strong> Good afternoon. Passport and boarding pass, please.</p>
        <p><strong>Passenger:</strong> Here you are.</p>
        <p><strong>Security Officer:</strong> Thank you. Did you pack your bags yourself?</p>
        <p><strong>Passenger:</strong> Yes, I did.</p>
        <p><strong>Security Officer:</strong> Are you carrying any liquids over 100ml?</p>
        <p><strong>Passenger:</strong> No, just this small bottle of water that I'll finish now.</p>
        <p><strong>Security Officer:</strong> Please place your belongings in the tray and proceed through the scanner.</p>
    </div>
    
    <h3>En el Hotel</h3>
    <div class="dialogo">
        <p><strong>Receptionist:</strong> Good afternoon! Welcome to the Grand Hotel. How may I assist you?</p>
        <p><strong>Guest:</strong> I have a reservation for three nights. The name is Johnson.</p>
        <p><strong>Receptionist:</strong> Let me check... Yes, Mr. Johnson, a double room with city view. Could I see your passport, please?</p>
        <p><strong>Guest:</strong> Of course, here it is.</p>
        <p><strong>Receptionist:</strong> Thank you. Here's your key card for room 412. Breakfast is served from 7 to 10 in the restaurant on the ground floor.</p>
        <p><strong>Guest:</strong> Great. What time is check-out?</p>
        <p><strong>Receptionist:</strong> Check-out is at 11 AM. The lift is just around the corner. Enjoy your stay!</p>
    </div>
    <div class="dialogo">
        <p><strong>Guest:</strong> Hi, I'm having some trouble with the Wi-Fi in my room. It keeps disconnecting.</p>
        <p><strong>Receptionist:</strong> I'm sorry to hear that, sir. Let me reset the router for your floor. Could you try connecting again in about two minutes?</p>
        <p><strong>Guest:</strong> Okay, I'll try that. Also, could I get an extra pillow and some towels?</p>
        <p><strong>Receptionist:</strong> Of course. Housekeeping will bring those up shortly. Is there anything else I can help with?</p>
        <p><strong>Guest:</strong> No, that's all. Thank you.</p>
    </div>
    
    <h3>En el Médico</h3>
    <div class="dialogo">
        <p><strong>Doctor:</strong> Good morning. What seems to be the problem today?</p>
        <p><strong>Patient:</strong> I've had a terrible headache for the past three days, and I feel very tired.</p>
        <p><strong>Doctor:</strong> I see. Have you been sleeping well?</p>
        <p><strong>Patient:</strong> Not really. I've been working late every night.</p>
        <p><strong>Doctor:</strong> Let me check your blood pressure... It's a bit high. I think you're suffering from stress. I recommend taking a few days off work.</p>
        <p><strong>Patient:</strong> Is it serious?</p>
        <p><strong>Doctor:</strong> No, but you need to rest. I'll prescribe some painkillers and a mild sedative.</p>
    </div>
    
    <h3>Pidiendo Direcciones</h3>
    <div class="dialogo">
        <p><strong>Tourist:</strong> Excuse me, could you help me? I'm looking for the train station.</p>
        <p><strong>Local:</strong> Of course! Go straight down this street, then turn left at the traffic lights.</p>
        <p><strong>Tourist:</strong> Okay, straight and then left at the lights.</p>
        <p><strong>Local:</strong> Yes, then walk about 200 meters and you'll see it on your right. You can't miss it.</p>
        <p><strong>Tourist:</strong> Is it far from here?</p>
        <p><strong>Local:</strong> About a 10-minute walk. Or you can take bus number 15 if you prefer.</p>
        <p><strong>Tourist:</strong> Great, thank you so much for your help!</p>
    </div>
</section>

<!-- SITUACIONES COMPLICADAS -->
<section class="seccion" id="situaciones-complicadas" style="--color-seccion: #cc0000;">
    <h2><i class="fas fa-exclamation-triangle"></i> Situaciones Complicadas</h2>
    
    <h3>Haciendo una Queja</h3>
    <div class="dialogo">
        <p><strong>Customer:</strong> I'm afraid I need to make a complaint about my meal.</p>
        <p><strong>Manager:</strong> I'm sorry to hear that. What seems to be the problem?</p>
        <p><strong>Customer:</strong> I ordered a medium-rare steak, but this is completely overcooked. It's tough and dry.</p>
        <p><strong>Manager:</strong> I sincerely apologize for that. That's certainly not our standard. Would you like us to prepare a new one?</p>
        <p><strong>Customer:</strong> Yes, please. And could you make sure it's cooked properly this time?</p>
        <p><strong>Manager:</strong> Absolutely. I'll personally supervise it. And I'll remove the charge for your drinks as an apology.</p>
    </div>
    <div class="dialogo">
        <p><strong>Hotel Guest:</strong> I need to speak to the manager about my room.</p>
        <p><strong>Receptionist:</strong> I'm the duty manager. How can I help?</p>
        <p><strong>Hotel Guest:</strong> The air conditioning in my room is broken, and it's extremely hot. Also, the bathroom sink is blocked.</p>
        <p><strong>Manager:</strong> I'm terribly sorry for these issues. This is completely unacceptable. Let me move you to a different room immediately.</p>
        <p><strong>Hotel Guest:</strong> I'd appreciate that. This has really affected my stay.</p>
        <p><strong>Manager:</strong> I understand. I'll upgrade you to a suite at no extra charge and offer you a complimentary dinner tonight.</p>
    </div>
    
    <h3>Problemas Técnicos Urgentes</h3>
    <div class="dialogo">
        <p><strong>IT Support:</strong> IT Support, how can I help?</p>
        <p><strong>Employee:</strong> Hi, this is Sarah from Marketing. My computer has completely crashed and I have a presentation in 30 minutes!</p>
        <p><strong>IT Support:</strong> Okay Sarah, stay calm. Is there any error message on the screen?</p>
        <p><strong>Employee:</strong> Yes, it says "Blue Screen Error - System Failure."</p>
        <p><strong>IT Support:</strong> Right, that's a critical error. Can you try holding the power button for 10 seconds to force restart?</p>
        <p><strong>Employee:</strong> Okay, I'm doing that now... It's restarting!</p>
        <p><strong>IT Support:</strong> Good. If it happens again, I'll come to your desk immediately. For now, save your work frequently.</p>
    </div>
    <div class="dialogo">
        <p><strong>Manager:</strong> The entire network is down! Nobody can access the servers. This is a disaster!</p>
        <p><strong>SysAdmin:</strong> I'm aware of the issue. It appears to be a hardware failure in the main router. I'm working on it.</p>
        <p><strong>Manager:</strong> How long will it take to fix? We have clients waiting!</p>
        <p><strong>SysAdmin:</strong> I've switched to the backup router. Service should be restored within 5 minutes.</p>
        <p><strong>Manager:</strong> Thank you. Please keep me updated and prepare a full incident report.</p>
        <p><strong>SysAdmin:</strong> Understood. I'll also implement additional redundancy to prevent this in the future.</p>
    </div>
    
    <h3>Negociaciones Difíciles</h3>
    <div class="dialogo">
        <p><strong>Client:</strong> I'm not satisfied with the proposal. The price is 30% higher than we expected.</p>
        <p><strong>Sales Manager:</strong> I understand your concern. However, our solution includes premium support and a longer warranty.</p>
        <p><strong>Client:</strong> That's all well and good, but our budget is fixed. We can't exceed it.</p>
        <p><strong>Sales Manager:</strong> Let me see what I can do. If you sign a two-year contract instead of one, I could offer a 15% discount.</p>
        <p><strong>Client:</strong> That's still not enough. We need at least 25% off to make this work.</p>
        <p><strong>Sales Manager:</strong> I can't go that far, but I can meet you halfway at 20% and include free training for your team.</p>
        <p><strong>Client:</strong> Deal. But I want that in writing by tomorrow.</p>
    </div>
    
    <h3>Manejando Conflictos</h3>
    <div class="dialogo">
        <p><strong>Team Lead:</strong> I've noticed there's been some tension between you and Mike. Is everything okay?</p>
        <p><strong>Developer:</strong> To be honest, I'm frustrated. He keeps changing my code without discussing it first.</p>
        <p><strong>Team Lead:</strong> I see. Have you spoken to him about this directly?</p>
        <p><strong>Developer:</strong> Not really. I didn't want to cause an argument.</p>
        <p><strong>Team Lead:</strong> It's important to communicate. Let me arrange a meeting where we can all discuss the code review process.</p>
        <p><strong>Developer:</strong> That would be helpful. I just want us to be on the same page.</p>
        <p><strong>Team Lead:</strong> Absolutely. Clear communication is key to a healthy team.</p>
    </div>
    
    <h3>Disculpas Profesionales</h3>
    <div class="dialogo">
        <p><strong>Employee:</strong> I need to apologize for missing yesterday's deadline. It was completely my fault.</p>
        <p><strong>Manager:</strong> Yes, this has caused some delays. What happened?</p>
        <p><strong>Employee:</strong> I underestimated the complexity of the task and didn't ask for help when I should have.</p>
        <p><strong>Manager:</strong> I appreciate your honesty. When can you have it completed?</p>
        <p><strong>Employee:</strong> By end of day today. I've already made significant progress and will prioritize this.</p>
        <p><strong>Manager:</strong> Okay. Please keep me updated on your progress every two hours.</p>
        <p><strong>Employee:</strong> I will. And again, I'm truly sorry for the inconvenience.</p>
    </div>
    
    <h3>Cancelaciones y Cambios de Última Hora</h3>
    <div class="dialogo">
        <p><strong>Client:</strong> I'm calling about our meeting scheduled for this afternoon. Something urgent has come up.</p>
        <p><strong>Consultant:</strong> I see. Do you need to reschedule?</p>
        <p><strong>Client:</strong> Yes, I'm afraid I need to cancel. My flight was cancelled and I'm stuck at the airport.</p>
        <p><strong>Consultant:</strong> No problem at all. These things happen. Would next Tuesday at the same time work for you?</p>
        <p><strong>Client:</strong> That would be perfect. I'm really sorry for the short notice.</p>
        <p><strong>Consultant:</strong> Don't worry about it. Safe travels, and I'll see you next week.</p>
    </div>
    
    <h3>Rechazando Propuestas Educadamente</h3>
    <div class="dialogo">
        <p><strong>Vendor:</strong> So, what do you think of our proposal?</p>
        <p><strong>Manager:</strong> We appreciate the effort you put into this. However, after careful consideration, we've decided to go in a different direction.</p>
        <p><strong>Vendor:</strong> May I ask what influenced your decision?</p>
        <p><strong>Manager:</strong> Budget constraints, primarily. Your solution is excellent, but it's beyond what we can afford at this time.</p>
        <p><strong>Vendor:</strong> I understand. Would you be open to revisiting this in the future?</p>
        <p><strong>Manager:</strong> Absolutely. Please keep us in mind for next year's budget cycle.</p>
    </div>
</section>

<!-- DIÁLOGOS DE TRABAJO Y REUNIONES -->
<section class="seccion" id="dialogos-trabajo" style="--color-seccion: #0099cc;">
    <h2><i class="fas fa-briefcase"></i> Diálogos de Trabajo y Reuniones</h2>
    
    <h3>Reunión de Kick-off</h3>
    <div class="dialogo">
        <p><strong>Project Manager:</strong> Thank you all for joining. Let's kick off the new website project. First, let's introduce ourselves.</p>
        <p><strong>Designer:</strong> Hi, I'm Lisa, the UX designer. I'll be handling the user interface and experience.</p>
        <p><strong>Developer:</strong> I'm Tom, lead developer. I'll be building the backend infrastructure.</p>
        <p><strong>QA:</strong> I'm Priya from QA. I'll ensure everything is tested thoroughly before launch.</p>
        <p><strong>Project Manager:</strong> Great team! Our timeline is 3 months. Let's discuss the key milestones...</p>
    </div>
    
    <h3>Daily Stand-up</h3>
    <div class="dialogo">
        <p><strong>Scrum Master:</strong> Good morning, team. Let's keep this brief. Alex, what did you work on yesterday?</p>
        <p><strong>Alex:</strong> Yesterday I completed the login authentication module. Today I'll start on the user dashboard.</p>
        <p><strong>Scrum Master:</strong> Any blockers?</p>
        <p><strong>Alex:</strong> No, all good.</p>
        <p><strong>Maria:</strong> I finished the database schema design. Today I'll begin writing the API endpoints.</p>
        <p><strong>Scrum Master:</strong> Excellent progress. Let's aim to have the MVP ready by Friday.</p>
    </div>
    
    <h3>Revisión de Código (Code Review)</h3>
    <div class="dialogo">
        <p><strong>Senior Dev:</strong> I've reviewed your pull request. Overall it's good, but I have a few comments.</p>
        <p><strong>Junior Dev:</strong> Sure, what should I change?</p>
        <p><strong>Senior Dev:</strong> In line 45, you should use a try-catch block for error handling. Also, the function name could be more descriptive.</p>
        <p><strong>Junior Dev:</strong> You're right. I'll rename it to "calculateUserTotal" and add proper exception handling.</p>
        <p><strong>Senior Dev:</strong> Perfect. Once you make those changes, I'll approve it.</p>
    </div>
    
    <h3>Entrevista de Trabajo</h3>
    <div class="dialogo">
        <p><strong>Interviewer:</strong> Tell me about a challenging project you worked on.</p>
        <p><strong>Candidate:</strong> At my previous company, we had to migrate a legacy system to the cloud with zero downtime.</p>
        <p><strong>Interviewer:</strong> That sounds complex. How did you approach it?</p>
        <p><strong>Candidate:</strong> We used a blue-green deployment strategy. I led the team that planned the migration phases.</p>
        <p><strong>Interviewer:</strong> Impressive. And what was the outcome?</p>
        <p><strong>Candidate:</strong> We completed it successfully with only 2 minutes of planned downtime. It saved the company 40% in infrastructure costs.</p>
    </div>
    
    <h3>Pedir Ayuda a un Colabora</h3>
    <div class="dialogo">
        <p><strong>Dev 1:</strong> Hey, do you have a minute? I'm stuck on this bug and could use a fresh pair of eyes.</p>
        <p><strong>Dev 2:</strong> Sure, what's the issue?</p>
        <p><strong>Dev 1:</strong> This API call keeps returning a 500 error, but I can't figure out why.</p>
        <p><strong>Dev 2:</strong> Let me see... Ah, I think I see the problem. You're missing the Content-Type header.</p>
        <p><strong>Dev 1:</strong> Oh! You're absolutely right. I can't believe I missed that. Thanks!</p>
        <p><strong>Dev 2:</strong> No problem. Happens to all of us. Let me know if you need anything else.</p>
    </div>
    
    <h3>Presentación a Cliente</h3>
    <div class="dialogo">
        <p><strong>Account Manager:</strong> Thank you for joining us today. We're excited to present our proposal.</p>
        <p><strong>Client:</strong> We're looking forward to hearing it.</p>
        <p><strong>Account Manager:</strong> Our solution will increase your efficiency by 40% while reducing costs. Let me show you the dashboard...</p>
        <p><strong>Client:</strong> That looks impressive. What's the implementation timeline?</p>
        <p><strong>Account Manager:</strong> We can have it fully deployed within 8 weeks, with training included.</p>
        <p><strong>Client:</strong> And what about ongoing support?</p>
        <p><strong>Account Manager:</strong> 24/7 support is included in the package, with a dedicated account manager.</p>
    </div>
    
    <h3>Solicitar Feedback</h3>
    <div class="dialogo">
        <p><strong>Employee:</strong> Do you have a moment to discuss my performance?</p>
        <p><strong>Manager:</strong> Of course. I've been meaning to talk to you about your recent work.</p>
        <p><strong>Employee:</strong> I'd really appreciate your honest feedback. What areas should I focus on improving?</p>
        <p><strong>Manager:</strong> Overall, you're doing great. Your technical skills are excellent. I'd suggest working on your presentation skills - communicating complex ideas to non-technical stakeholders.</p>
        <p><strong>Employee:</strong> That's helpful. Do you have any resources you'd recommend?</p>
        <p><strong>Manager:</strong> There's a great course on Udemy about technical communication. The company will cover the cost.</p>
    </div>
</section>

<!-- TELÉFONO Y EMAIL -->
<section class="seccion" id="telefono-email" style="--color-seccion: #9933cc;">
    <h2><i class="fas fa-phone-alt"></i> Teléfono y Email Profesional</h2>
    
    <h3>Llamada Telefónica Profesional</h3>
    <div class="dialogo">
        <p><strong>Receptionist:</strong> Good morning, Tech Solutions. How may I direct your call?</p>
        <p><strong>Caller:</strong> Good morning. Could I speak to someone in the Sales department, please?</p>
        <p><strong>Receptionist:</strong> Certainly. May I ask who's calling and what it's regarding?</p>
        <p><strong>Caller:</strong> This is David Chen from InnovateCorp. I'm interested in your enterprise software.</p>
        <p><strong>Receptionist:</strong> Thank you, Mr. Chen. I'll connect you to Sarah in Sales. Please hold.</p>
        <p><strong>Sales:</strong> Sarah speaking. How can I help you today?</p>
    </div>
    <div class="dialogo">
        <p><strong>Caller:</strong> Hi, I'm calling about the job posting for a Senior Developer.</p>
        <p><strong>HR:</strong> Yes, we're still accepting applications. Are you calling to follow up on a submitted application?</p>
        <p><strong>Caller:</strong> Actually, I wanted to ask a few questions before applying.</p>
        <p><strong>HR:</strong> Of course. What would you like to know?</p>
        <p><strong>Caller:</strong> Is remote work an option, and what's the salary range?</p>
        <p><strong>HR:</strong> We offer hybrid work - 3 days in office, 2 remote. The salary range is £60-80k depending on experience.</p>
    </div>
    
    <h3>Dejar un Mensaje de Voz</h3>
    <div class="dialogo">
        <p><strong>Voicemail:</strong> You've reached John Smith. I'm unable to take your call right now. Please leave a message.</p>
        <p><strong>Caller:</strong> Hi John, this is Maria from the design team. I'm calling about the mockups for the new project. We need your feedback by Thursday to stay on schedule. Could you give me a call back at 555-0123? Thanks!</p>
    </div>
    
    <h3>Emails Profesionales - Ejemplos</h3>
    <div class="ejemplo">
        <strong>Asunto:</strong> Solicitud de reunión - Proyecto Alpha<br><br>
        Dear Mr. Johnson,<br><br>
        I hope this email finds you well. I am writing to request a meeting to discuss the timeline for Project Alpha.<br><br>
        Would you be available for a 30-minute call on Tuesday afternoon or Wednesday morning? Please let me know what works best for your schedule.<br><br>
        Thank you for your time and consideration.<br><br>
        Best regards,<br>
        Ana Martínez<br>
        Project Manager
    </div>
    <div class="ejemplo">
        <strong>Asunto:</strong> Follow-up: Reunión del 15 de enero<br><br>
        Hi Team,<br><br>
        Thank you all for attending today's meeting. As discussed, please find attached the action items and deadlines:<br><br>
        • Sarah - Complete user research by Jan 22<br>
        • Tom - Prepare technical specifications by Jan 25<br>
        • Mike - Draft budget proposal by Jan 24<br><br>
        Our next meeting is scheduled for January 29 at 10 AM.<br><br>
        Please don't hesitate to reach out if you have any questions.<br><br>
        Regards,<br>
        David
    </div>
    <div class="ejemplo">
        <strong>Asunto:</strong> Aviso importante: Mantenimiento del sistema<br><br>
        Dear Users,<br><br>
        Please be advised that our system will undergo scheduled maintenance this Saturday, January 25th, from 2:00 AM to 6:00 AM EST.<br><br>
        During this period, all services will be temporarily unavailable. We apologize for any inconvenience this may cause.<br><br>
        If you have any urgent matters, please contact support before the maintenance window.<br><br>
        Thank you for your understanding.<br><br>
        IT Operations Team
    </div>
    
    <h3>Frases Útiles para Emails</h3>
    <ul>
        <li><strong>I am writing to inquire about...</strong> → Le escribo para preguntar sobre...</li>
        <li><strong>Please find attached...</strong> → Adjunto encontrará...</li>
        <li><strong>I would appreciate it if you could...</strong> → Le agradecería si pudiera...</li>
        <li><strong>Could you please clarify...</strong> → ¿Podría aclarar...?</li>
        <li><strong>Just a gentle reminder...</strong> → Solo un recordatorio amable...</li>
        <li><strong>Please let me know if you need any further information.</strong> → Avíseme si necesita más información.</li>
        <li><strong>I look forward to hearing from you.</strong> → Quedo a la espera de su respuesta.</li>
        <li><strong>Please accept my apologies for...</strong> → Por favor, acepte mis disculpas por...</li>
    </ul>
</section>

<!-- PRÁCTICA DE LECTURA CON TTS -->
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
                    <h4>English</h4>
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
                    <h4>Español</h4>
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
                    <h4>English</h4>
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
                    <h4>Español</h4>
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
                    <h4>English</h4>
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
                    <h4>Español</h4>
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
    <p style="text-align: center; color: #888; margin-top: 20px;">© 2026 - Práctica Inglés Avanzado</p>
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
