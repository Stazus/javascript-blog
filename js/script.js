'use strict';

// Ustawienia skryptu
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

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
function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); // Znalezienie listy linków
  titleList.innerHTML = ''; // Wyczyszczenie zawartości listy linków

  /* Pętla dla wszystkich artykułów */
  const articles = document.querySelectorAll(optArticleSelector); // Wyszukanie wszystkich artykułów

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
generateTitleLinks();
