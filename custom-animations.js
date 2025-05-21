// Enhanced animations for ClearDeals investor presentation
document.addEventListener('DOMContentLoaded', function() {
  // Handle loading animation
  const progressBar = document.getElementById('progressBar');
  const loadingOverlay = document.querySelector('.loading-overlay');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Hide loading overlay after a short delay
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        
        // Initialize AOS animations once loading is complete
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: false,
          mirror: true,
          anchorPlacement: 'top-bottom'
        });
      }, 300);
    }
    progressBar.style.width = progress + '%';
  }, 100);
  
  // Initialize AOS with custom settings (this is a fallback if loading doesn't work)
  setTimeout(() => {
    if (!AOS.initialized) {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
      });
    }
  }, 3000);

  // Enhance stat counters with animation
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach(stat => {
    const finalValue = stat.textContent;
    let startValue = 0;
    
    // Extract numeric part and suffix
    const numericMatch = finalValue.match(/([0-9.]+)([^0-9]*)/);
    if (!numericMatch) return;
    
    const targetNumber = parseFloat(numericMatch[1]);
    const suffix = numericMatch[2] || '';
    const duration = 1500;
    const increment = targetNumber / (duration / 30);
    
    // Reset to zero
    stat.textContent = '0' + suffix;
    
    // Only start counting when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let currentNumber = 0;
          const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
              clearInterval(counter);
              stat.textContent = finalValue;
            } else {
              stat.textContent = Math.floor(currentNumber) + suffix;
            }
          }, 30);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(stat);
  });

  // Initialize charts with animations
  initializeCharts();
  
  // Add hover interaction to feature images
  const featureImages = document.querySelectorAll('.feature-section .image');
  featureImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'perspective(1000px) rotateY(0deg) translateY(-10px) scale(1.02)';
    });
    
    image.addEventListener('mouseleave', function() {
      const isOdd = this.closest('.feature-section:nth-child(odd)') !== null;
      if (isOdd) {
        this.style.transform = 'perspective(1000px) rotateY(5deg)';
      } else {
        this.style.transform = 'perspective(1000px) rotateY(-5deg)';
      }
    });
  });
  
  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 500) {
        const heroBackground = hero.querySelector('::before');
        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
      }
    });
  }
  
  // Add smooth reveal for lottie animations
  const lottiePlayers = document.querySelectorAll('lottie-player');
  lottiePlayers.forEach(player => {
    // Apply fade-in effect to all Lottie players
    player.addEventListener('load', function() {
      player.style.opacity = '1';
    });
  });
  
  // Back to Top button functionality
  const backToTopButton = document.getElementById('backToTopBtn');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Note: Hero animation is now set directly in HTML file
});

// No fallback implementations for Lottie animations

function initializeCharts() {
  // Revenue Growth Chart
  const revenueChart = document.getElementById('revenueChart');
  if (revenueChart) {
    new Chart(revenueChart, {
      type: 'line',
      data: {
        labels: ['2023', '2024', '2025', '2026', '2027'],
        datasets: [{
          label: 'Revenue Growth (in Million $)',
          data: [12, 18, 25, 32, 45],
          borderColor: 'rgba(99, 91, 255, 1)',
          backgroundColor: 'rgba(99, 91, 255, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: 'rgba(99, 91, 255, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                family: 'Raleway',
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 37, 64, 0.9)',
            titleFont: {
              family: 'Raleway',
              size: 14
            },
            bodyFont: {
              family: 'Raleway',
              size: 13
            },
            padding: 12,
            boxPadding: 6,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(230, 235, 241, 0.5)',
              drawBorder: false
            },
            ticks: {
              font: {
                family: 'Raleway',
                size: 12
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(230, 235, 241, 0.5)',
              drawBorder: false
            },
            ticks: {
              font: {
                family: 'Raleway',
                size: 12
              }
            }
          }
        }
      }
    });
  }

  // Market Share Pie Chart
  const marketShareChart = document.getElementById('marketShareChart');
  if (marketShareChart) {
    new Chart(marketShareChart, {
      type: 'doughnut',
      data: {
        labels: ['ClearDeals', 'Competitor A', 'Competitor B', 'Others'],
        datasets: [{
          data: [25, 20, 18, 37],
          backgroundColor: [
            'rgba(99, 91, 255, 0.8)',
            'rgba(0, 212, 255, 0.8)',
            'rgba(0, 217, 36, 0.8)',
            'rgba(230, 235, 241, 0.7)'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Raleway',
                size: 14
              },
              padding: 20
            }
          }
        }
      }
    });
  }
}
