import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Render the React app into an element with id "root". If your static HTML pages already
// contain a #root element, this will hydrate/replace that area. Adjust as needed.

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
} else {
	// If no #root is present, create a minimal mount for dev/testing
	const el = document.createElement('div');
	el.id = 'root';
	document.body.prepend(el);
	const root = createRoot(el);
	root.render(<App />);
}
