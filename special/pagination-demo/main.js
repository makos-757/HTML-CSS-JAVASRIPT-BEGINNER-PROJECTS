/**
 * Pagination System
 * Created by: Makos Tech
 * Follow us on TikTok: https://www.tiktok.com/@makostech
 * Educational Project - Multi-page Navigation
 */

const cardsPerPage = 4;
const dataContainer = document.getElementById('data-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById('page-numbers');
const pageLinksContainer = document.getElementById('page-links');
const cards = Array.from(dataContainer.querySelectorAll('.card'));
const totalPages = Math.ceil(cards.length / cardsPerPage);

let currentPage = 1;

function displayPage(page) {
	const start = (page - 1) * cardsPerPage;
	const end = start + cardsPerPage;
	
	cards.forEach((c, i) => {
		c.style.display = (i >= start && i < end) ? 'block' : 'none';
	});
	
	window.scrollTo({
		top: dataContainer.offsetTop - 100,
		behavior: 'smooth'
	});
}

function updatePagination() {
	pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
	prevButton.disabled = currentPage === 1;
	nextButton.disabled = currentPage === totalPages;
	
	pageLinksContainer.innerHTML = '';
	
	let start = Math.max(1, currentPage - 2);
	let end = Math.min(totalPages, currentPage + 2);
	
	if (start > 1) {
		const s = document.createElement('span');
		s.style.color = '#667eea';
		s.textContent = '...';
		pageLinksContainer.appendChild(s);
	}
	
	for (let i = start; i <= end; i++) {
		const btn = document.createElement('button');
		btn.className = 'link';
		btn.textContent = i;
		btn.classList.toggle('active', i === currentPage);
		
		btn.addEventListener('click', () => {
			if (currentPage !== i) {
				currentPage = i;
				displayPage(i);
				updatePagination();
			}
		});
		
		pageLinksContainer.appendChild(btn);
	}
	
	if (end < totalPages) {
		const s = document.createElement('span');
		s.style.color = '#667eea';
		s.textContent = '...';
		pageLinksContainer.appendChild(s);
	}
}

prevButton.addEventListener('click', (e) => {
	e.preventDefault();
	if (currentPage > 1) {
		currentPage--;
		displayPage(currentPage);
		updatePagination();
	}
});

nextButton.addEventListener('click', (e) => {
	e.preventDefault();
	if (currentPage < totalPages) {
		currentPage++;
		displayPage(currentPage);
		updatePagination();
	}
});

displayPage(currentPage);
updatePagination();