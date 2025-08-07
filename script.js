//toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');
menuIcon.onclick=()=>{
    menuIcon.classList.toggle('bx-x'); 
    navbar.classList.toggle('active');
}


// scroll sections
let section =document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a')
window.onscroll=()=>{
    section.forEach(sec =>{
        let top=window.scrollY;
        let offset=sec.offsetTop-100;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');
        
        if(top >=offset && top <offset + height)
        {
           // active navbar links
           navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*='+ id  +']').classList.add('active');
           });
           //active section for animation on scroll
           sec.classList.add('show-animate');

           
        }
       // if want to use animation that repeats on scroll use this
       else {
        sec.classList.remove('show-animate');
       }
    });
    //sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 100);
   
   // remove toggle icon and navbar when click navbar links (scroll)
   menuIcon.classList.remove('bx-x'); 
   navbar.classList.remove('active');

   // Animation footer on scroll
   let footer = document.querySelector('footer');
   footer.classList.toggle('show-animate',this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Section fade-in on scroll and skills animation on view
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight - 80 &&
    rect.bottom > 80
  );
}
function handleSectionFadeAndSkills() {
  document.querySelectorAll('.section-fade').forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('visible');
      // Animate skills only once
      if (section.id === 'skills' && !section.classList.contains('skills-animated')) {
        section.classList.add('skills-animated');
        animateSkills();
      }
    }
  });
}
function animateSkills() {
  const skills = [
    { selector: '.circular-progress.html', percent: 90 },
    { selector: '.circular-progress.css', percent: 80 },
    { selector: '.circular-progress.js', percent: 75 },
    { selector: '.circular-progress.python', percent: 65 },
    { selector: '.circular-progress.webdesign', percent: 90 },
    { selector: '.circular-progress.webdev', percent: 80 },
    { selector: '.circular-progress.graphic', percent: 75 },
    { selector: '.circular-progress.seo', percent: 65 }
  ];
  skills.forEach(skill => {
    const el = document.querySelector(skill.selector);
    if (el) {
      const circle = el.querySelector('circle:not(.bg-track)');
      const number = el.querySelector('.number span');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
      setTimeout(() => {
        circle.style.strokeDashoffset = `${circumference - (skill.percent / 100) * circumference}`;
        // Animated count up
        let current = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / skill.percent), 10);
        const interval = setInterval(() => {
          current++;
          number.textContent = current;
          if (current >= skill.percent) {
            number.textContent = skill.percent;
            clearInterval(interval);
          }
        }, stepTime);
      }, 500);
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  // Add .section-fade to all major sections
  ['home','about','education','skills','contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('section-fade');
  });
  handleSectionFadeAndSkills();
  window.addEventListener('scroll', handleSectionFadeAndSkills);
  
  // Profile Image Reposition on Window Resize
  const homeImage = document.querySelector('.home-image');
  const homeSection = document.querySelector('.home');
  let resizeTimeout;
  
  function handleProfileReposition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Check if window is minimized or very small
    if (windowWidth < 768 || windowHeight < 600) {
      homeImage.classList.add('compressed');
      homeSection.classList.add('compressed');
    } else {
      homeImage.classList.remove('compressed');
      homeSection.classList.remove('compressed');
    }
  }
  
  // Initial check
  handleProfileReposition();
  
  // Listen for window resize events with debouncing
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleProfileReposition, 150);
  });
  
  // Listen for window focus/blur events (for when user minimizes/maximizes)
  window.addEventListener('blur', function() {
    homeImage.classList.add('compressed');
    homeSection.classList.add('compressed');
  });
  
  window.addEventListener('focus', function() {
    // Only remove compression if window is large enough
    if (window.innerWidth >= 768 && window.innerHeight >= 600) {
      homeImage.classList.remove('compressed');
      homeSection.classList.remove('compressed');
    }
  });
});
