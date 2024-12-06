'use strict';

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
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active'); // Dodanie klasy 'active' do klikniętego elementu

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

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
