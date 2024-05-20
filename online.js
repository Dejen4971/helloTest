// Validation
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  if (nameInput.value.trim() === '') {
    isValid = false;
    nameInput.classList.add('is-invalid');
  } else {
    nameInput.classList.remove('is-invalid');
  }

  if (!validateEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add('is-invalid');
  } else {
    emailInput.classList.remove('is-invalid');
  }

  if (passwordInput.value.length < 8) {
    isValid = false;
    passwordInput.classList.add('is-invalid');
  } else {
    passwordInput.classList.remove('is-invalid');
  }

  if (isValid) {
    form.submit();
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth Scrolling
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const panel = header.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// Media Queries
function handleMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
    // Mobile layout
    // Update UI and UX for mobile devices
    // Example:
    // Adjust font sizes
    document.body.style.fontSize = '16px';
    // Increase button sizes
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.padding = '12px 20px';
    });
    // Adjust layout to be more compact
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.marginBottom = '20px';
    });
  } else {
    // Desktop layout
    // Update UI and UX for desktop devices
    // Example:
    // Adjust font sizes
    document.body.style.fontSize = '18px';
    // Decrease button sizes
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.padding = '8px 16px';
    });
    // Adjust layout to be more spacious
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.marginBottom = '40px';
    });
  }
}

const mediaQuery = window.matchMedia('(max-width: 768px)');
mediaQuery.addEventListener('change', handleMediaQuery);
handleMediaQuery(mediaQuery);

// Responsive Images
const images = document.querySelectorAll('img');

images.forEach(img => {
  const srcset = img.getAttribute('srcset');
  if (srcset) {
    const sources = srcset.split(',').map(source => {
      const [url, size] = source.trim().split(' ');
      return { url, size };
    });

    const currentSize = window.innerWidth;
    const bestSource = sources.reduce((best, source) => {
      const size = parseInt(source.size, 10);
      return currentSize >= size && size > best.size ? source : best;
    }, { size: 0, url: '' });

    img.src = bestSource.url;
  }
});