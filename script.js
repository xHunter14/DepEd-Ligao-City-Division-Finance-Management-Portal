const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const signInLink = document.querySelector('.sign-in');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    if (signInLink) {
      signInLink.classList.toggle('mobile-visible', isOpen);
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      if (signInLink) {
        signInLink.classList.remove('mobile-visible');
      }
    });
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
  document.body.classList.add('dark-mode');
  if (themeToggle) {
    themeToggle.textContent = '☀️';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.querySelector('.modal-close');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const loginModal = document.getElementById('loginModal');
const loginOpenButton = document.querySelector('[data-modal-target="loginModal"]');
const loginCloseButton = document.querySelector('.login-close');
const loginForm = document.querySelector('.login-form');

function closeModal() {
  if (modalOverlay) {
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }
}

function closeLoginModal() {
  if (loginModal) {
    loginModal.hidden = true;
    document.body.style.overflow = '';
  }
}

if (modalOverlay && modalClose) {
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

if (loginModal && loginCloseButton) {
  loginCloseButton.addEventListener('click', closeLoginModal);
  loginModal.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      closeLoginModal();
    }
  });
}

if (loginOpenButton) {
  loginOpenButton.addEventListener('click', () => {
    if (loginModal) {
      loginModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const title = trigger.getAttribute('data-title') || 'Details';
    const content = trigger.getAttribute('data-content') || 'This content is temporarily unavailable.';

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalContent) {
      modalContent.textContent = content;
    }

    if (modalOverlay) {
      modalOverlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    closeLoginModal();
  }
});

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    closeLoginModal();
  });
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    fields.forEach((fieldName) => {
      const input = contactForm.querySelector(`[name="${fieldName}"]`);
      const row = input?.closest('.form-row');
      const error = row?.querySelector('.field-error');

      if (!input) return;

      const value = input.value.trim();
      const isEmpty = value.length === 0;

      if (isEmpty) {
        isValid = false;
        input.classList.add('invalid');
        if (error) {
          error.textContent = 'This field is required.';
        }
      } else {
        input.classList.remove('invalid');
        if (error) {
          error.textContent = '';
        }
      }
    });

    const emailInput = contactForm.querySelector('[name="email"]');
    const emailRow = emailInput?.closest('.form-row');
    const emailError = emailRow?.querySelector('.field-error');

    if (emailInput && emailInput.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add('invalid');
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address.';
        }
      } else {
        emailInput.classList.remove('invalid');
        if (emailError) {
          emailError.textContent = '';
        }
      }
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
}

const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const content = toggle.closest('.faq-item')?.querySelector('.faq-content');

    toggle.setAttribute('aria-expanded', String(!isExpanded));

    if (content) {
      content.hidden = isExpanded;
    }
  });
});

// Dashboard Chart Configuration
const chartConfig = {
  font: {
    family: "'Inter', sans-serif",
    size: 12
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    }
  }
};

// MOOE Utilization Chart
const utilizationCtx = document.getElementById('utilizationChart')?.getContext('2d');
if (utilizationCtx) {
  new Chart(utilizationCtx, {
    type: 'doughnut',
    data: {
      labels: ['Downloaded', 'Not Downloaded'],
      datasets: [{
        data: [85.6, 14.4],
        backgroundColor: ['#1288a8', '#e9f5ff'],
        borderColor: ['#0f4c81', '#dce8f3'],
        borderWidth: 2
      }]
    },
    options: {
      ...chartConfig,
      plugins: {
        ...chartConfig.plugins,
        tooltip: {
          callbacks: {
            label: (context) => context.label + ': ' + context.parsed + '%'
          }
        }
      }
    }
  });
}

// Liquidation Submission Rate Chart
const liquidationCtx = document.getElementById('liquidationChart')?.getContext('2d');
if (liquidationCtx) {
  new Chart(liquidationCtx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: 'Liquidation Rate (%)',
        data: [68, 70, 72, 71, 73, 71.6],
        backgroundColor: '#1288a8',
        borderColor: '#0f4c81',
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      ...chartConfig,
      indexAxis: undefined,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
}

// Cash Advance Monitoring Chart
const cashAdvanceCtx = document.getElementById('cashAdvanceChart')?.getContext('2d');
if (cashAdvanceCtx) {
  new Chart(cashAdvanceCtx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Outstanding Cash Advances',
        data: [2500000, 2300000, 1800000, 1450000],
        borderColor: '#1288a8',
        backgroundColor: 'rgba(18, 136, 168, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#1288a8',
        pointBorderColor: '#0f4c81',
        pointRadius: 5
      }]
    },
    options: {
      ...chartConfig,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '₱' + (value / 1000000).toFixed(1) + 'M'
          }
        }
      }
    }
  });
}

// Details Modal Handling
const detailsModal = document.getElementById('detailsModal');
const viewDetailsBtn = document.getElementById('viewDetailsBtn');
const detailsModalClose = detailsModal?.querySelector('.modal-close');

if (viewDetailsBtn && detailsModal) {
  viewDetailsBtn.addEventListener('click', () => {
    detailsModal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
}

if (detailsModalClose && detailsModal) {
  detailsModalClose.addEventListener('click', () => {
    detailsModal.hidden = true;
    document.body.style.overflow = '';
  });
  
  detailsModal.addEventListener('click', (event) => {
    if (event.target === detailsModal) {
      detailsModal.hidden = true;
      document.body.style.overflow = '';
    }
  });
}

// Details Table Filtering
const filterMonth = document.getElementById('filterMonth');
const filterYear = document.getElementById('filterYear');
const filterSchool = document.getElementById('filterSchool');
const filterHead = document.getElementById('filterHead');
const detailsTableBody = document.getElementById('detailsTableBody');

const allDetails = [
  { school: 'Elias Elementary School', head: 'Ms. Maria Santos', month: '06', year: '2026', allocation: '₱8,500,000', downloaded: '₱7,250,000', downRate: '85.3%', liquidated: '₱6,100,000', liquidRate: '71.8%', unliquidated: '₱1,150,000' },
  { school: 'Maharlika High School', head: 'Mr. Juan Dela Cruz', month: '06', year: '2026', allocation: '₱12,000,000', downloaded: '₱10,200,000', downRate: '85.0%', liquidated: '₱8,900,000', liquidRate: '74.2%', unliquidated: '₱1,300,000' },
  { school: 'Camantiles Elementary School', head: 'Ms. Maria Santos', month: '06', year: '2026', allocation: '₱7,500,000', downloaded: '₱6,300,000', downRate: '84.0%', liquidated: '₱5,200,000', liquidRate: '69.3%', unliquidated: '₱1,100,000' },
  { school: 'Sta. Rosa High School', head: 'Dr. Ana Rodriguez', month: '06', year: '2026', allocation: '₱9,000,000', downloaded: '₱7,850,000', downRate: '87.2%', liquidated: '₱6,800,000', liquidRate: '75.6%', unliquidated: '₱1,050,000' }
];

function applyFilters() {
  const monthValue = filterMonth?.value || '';
  const yearValue = filterYear?.value || '';
  const schoolValue = filterSchool?.value || '';
  const headValue = filterHead?.value || '';

  const filtered = allDetails.filter(item => {
    const monthMatch = !monthValue || item.month === monthValue;
    const yearMatch = !yearValue || item.year === yearValue;
    const schoolMatch = !schoolValue || item.school.includes(schoolValue);
    const headMatch = !headValue || item.head.includes(headValue);
    return monthMatch && yearMatch && schoolMatch && headMatch;
  });

  if (detailsTableBody) {
    detailsTableBody.innerHTML = filtered.map(item => `
      <tr>
        <td>${item.school}</td>
        <td>${item.head}</td>
        <td>${item.allocation}</td>
        <td>${item.downloaded}</td>
        <td>${item.downRate}</td>
        <td>${item.liquidated}</td>
        <td>${item.liquidRate}</td>
        <td>${item.unliquidated}</td>
      </tr>
    `).join('');
  }
}

filterMonth?.addEventListener('change', applyFilters);
filterYear?.addEventListener('change', applyFilters);
filterSchool?.addEventListener('change', applyFilters);
filterHead?.addEventListener('change', applyFilters);

// Escape key to close details modal
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && detailsModal && !detailsModal.hidden) {
    detailsModal.hidden = true;
    document.body.style.overflow = '';
  }
});


