const svg = document.getElementById('cartoon');

function createSVGElement(type, attributes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

// Create face outline
const face = createSVGElement('path', {
    d: 'M100,120 Q150,60 200,120 Q240,180 200,240 Q150,280 100,240 Q60,180 100,120',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(face);

// Create eyes
const leftEye = createSVGElement('ellipse', {
    cx: '130', cy: '150', rx: '20', ry: '15',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
const rightEye = createSVGElement('ellipse', {
    cx: '170', cy: '150', rx: '20', ry: '15',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
svg.appendChild(leftEye);
svg.appendChild(rightEye);

// Create pupils (for eye movement)
const leftPupil = createSVGElement('circle', {
    cx: '130', cy: '150', r: '5', fill: '#8A2BE2'
});
const rightPupil = createSVGElement('circle', {
    cx: '170', cy: '150', r: '5', fill: '#8A2BE2'
});
svg.appendChild(leftPupil);
svg.appendChild(rightPupil);

// Create hair
const hair = createSVGElement('path', {
    d: 'M80,120 Q150,20 220,120 L220,280 Q150,300 80,280 Z',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(hair);

// Create mouth
const mouth = createSVGElement('path', {
    d: 'M130,200 Q150,220 170,200',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(mouth);

// Function to move eyes
function moveEyes(event) {
    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    [leftPupil, rightPupil].forEach((pupil, index) => {
        const eyeCx = index === 0 ? 130 : 170;
        const eyeCy = 150;
        const eyeRx = 15;
        const eyeRy = 10;

        const dx = mouseX - eyeCx;
        const dy = mouseY - eyeCy;
        const angle = Math.atan2(dy, dx);

        let newX = eyeCx + Math.cos(angle) * eyeRx * 0.7;
        let newY = eyeCy + Math.sin(angle) * eyeRy * 0.7;

        pupil.setAttribute('cx', newX);
        pupil.setAttribute('cy', newY);
    });
}

svg.addEventListener('mousemove', moveEyes);

// Function to animate face lines
function animateLines() {
    const t = Date.now() / 1000;
    const newFaceD = `M${100 + Math.sin(t) * 2},${120 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${60 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 2},${120 + Math.cos(t) * 2} 
                      Q${240 + Math.cos(t) * 2},${180 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 2},${240 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${280 + Math.sin(t) * 2} 
                      ${100 + Math.sin(t) * 2},${240 + Math.cos(t) * 2} 
                      Q${60 + Math.cos(t) * 2},${180 + Math.sin(t) * 2} 
                      ${100 + Math.sin(t) * 2},${120 + Math.cos(t) * 2}`;
    face.setAttribute('d', newFaceD);

    const newHairD = `M${80 + Math.sin(t) * 2},${120 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 3},${20 + Math.sin(t) * 3} 
                      ${220 + Math.sin(t) * 2},${120 + Math.cos(t) * 2} 
                      L${220 + Math.sin(t) * 2},${280 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${300 + Math.sin(t) * 2} 
                      ${80 + Math.sin(t) * 2},${280 + Math.cos(t) * 2} Z`;
    hair.setAttribute('d', newHairD);
    
    requestAnimationFrame(animateLines);
}

animateLines();