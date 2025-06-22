document.addEventListener('DOMContentLoaded', function() {
  // Calculate and display progress bars for each section
  calculateProgress();
  
  // Add animation when scrolling
  addScrollAnimation();
  
  // Set random DevOps quote
  setRandomQuote();
  
  // Set random fun fact
  setRandomFunFact();
  
  // Update the last updated time
  document.getElementById('last-update-time').textContent = '2025-06-22';
  
  // Add icon to checkboxes
  addCheckboxIcons();
});

function calculateProgress() {
  // Find all sections with task lists
  const sections = document.querySelectorAll('h2 + ul, h2 + p + ul');
  
  sections.forEach((section, index) => {
    const tasks = section.querySelectorAll('input[type="checkbox"]');
    const completedTasks = section.querySelectorAll('input[type="checkbox"]:checked');
    
    // Calculate percentage
    const percentComplete = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = `${percentComplete}%`;
    
    // Create percentage text
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `${percentComplete}% complete`;
    progressText.style.textAlign = 'right';
    progressText.style.fontSize = '0.8em';
    progressText.style.color = '#aaa';
    progressText.style.marginBottom = '5px';
    
    // Add to DOM
    progressContainer.appendChild(progressBar);
    
    const h2 = section.previousElementSibling;
    if (h2.tagName === 'H2') {
      h2.insertAdjacentElement('afterend', progressText);
      progressText.insertAdjacentElement('afterend', progressContainer);
    } else {
      const container = h2.parentElement;
      if (container && container.previousElementSibling && container.previousElementSibling.tagName === 'H2') {
        container.previousElementSibling.insertAdjacentElement('afterend', progressText);
        progressText.insertAdjacentElement('afterend', progressContainer);
      }
    }
  });
}

function addScrollAnimation() {
  // Add fade-in animation to list items when they come into view
  const listItems = document.querySelectorAll('li');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.1 });
  
  listItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });
}

function setRandomQuote() {
  const quotes = [
    "In DevOps, we don't have problems, just undocumented features.",
    "To err is human, to automate divine.",
    "It's not a bug, it's an undocumented feature of our CI/CD pipeline.",
    "Keep calm and git pull before you git push.",
    "If at first you don't succeed; call it version 1.0.",
    "I'm not arguing, I'm just explaining why I'm right - every DevOps engineer ever.",
    "The best code is no code at all. Every new line is a liability.",
    "It works on my infrastructure as code.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "There are 10 types of people in DevOps: those who understand binary and those who have a life.",
    "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.",
    "DevOps: because sysadmin doesn't look good on a business card."
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('devops-quote').textContent = randomQuote;
}

function setRandomFunFact() {
  const facts = [
    "Did you know? The first actual computer 'bug' was a real moth trapped in a computer in 1947!",
    "AWS has enough servers to run almost 85 million concurrent Minecraft worlds.",
    "The average Docker container is pulled 1 million times a month.",
    "GitHub hosts over 200 million repositories and is home to 73 million developers.",
    "The term 'DevOps' was coined in 2009, combining 'development' and 'operations'.",
    "The entire AWS cloud in 2019 was estimated to be running on 1.4 million servers.",
    "Amazon's infrastructure is so large that they add enough new server capacity to power all of Amazon as it existed in 2004... every day.",
    "An average of 16,000 GitHub repositories are created every day.",
    "The average developer spends 75% of their time fixing bugs and only 25% writing new code.",
    "It takes over 4,000 developers to maintain Windows 10.",
    "99.9% uptime still allows for almost 9 hours of downtime per year.",
    "Terraform manages millions of resources across hundreds of cloud providers every day."
  ];
  
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('fun-fact').textContent = randomFact;
}

function addCheckboxIcons() {
  // Get all list items that have checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    // Create icon element
    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    
    // Determine which icon to use based on the context
    let iconClass = 'fa-code-branch';
    const parentText = checkbox.parentElement.textContent.toLowerCase();
    
    if (parentText.includes('security') || parentText.includes('scan')) {
      iconClass = 'fa-shield-halved';
    } else if (parentText.includes('pipeline') || parentText.includes('ci/cd')) {
      iconClass = 'fa-gears';
    } else if (parentText.includes('monitoring') || parentText.includes('alert')) {
      iconClass = 'fa-chart-line';
    } else if (parentText.includes('aws') || parentText.includes('cloud')) {
      iconClass = 'fa-cloud';
    } else if (parentText.includes('terraform') || parentText.includes('infrastructure')) {
      iconClass = 'fa-server';
    } else if (parentText.includes('deploy')) {
      iconClass = 'fa-rocket';
    } else if (parentText.includes('repository') || parentText.includes('git')) {
      iconClass = 'fa-code-fork';
    }
    
    // Set the icon class
    icon.classList.add(iconClass);
    
    // Style the icon
    icon.style.marginRight = '10px';
    icon.style.color = '#666';
    icon.style.width = '20px';
    icon.style.textAlign = 'center';
    
    // Insert after the checkbox
    checkbox.parentNode.insertBefore(icon, checkbox.nextSibling);
    
    // Add event listener to update icon when checkbox state changes
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        icon.classList.add('text-success');
        icon.style.color = '#4caf50';
      } else {
        icon.classList.remove('text-success');
        icon.style.color = '#666';
      }
    });
    
    // Set initial state
    if (checkbox.checked) {
      icon.classList.add('text-success');
      icon.style.color = '#4caf50';
    }
  });
}

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
  // Check if the key matches the next key in the konami code
  if (e.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    
    // If the konami code is complete, trigger the easter egg
    if (konamiCodePosition === konamiCode.length) {
      activateEasterEgg();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateEasterEgg() {
  // Create a matrix-like animation on the page
  const body = document.body;
  const canvas = document.createElement('canvas');
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  
  body.appendChild(canvas);
  
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%terraform aws github actions pipeline security docker kubernetes";
  const matrixChars = matrix.split('');
  
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  function drawMatrix() {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = '#0f0';
    context.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      context.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }
  
  // Show for 10 seconds
  const matrixInterval = setInterval(drawMatrix, 33);
  
  setTimeout(() => {
    clearInterval(matrixInterval);
    body.removeChild(canvas);
  }, 10000);
  
  // Add a message
  const message = document.createElement('div');
  message.textContent = 'You found the DevOps Easter egg! You must be a 10x engineer!';
  message.style.position = 'fixed';
  message.style.top = '50%';
  message.style.left = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  message.style.color = '#0f0';
  message.style.padding = '20px';
  message.style.borderRadius = '10px';
  message.style.zIndex = '10000';
  message.style.fontFamily = 'monospace';
  message.style.fontSize = '20px';
  message.style.textAlign = 'center';
  message.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
  
  body.appendChild(message);
  
  setTimeout(() => {
    body.removeChild(message);
  }, 5000);
}
