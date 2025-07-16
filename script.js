// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create animated background mesh
const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
const material = new THREE.MeshBasicMaterial({
    color: 0x9333ea,
    transparent: true,
    opacity: 0.1,
    wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2;
mesh.position.z = -50;
scene.add(mesh);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 50;
    posArray[i + 1] = (Math.random() - 0.5) * 50;
    posArray[i + 2] = (Math.random() - 0.5) * 50;
    
    colorArray[i] = 0.576;     // Purple R
    colorArray[i + 1] = 0.322; // Purple G
    colorArray[i + 2] = 0.918; // Purple B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create 3D models (geometric shapes)
const models = [];

// Torus
const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 50);
const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x9333ea,
    transparent: true,
    opacity: 0.3,
    wireframe: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-10, 5, -20);
models.push(torus);
scene.add(torus);

// Icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(1.5, 0);
const icosahedronMaterial = new THREE.MeshBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.4,
    wireframe: true
});
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.set(10, -5, -15);
models.push(icosahedron);
scene.add(icosahedron);

// Octahedron
const octahedronGeometry = new THREE.OctahedronGeometry(1.8, 0);
const octahedronMaterial = new THREE.MeshBasicMaterial({
    color: 0xe879f9,
    transparent: true,
    opacity: 0.3,
    wireframe: true
});
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedron.position.set(0, 8, -25);
models.push(octahedron);
scene.add(octahedron);

camera.position.z = 30;

// Animation variables
let mouseX = 0;
let mouseY = 0;
let time = 0;

// Mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Animate background mesh
    const vertices = mesh.geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        vertices[i + 2] = Math.sin(time + vertices[i] * 0.1) * 2;
    }
    mesh.geometry.attributes.position.needsUpdate = true;

    // Rotate particles
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.001;

    // Animate 3D models
    models.forEach((model, index) => {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
        model.rotation.z += 0.005;
        
        // Float animation with mouse influence
        model.position.y += Math.sin(time * 0.5 + index) * 0.02;
        model.position.x += Math.cos(time * 0.3 + index) * 0.01;
        
        // Mouse parallax effect
        model.position.x += mouseX * 0.5;
        model.position.y += mouseY * 0.3;
    });

    // Camera movement with mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// Window resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling for navigation links (all anchor links with href starting with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only handle if href is not just '#'
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://portfolio-backend-8bci.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();
        if (data.success) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        alert('There was an error connecting to the server. Please try again later.');
    }
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Particle system enhancement
function updateParticles() {
    const positions = particlesMesh.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 0.01 + positions[i] * 0.01) * 0.01;
        positions[i] += Math.cos(time * 0.005 + positions[i + 1] * 0.01) * 0.005;
    }
    
    particlesMesh.geometry.attributes.position.needsUpdate = true;
}

// Enhanced animation loop
function enhancedAnimate() {
    requestAnimationFrame(enhancedAnimate);
    time += 0.01;
    
    updateParticles();
    
    // Dynamic lighting effect
    const lightIntensity = 0.5 + Math.sin(time * 0.1) * 0.2;
    material.opacity = lightIntensity * 0.1;
    
    renderer.render(scene, camera);
}

// Start enhanced animation
enhancedAnimate();

// Animate home page buttons
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
console.log('ctaButtons:', ctaButtons);

[...ctaButtons].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('btn-animate-hover');
        console.log('mouseenter', btn.textContent);
    });
    btn.addEventListener('mouseleave', () => {
        btn.classList.remove('btn-animate-hover');
        btn.classList.remove('btn-animate-active');
        console.log('mouseleave', btn.textContent);
    });
    btn.addEventListener('pointerdown', () => {
        btn.classList.add('btn-animate-active');
        console.log('pointerdown', btn.textContent);
    });
    btn.addEventListener('pointerup', () => {
        btn.classList.remove('btn-animate-active');
        console.log('pointerup', btn.textContent);
    });
    btn.addEventListener('mouseout', () => {
        btn.classList.remove('btn-animate-active');
        console.log('mouseout', btn.textContent);
    });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here
        console.log('Mobile view detected');
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-based animations can be added here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);
