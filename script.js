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

// Create eyebrows (new addition)
const leftEyebrow = createSVGElement('path', {
    d: 'M110,120 Q130,110 150,120',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
const rightEyebrow = createSVGElement('path', {
    d: 'M150,120 Q170,110 190,120',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(leftEyebrow);
svg.appendChild(rightEyebrow);

// Create hair with asymmetric curves
const hair = createSVGElement('path', {
    d: 'M80,120 Q150,40 220,120 ' +
       'C240,140 260,160 240,180 C220,200 240,220 260,240 ' +
       'C280,260 260,280 240,300 C220,320 240,340 260,360 ' +
       'Q150,400 40,360 C60,340 40,320 60,300 ' +
       'C80,280 60,260 40,240 C20,220 40,200 60,180 ' +
       'C80,160 60,140 80,120',
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

// Function to animate face and hair lines
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
                      Q${150 + Math.cos(t) * 3},${40 + Math.sin(t) * 3} 
                      ${220 + Math.sin(t) * 2},${120 + Math.cos(t) * 2} 
                      C${240 + Math.cos(t) * 2},${140 + Math.sin(t) * 2} 
                      ${260 + Math.sin(t) * 2},${160 + Math.cos(t) * 2} 
                      ${240 + Math.cos(t) * 2},${180 + Math.sin(t) * 2} 
                      C${220 + Math.sin(t) * 2},${200 + Math.cos(t) * 2} 
                      ${240 + Math.cos(t) * 2},${220 + Math.sin(t) * 2} 
                      ${260 + Math.sin(t) * 2},${240 + Math.cos(t) * 2} 
                      C${280 + Math.cos(t) * 2},${260 + Math.sin(t) * 2} 
                      ${260 + Math.sin(t) * 2},${280 + Math.cos(t) * 2} 
                      ${240 + Math.cos(t) * 2},${300 + Math.sin(t) * 2} 
                      C${220 + Math.sin(t) * 2},${320 + Math.cos(t) * 2} 
                      ${240 + Math.cos(t) * 2},${340 + Math.sin(t) * 2} 
                      ${260 + Math.sin(t) * 2},${360 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 3},${400 + Math.sin(t) * 3} 
                      ${40 + Math.sin(t) * 2},${360 + Math.cos(t) * 2} 
                      C${60 + Math.cos(t) * 2},${340 + Math.sin(t) * 2} 
                      ${40 + Math.sin(t) * 2},${320 + Math.cos(t) * 2} 
                      ${60 + Math.cos(t) * 2},${300 + Math.sin(t) * 2} 
                      C${80 + Math.sin(t) * 2},${280 + Math.cos(t) * 2} 
                      ${60 + Math.cos(t) * 2},${260 + Math.sin(t) * 2} 
                      ${40 + Math.sin(t) * 2},${240 + Math.cos(t) * 2} 
                      C${20 + Math.cos(t) * 2},${220 + Math.sin(t) * 2} 
                      ${40 + Math.sin(t) * 2},${200 + Math.cos(t) * 2} 
                      ${60 + Math.cos(t) * 2},${180 + Math.sin(t) * 2} 
                      C${80 + Math.sin(t) * 2},${160 + Math.cos(t) * 2} 
                      ${60 + Math.cos(t) * 2},${140 + Math.sin(t) * 2} 
                      ${80 + Math.sin(t) * 2},${120 + Math.cos(t) * 2}`;
    hair.setAttribute('d', newHairD);
    
    // Animate eyebrows (new addition)
    const eyebrowOffset = Math.sin(t * 2) * 3;
    leftEyebrow.setAttribute('d', `M110,${120 + eyebrowOffset} Q130,${110 + eyebrowOffset} 150,${120 + eyebrowOffset}`);
    rightEyebrow.setAttribute('d', `M150,${120 + eyebrowOffset} Q170,${110 + eyebrowOffset} 190,${120 + eyebrowOffset}`);
    
    requestAnimationFrame(animateLines);
}

animateLines();