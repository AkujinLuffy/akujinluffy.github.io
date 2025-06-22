document.addEventListener('DOMContentLoaded', function() {
  // Calculate and display progress bars for each section
  calculateProgress();
  
  // Add animation when scrolling
  addScrollAnimation();
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
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  listItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });
}
