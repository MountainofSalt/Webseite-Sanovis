// interaktiv.js — Kleine Interaktionen für Sanitras
// - Hamburger-Menü (mobile): öffnet/schließt Navigation
// - Smooth scroll für interne Links
// - Leichte hover/keyboard Verbesserungen
// Hinweis: Datei ist minimal und progressiv erweiterbar.

(function(){
	'use strict';

	// Helfer: sichere QuerySelectorAll -> Array
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

	// NAV Toggle
	const navToggle = document.getElementById('nav-toggle');
	const body = document.body;
	const primaryNav = document.getElementById('primary-nav');

	if(navToggle){
		navToggle.addEventListener('click', function(){
			const expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			body.classList.toggle('nav-open');
			// Set focus to first link when opened for accessibility
			if(!expanded){
				const firstLink = primaryNav && primaryNav.querySelector('a');
				if(firstLink) firstLink.focus();
			}
		});
	}

	// Close nav when clicking outside (mobile)
	document.addEventListener('click', function(e){
		if(!primaryNav || !navToggle) return;
		if(body.classList.contains('nav-open')){
			if(!primaryNav.contains(e.target) && !navToggle.contains(e.target)){
				body.classList.remove('nav-open');
				navToggle.setAttribute('aria-expanded','false');
			}
		}
	});

	// Smooth scroll for same-page anchors
	document.addEventListener('click', function(e){
		const el = e.target.closest('a[href]');
		if(!el) return;
		const href = el.getAttribute('href');
		// internal anchor on same page
		if(href && href.startsWith('#')){
			e.preventDefault();
			const target = document.querySelector(href);
			if(target){
				const top = target.getBoundingClientRect().top + window.pageYOffset - 56; // offset for sticky header
				window.scrollTo({top, behavior:'smooth'});
				// close nav if open (mobile)
				if(body.classList.contains('nav-open')){ body.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded','false'); }
				// set focus for keyboard users
				target.setAttribute('tabindex','-1');
				target.focus({preventScroll:true});
			}
		}
		// internal links to other pages are left to default behavior
	});

	// Enhance hover/tap styles for feature cards and buttons (adds class, CSS handles visuals)
	const features = $$('.feature');
	features.forEach(card => {
		card.addEventListener('mouseenter', ()=> card.classList.add('is-hover'));
		card.addEventListener('mouseleave', ()=> card.classList.remove('is-hover'));
		card.addEventListener('touchstart', ()=> card.classList.add('is-hover'));
		card.addEventListener('touchend', ()=> card.classList.remove('is-hover'));
	});

	// Keyboard accessibility: close nav on ESC
	document.addEventListener('keydown', (e)=>{
		if(e.key === 'Escape' && body.classList.contains('nav-open')){
			body.classList.remove('nav-open');
			if(navToggle) navToggle.setAttribute('aria-expanded','false');
			navToggle && navToggle.focus();
		}
	});

	// Optional: smooth-scrolling polyfill or intersection observers could be added here

	/*
		Placeholder for future interactive charts or user interactions.
		Example:
		- Initialize Chart.js instances
		- Hook Datawrapper postMessage API for events
		- Add data filtering controls with fetch() requests
	*/

})();

