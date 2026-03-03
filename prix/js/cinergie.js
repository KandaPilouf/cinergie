import OttoIdLabel from '/public/assets/js/otto/otto-id-label.js';
import OttoLink from '/public/assets/js/otto/otto-link.js';
import OttoFormatDate from '/public/assets/js/otto/otto-format-date.js';
import OttoEpicene from '/public/assets/js/otto/otto-epicene.js';
import ShadowBox from '/public/assets/js/shadow-box.js';
import CookieConsent from '/public/assets/js/cooksent.js';
import LazyLoader from '/public/assets/js/lazy-loader.js';

document.addEventListener('DOMContentLoaded', function () {
  new LazyLoader("[loading='lazy']");

  // clickable table rows
  const ottoIdLabel = new OttoIdLabel('.otto-id-label');
  ottoIdLabel.replace();

  OttoEpicene.choose('kx-gender');

  OttoLink.urls('.otto-url');
  OttoLink.emails('.otto-email');
  OttoLink.calls('.otto-phone');

  OttoFormatDate.searchAndFormat('.otto-date');

  // navbar toggler
  document
    .querySelectorAll('.nav-controls .toggler[aria-controls]')
    .forEach(function (toggler) {
      toggler.addEventListener('click', function (e) {
        const target = document.querySelector(
          '#' + toggler.getAttribute('aria-controls')
        );
        if (!target) {
          console.error(
            'Toggler target not found:',
            toggler.getAttribute('aria-controls')
          );
          return;
        }

        const expand_now = this.getAttribute('arial-expanded') !== 'true';
        toggler.setAttribute('arial-expanded', expand_now);
        target.classList.toggle('toggled');
        if (expand_now) {
          target.querySelector('input[name=s]').focus();
        }
      });
    });

  document.querySelectorAll('.nav.nav-tabs .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // hidde all tabs
      document
        .querySelectorAll('.tab-pane.active.show')
        .forEach(function (elt) {
          elt.classList.remove('active');
          elt.classList.remove('show');
        });

      document
        .querySelectorAll('.nav.nav-tabs .nav-link.active')
        .forEach(function (elt) {
          elt.classList.remove('active');
        });

      let href = link.getAttribute('href');
      let tab = document.querySelector(href);
      tab.classList.add('active');
      tab.classList.add('show');
    });
  });

  document.querySelectorAll('.print').forEach(function (link) {
    link.addEventListener('click', function (e) {
      window.print();
    });
  });

  /* long text expander */
  const textContent = document.querySelector('.long-text-content');

  if (textContent && textContent.offsetHeight > 500) {
    const labelFold = 'Masquer';
    const labelExpand = 'Lire la suite';

    textContent.classList.add('folded');
    textContent.insertAdjacentHTML(
      'afterend',
      '<button class="btn btn-primary toggle-button">' +
        labelExpand +
        '</button>'
    );

    let toggleButton = document.querySelector('.toggle-button');
    toggleButton.addEventListener('click', function () {
      textContent.classList.toggle('expanded');
      if (textContent.classList.contains('expanded')) {
        toggleButton.textContent = labelFold;
      } else {
        toggleButton.textContent = labelExpand;
      }
    });
  }

  new CookieConsent();
  // enable shadow box triggers
  ShadowBox.listen('[data-shadow-box-template]');

  document.querySelectorAll('label + .required').forEach((input) => {
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.classList.add('required');
    }
  });


  ///dark mode toggle ///
  const root = document.documentElement;
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  console.log('prefers-color-scheme dark:', mediaQuery.matches);
  const storedTheme = localStorage.getItem('theme');

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme(mediaQuery.matches ? 'dark' : 'light');
  }

  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

});
