'use strict';

// Ustawienia skryptu
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.tags.list'; // Selector dla listy tagów w prawej kolumnie

// Funkcja obsługująca kliknięcia w linki
function titleClickHandler(event){
  event.preventDefault(); // Zapobiegnięcie domyślnemu działaniu linków
  const clickedElement = this;
  console.log('Link was clicked!'); 

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active'); // Dodanie klasy 'active' do klikniętego elementu
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active'); // Zmieniony selektor na odpowiedni dla artykułów

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }


  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href'); // Pobranie wartości atrybutu 'href'
  console.log('articleSelector:', articleSelector); // Wyświetlenie wartości articleSelector w konsoli


  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector); // Wyszukanie artykułu na podstawie selektora
  console.log('targetArticle:', targetArticle); // Wyświetlenie znalezionego artykułu w konsoli


  /* add class 'active' to the correct article */
  targetArticle.classList.add('active'); // Dodanie klasy 'active' do znalezionego artykułu
}

// Funkcja generująca listę linków
function generateTitleLinks(customSelector = ''){
  console.log('customSelector:', customSelector); // Debug: analiza argumentu

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); // Znalezienie listy linków
  titleList.innerHTML = ''; // Wyczyszczenie zawartości listy linków

  /* Pętla dla wszystkich artykułów */
  const articles = document.querySelectorAll(optArticleSelector + customSelector); // Wyszukanie wszystkich artykułów
  console.log('Articles selector:', optArticleSelector + customSelector); // Debug: sprawdzanie połączonego selektora
  console.log('Found articles:', articles);

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('Article ID:', articleId); // Wyświetlenie pobranego ID

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // Odczytanie tytułu artykułu
    console.log('Article Title:', articleTitle); // Wyświetlenie tytułu artykułu

    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}">${articleTitle}</a></li>`; // Utworzenie HTML dla linku
    console.log('Link HTML:', linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML); // Dodanie linku do listy
  }
    // Dodanie obsługi kliknięć w linki
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

// Wywołanie funkcji generującej linki
// generateTitleLinks(); - usunięte

// Funkcja generująca tagi
function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = tags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* add generated code to html variable */
      html += tagHTML;

            /* [NEW] check if this link is NOT already in allTags */
            if (allTags.indexOf(tagHTML) == -1) {
              /* [NEW] add generated code to allTags array */
              allTags.push(tagHTML);
            }      
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');  
}

// Wywołanie funkcji
generateTags();

// Funkcja obsługująca kliknięcia w tagi
function tagClickHandler(event){
  event.preventDefault(); // Zapobiegnięcie domyślnemu działaniu linków

  const clickedElement = this; // Kliknięty element

  const href = clickedElement.getAttribute('href'); // Pobranie atrybutu 'href' klikniętego elementu
  const tag = href.replace('#tag-', ''); // Wyciągnięcie tagu z atrybutu 'href'
  console.log('Selected tag:', tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const selectedTagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let selectedTagLink of selectedTagLinks) {
    /* add class active */
    selectedTagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`); // filtrowanie artykułów na podstawie tagów
}

// Funkcja dodająca nasłuchiwacze do kliknięć w tagi
function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

// Wywołanie funkcji, aby dodać nasłuchiwacze do tagów
addClickListenersToTags();

// Funkcja generująca listę autorów dla każdego artykułu
function generateAuthors() {
  // Pobranie wszystkich artykułów na stronie
  const articles = document.querySelectorAll(optArticleSelector);

  // Iteracja przez każdy artykuł
  for (let article of articles) {
    // Znalezienie kontenera na autora w artykule
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    // Pobranie atrybutu z nazwą autora
    const author = article.getAttribute('data-author');

    // Utworzenie linku HTML z nazwą autora
    const authorHTML = `<a href="#author-${author}">${author}</a>`;

    // Wstawienie linku do kontenera w artykule
    authorWrapper.innerHTML = authorHTML;
  }
}

// Wywołanie funkcji generującej autorów
generateAuthors();

// Funkcja obsługująca kliknięcia w linki autorów
function authorClickHandler(event){
  // Zatrzymanie domyślnej akcji przeglądarki (np. nawigacji)
  event.preventDefault();

  // Pobranie elementu, który został kliknięty
  const clickedElement = this;

  // Pobranie adresu URL z atrybutu href klikniętego elementu
  const href = clickedElement.getAttribute('href');

  // Wyciągnięcie nazwy autora z URL (usunięcie części '#author-')
  const author = href.replace('#author-', '');

  // Usunięcie klasy 'active' ze wszystkich aktywnych linków autorów
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  // Dodanie klasy 'active' do klikniętego linku autora
  const selectedAuthorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let selectedAuthorLink of selectedAuthorLinks) {
    selectedAuthorLink.classList.add('active');
  }

  // Wygenerowanie listy artykułów dla wybranego autora
  generateTitleLinks(`[data-author="${author}"]`);
}

// Funkcja dodająca nasłuchiwacze zdarzeń do linków autorów
function addClickListenersToAuthors(){
  // Pobranie wszystkich linków autorów w artykułach
  const authorLinks = document.querySelectorAll(`${optArticleAuthorSelector} a`);

  // Dodanie nasłuchiwania zdarzenia 'click' dla każdego linku 
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

// Wywołanie funkcji dodającej nasłuchiwacze do linków autorów
addClickListenersToAuthors();
