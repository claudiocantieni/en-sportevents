const events = [
  {
    slug: 'swisscup25',
    title: 'Swisscup 2025',
    subtitle: 'Vergangenes Event',
    category: 'Vergangenes Event',
    date: '29. – 30. November 2025',
    description: 'Sprint und Einzelstart in St. Moritz: Ausschreibung und Streckenpläne',
    image: 'images/6athletes.jpeg',
    featured: true
  }
];

function renderHomeEvents() {
  const homeEvents = document.getElementById('home-events');

  if (!homeEvents) return;

  homeEvents.innerHTML = events
    .map((event) => {
      const featuredClass = event.featured ? 'home-event featured-event' : 'home-event';

      return `
        <a class="${featuredClass}" href="#${event.slug}" style="background-image: url('${event.image}');">
          <div class="event-card-content">
            <span class="event-tag">${event.category}</span>
            <h3>${event.title}</h3>
            <p class="event-date">${event.date}</p>
            <p>${event.description}</p>
            <span class="event-link">Mehr erfahren</span>
          </div>
        </a>
      `;
    })
    .join('');
}

function loadPage(page) {
  fetch(page + '.html')
    .then((response) => {
      if (!response.ok) throw new Error('Seite nicht gefunden');
      return response.text();
    })
    .then((html) => {
      document.getElementById('main').innerHTML = html;
      document.getElementById('home').style.display = 'none';
    })
    .catch(() => {
      document.getElementById('main').innerHTML = '<p>Fehler: Inhalt konnte nicht geladen werden.</p>';
      document.getElementById('home').style.display = 'none';
    });
}

function navigate() {
  const page = window.location.hash.substring(1);
  const homeElement = document.getElementById('home');
  const mainElement = document.getElementById('main');

  if (!page) {
    homeElement.style.display = 'block';
    mainElement.innerHTML = '';
  } else {
    homeElement.style.display = 'none';
    loadPage(page);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderHomeEvents();
  navigate();
});
window.addEventListener('hashchange', navigate);
