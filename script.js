const svg = document.getElementById('cartoon');

// Function to create SVG elements
function createSVGElement(type, attributes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

// Create face outline
const face = createSVGElement('path', {
    d: 'M100,100 Q150,50 200,100 Q250,150 200,200 Q150,250 100,200 Q50,150 100,100',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(face);

// Create eyes
const leftEye = createSVGElement('circle', {
    cx: '130', cy: '130', r: '20',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
const rightEye = createSVGElement('circle', {
    cx: '170', cy: '130', r: '20',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
svg.appendChild(leftEye);
svg.appendChild(rightEye);

// Create pupils (for eye movement)
const leftPupil = createSVGElement('circle', {
    cx: '130', cy: '130', r: '5', fill: '#8A2BE2'
});
const rightPupil = createSVGElement('circle', {
    cx: '170', cy: '130', r: '5', fill: '#8A2BE2'
});
svg.appendChild(leftPupil);
svg.appendChild(rightPupil);

// Create hair
const hair = createSVGElement('path', {
    d: 'M100,100 Q150,50 200,100 Q230,30 260,100',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(hair);

// Create mouth
const mouth = createSVGElement('path', {
    d: 'M130,180 Q150,200 170,180',
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

    [leftPupil, rightPupil].forEach(pupil => {
        const cx = parseFloat(pupil.getAttribute('cx'));
        const cy = parseFloat(pupil.getAttribute('cy'));
        const angle = Math.atan2(mouseY - cy, mouseX - cx);
        const distance = 5; // Max distance pupil can move

        const newX = cx + Math.cos(angle) * distance;
        const newY = cy + Math.sin(angle) * distance;

        pupil.setAttribute('cx', newX);
        pupil.setAttribute('cy', newY);
    });
}

// Add event listener for mouse movement
svg.addEventListener('mousemove', moveEyes);

// Function to animate face lines
function animateLines() {
    const t = Date.now() / 1000;
    const newFaceD = `M${100 + Math.sin(t) * 3},${100 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${50 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 3},${100 + Math.cos(t) * 2} 
                      Q${250 + Math.cos(t) * 2},${150 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 3},${200 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${250 + Math.sin(t) * 2} 
                      ${100 + Math.sin(t) * 3},${200 + Math.cos(t) * 2} 
                      Q${50 + Math.cos(t) * 2},${150 + Math.sin(t) * 2} 
                      ${100 + Math.sin(t) * 3},${100 + Math.cos(t) * 2}`;
    face.setAttribute('d', newFaceD);

    const newHairD = `M${100 + Math.sin(t) * 3},${100 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 3},${50 + Math.sin(t) * 3} 
                      ${200 + Math.sin(t) * 3},${100 + Math.cos(t) * 2} 
                      Q${230 + Math.cos(t) * 3},${30 + Math.sin(t) * 3} 
                      ${260 + Math.sin(t) * 3},${100 + Math.cos(t) * 2}`;
    hair.setAttribute('d', newHairD);
    
    requestAnimationFrame(animateLines);
}

animateLines();