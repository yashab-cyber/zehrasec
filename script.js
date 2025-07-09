// Matrix background animation
class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px JetBrains Mono`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Terminal typing animation
class TerminalTyping {
    constructor() {
        this.commands = [
            'nmap -sS -O target.com',
            'sqlmap -u "http://target.com/login" --dbs',
            'hydra -l admin -P passwords.txt target.com ssh',
            'nikto -h http://target.com',
            'gobuster dir -u http://target.com -w /usr/share/wordlists/common.txt',
            'metasploit > use exploit/windows/smb/ms17_010_eternalblue',
            'aircrack-ng -w wordlist.txt capture.cap',
            'john --wordlist=rockyou.txt --format=NT hashes.txt',
            'python3 exploit.py --target 192.168.1.100',
            'burpsuite --proxy 127.0.0.1:8080'
        ];
        this.currentCommandIndex = 0;
        this.currentCharIndex = 0;
        this.typingElement = document.getElementById('typing-command');
        this.isTyping = false;
        
        this.startTyping();
    }
    
    startTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        this.typeCommand();
    }
    
    typeCommand() {
        const command = this.commands[this.currentCommandIndex];
        
        if (this.currentCharIndex < command.length) {
            this.typingElement.textContent += command.charAt(this.currentCharIndex);
            this.currentCharIndex++;
            setTimeout(() => this.typeCommand(), 100);
        } else {
            setTimeout(() => this.eraseCommand(), 2000);
        }
    }
    
    eraseCommand() {
        if (this.currentCharIndex > 0) {
            this.typingElement.textContent = this.typingElement.textContent.slice(0, -1);
            this.currentCharIndex--;
            setTimeout(() => this.eraseCommand(), 50);
        } else {
            this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
            setTimeout(() => this.typeCommand(), 500);
        }
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                this.closeMenu();
            });
        });
        
        // Smooth scroll behavior
        document.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
    
    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Tab functionality for solutions section
class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.init();
    }
    
    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }
    
    switchTab(targetTab) {
        // Remove active class from all buttons and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    }
}

// Statistics counter animation
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        });
        
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateCounters() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                this.contactForm.reset();
            }, 3000);
        }, 2000);
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Particle system for enhanced visual effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.5';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 * (100 - distance) / 100})`;
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Audio effects (cyber sounds)
class AudioEffects {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
        
        // Add click sounds to buttons
        document.querySelectorAll('button, .nav-link').forEach(element => {
            element.addEventListener('click', () => this.playClickSound());
        });
    }
    
    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// Loading screen
class LoadingScreen {
    constructor() {
        this.createLoadingScreen();
    }
    
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <i class="fas fa-shield-virus"></i>
                    <span>ZehraSec</span>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-text">Initializing Security Protocols...</div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loading-content {
                text-align: center;
                color: #00ff41;
            }
            
            .loading-logo {
                font-family: 'Orbitron', monospace;
                font-size: 3rem;
                font-weight: 900;
                margin-bottom: 2rem;
                text-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            }
            
            .loading-logo i {
                display: block;
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            
            .loading-bar {
                width: 300px;
                height: 4px;
                background: #333;
                border-radius: 2px;
                overflow: hidden;
                margin: 2rem auto;
            }
            
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #00ff41, #00ffff);
                width: 0%;
                animation: loadingProgress 3s ease-in-out forwards;
                box-shadow: 0 0 10px #00ff41;
            }
            
            .loading-text {
                font-family: 'JetBrains Mono', monospace;
                font-size: 1.2rem;
                opacity: 0.8;
            }
            
            @keyframes loadingProgress {
                to { width: 100%; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
                document.head.removeChild(style);
            }, 500);
        }, 3000);
    }
}

// Enhanced security scanner visualization
class SecurityScanner {
    constructor() {
        this.scannerElement = document.querySelector('.terminal-content');
        this.scanResults = [];
        this.isScanning = false;
        this.init();
    }
    
    init() {
        setInterval(() => {
            if (!this.isScanning && Math.random() > 0.7) {
                this.startScan();
            }
        }, 5000);
    }
    
    startScan() {
        this.isScanning = true;
        const scanTypes = [
            'Port Scan',
            'Vulnerability Assessment',
            'SQL Injection Test',
            'XSS Detection',
            'SSL Certificate Check',
            'Network Reconnaissance'
        ];
        
        const randomScan = scanTypes[Math.floor(Math.random() * scanTypes.length)];
        this.addScanLine(`[INFO] Starting ${randomScan}...`);
        
        setTimeout(() => {
            this.addScanLine(`[SCANNING] Analyzing target...`);
            setTimeout(() => {
                this.addScanLine(`[COMPLETE] ${randomScan} finished`);
                this.isScanning = false;
            }, 2000);
        }, 1000);
    }
    
    addScanLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">root@zehrasec:~#</span> <span class="command">${text}</span>`;
        this.scannerElement.appendChild(line);
        
        // Keep only last 5 lines
        while (this.scannerElement.children.length > 6) {
            this.scannerElement.removeChild(this.scannerElement.firstChild);
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    new LoadingScreen();
    
    // Initialize all components after loading
    setTimeout(() => {
        new MatrixBackground();
        new TerminalTyping();
        new Navigation();
        new TabManager();
        new StatsCounter();
        new FormHandler();
        new ScrollAnimations();
        new ParticleSystem();
        new AudioEffects();
        new SecurityScanner();
        
        // Add entrance animations
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 3000);
});

// Performance optimization
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        // Throttled scroll events
    });
});

// Service worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}
