// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add more stars dynamically
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 5 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.background = '#FFE4B5';
        star.style.borderRadius = '50%';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.6 + 0.2;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.boxShadow = '0 0 3px rgba(255, 228, 181, 0.8)';
        starsContainer.appendChild(star);
    }
}

// Add cursor glow effect
function createCursorGlow() {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '400px';
    glow.style.height = '400px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(255, 183, 197, 0.15), transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '999';
    glow.style.transition = 'transform 0.2s ease';
    glow.style.opacity = '0';
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = (e.clientX - 200) + 'px';
        glow.style.top = (e.clientY - 200) + 'px';
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
            
            // Trigger animation for data-animate elements
            if (entry.target.hasAttribute('data-animate')) {
                const animType = entry.target.getAttribute('data-animate');
                entry.target.style.animation = `${animType === 'fade-in' ? 'fadeIn' : animType === 'slide-up' ? 'slideUp' : 'popIn'} 0.8s ease-out forwards`;
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, [data-animate]').forEach(el => {
    observer.observe(el);
});

// Enhanced parallax with mouse movement
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * 50 * speed;
        const y = (mouseY - 0.5) * 50 * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Parallax for nature elements
    document.querySelectorAll('.leaf, .flower').forEach((elem, index) => {
        const speed = (index + 1) * 0.015;
        const x = (mouseX - 0.5) * 30 * speed;
        const y = (mouseY - 0.5) * 30 * speed;
        elem.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Button click handlers
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle button actions
        if (this.textContent.includes('Download') || this.textContent.includes('Get Started')) {
            // In a real app, this would open app store links
            console.log('Download button clicked');
        }
    });
});

// Modern canvas background with flowing lines
function initCanvas() {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const lines = [];
    const lineCount = 15;
    
    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            length: Math.random() * 100 + 50
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw lines
        lines.forEach((line, i) => {
            line.x += line.vx;
            line.y += line.vy;
            
            // Wrap around
            if (line.x < 0) line.x = canvas.width;
            if (line.x > canvas.width) line.x = 0;
            if (line.y < 0) line.y = canvas.height;
            if (line.y > canvas.height) line.y = 0;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(line.x + Math.cos(i) * line.length, line.y + Math.sin(i) * line.length);
            ctx.strokeStyle = `rgba(255, 183, 197, ${0.15 + Math.sin(Date.now() * 0.001 + i) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw connections
            lines.forEach((otherLine, j) => {
                if (i !== j) {
                    const dx = line.x - otherLine.x;
                    const dy = line.y - otherLine.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(line.x, line.y);
                        ctx.lineTo(otherLine.x, otherLine.y);
                        ctx.strokeStyle = `rgba(255, 183, 197, ${(1 - distance / 200) * 0.1})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create floating particles
function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = -10 + 'px';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

// Initialize stars and effects on load
window.addEventListener('load', () => {
    createStars();
    createCursorGlow();
    initCanvas();
    createParticles();
    
    // Add stagger delay to animated elements
    document.querySelectorAll('[data-animate]').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

