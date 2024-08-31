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
    d: 'M120,140 Q150,80 200,140 Q240,200 200,260 Q150,300 100,260 Q80,200 120,140',
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(face);

// Create eyes
const leftEye = createSVGElement('ellipse', {
    cx: '140', cy: '170', rx: '20', ry: '15',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
const rightEye = createSVGElement('ellipse', {
    cx: '180', cy: '170', rx: '20', ry: '15',
    fill: 'white', stroke: '#8A2BE2', 'stroke-width': '2'
});
svg.appendChild(leftEye);
svg.appendChild(rightEye);

// Create pupils (for eye movement)
const leftPupil = createSVGElement('circle', {
    cx: '140', cy: '170', r: '5', fill: '#8A2BE2'
});
const rightPupil = createSVGElement('circle', {
    cx: '180', cy: '170', r: '5', fill: '#8A2BE2'
});
svg.appendChild(leftPupil);
svg.appendChild(rightPupil);

// Create wavy, long hair
const hair = createSVGElement('path', {
    d: `M90,140 
       Q60,200 80,260 
       Q100,320 80,380 
       Q60,440 100,480
       L300,480 
       Q340,440 320,380 
       Q300,320 320,260 
       Q340,200 310,140
       Q280,100 200,120
       Q120,100 90,140
       Z`,
    fill: 'none',
    stroke: '#8A2BE2',
    'stroke-width': '2'
});
svg.appendChild(hair);

// Create mouth
const mouth = createSVGElement('path', {
    d: 'M140,220 Q160,240 180,220',
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
        const eyeCx = index === 0 ? 140 : 180;
        const eyeCy = 170;
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

// Function to animate face lines and hair
function animateLines() {
    const t = Date.now() / 1000;
    const newFaceD = `M${120 + Math.sin(t) * 2},${140 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${80 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 2},${140 + Math.cos(t) * 2} 
                      Q${240 + Math.cos(t) * 2},${200 + Math.sin(t) * 2} 
                      ${200 + Math.sin(t) * 2},${260 + Math.cos(t) * 2} 
                      Q${150 + Math.cos(t) * 2},${300 + Math.sin(t) * 2} 
                      ${100 + Math.sin(t) * 2},${260 + Math.cos(t) * 2} 
                      Q${80 + Math.cos(t) * 2},${200 + Math.sin(t) * 2} 
                      ${120 + Math.sin(t) * 2},${140 + Math.cos(t) * 2}`;
    face.setAttribute('d', newFaceD);

    const newHairD = `M${90 + Math.sin(t) * 3},${140 + Math.cos(t) * 2}
                      Q${60 + Math.cos(t) * 4},${200 + Math.sin(t) * 3} ${80 + Math.sin(t) * 3},${260 + Math.cos(t) * 2}
                      Q${100 + Math.cos(t) * 4},${320 + Math.sin(t) * 3} ${80 + Math.sin(t) * 3},${380 + Math.cos(t) * 2}
                      Q${60 + Math.cos(t) * 4},${440 + Math.sin(t) * 3} ${100 + Math.sin(t) * 3},${480 + Math.cos(t) * 2}
                      L${300 + Math.sin(t) * 3},${480 + Math.cos(t) * 2}
                      Q${340 + Math.cos(t) * 4},${440 + Math.sin(t) * 3} ${320 + Math.sin(t) * 3},${380 + Math.cos(t) * 2}
                      Q${300 + Math.cos(t) * 4},${320 + Math.sin(t) * 3} ${320 + Math.sin(t) * 3},${260 + Math.cos(t) * 2}
                      Q${340 + Math.cos(t) * 4},${200 + Math.sin(t) * 3} ${310 + Math.sin(t) * 3},${140 + Math.cos(t) * 2}
                      Q${280 + Math.cos(t) * 3},${100 + Math.sin(t) * 2} ${200 + Math.sin(t) * 3},${120 + Math.cos(t) * 2}
                      Q${120 + Math.cos(t) * 3},${100 + Math.sin(t) * 2} ${90 + Math.sin(t) * 3},${140 + Math.cos(t) * 2}
                      Z`;
    hair.setAttribute('d', newHairD);
    
    requestAnimationFrame(animateLines);
}

animateLines();