import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Enable lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports lazy loading
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  });
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add preconnect hints for faster connection
const preconnects = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

preconnects.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
