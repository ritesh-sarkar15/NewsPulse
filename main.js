window.onload = function() {
  main();
};

function main() {



  let toggleTheme = () => {
    let sun = document.querySelector('.sun');
    let themeBtn = document.querySelector('.float');
    let body = document.querySelector('body');

    themeBtn.addEventListener('click', () => {

      if (body.classList.toggle('dark')) {
        sun.src = 'sun-fill.svg'
        localStorage.setItem('theme', 'dark');
      } else {
        sun.src = 'moon-fill.svg';
        localStorage.setItem('theme', 'light');

      }
      console.log(localStorage);
    });

  };

  let loadTheme = () => {

    let sun = document.querySelector('.sun');
    let body = document.querySelector('body');
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.toggle('dark');
      sun.src = 'sun-fill.svg'
    } else {
      body.classList.remove('dark');
      sun.src = 'moon-fill.svg';
    };

  };

  toggleTheme();
  loadTheme();

  window.addEventListener('DOMcontentloaded', loadTheme);


  // Main body for newspaper


  let input = document.querySelector('input');
  let searchBtn = document.querySelector('.searchBtn');
 // let moreBtn = document.querySelector('.more');
  let apiKey = '37b41d0a9708435a8f0b40f526af827f'
  let pageSize = 20;
  
  
  
  

  //body for query 


  if (!input) {
    return getRandom();
  } else {
    searchBtn.addEventListener('click', () => {
      let query = input.value;
      getNews(query);
      console.log(query);
      
    });
  };



  async function getNews(query) {
    let apiKey = '37b41d0a9708435a8f0b40f526af827f';
    let pageSize = 20;
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=${pageSize}`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      collectData(data.articles);
      console.log(data);
    } catch (error) {
      throw new Error("Fetching data error", error);
    };
    
  
  }






  async function getRandom() {
    let apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}&pageSize=${pageSize}`;


    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      return collectData(data.articles);

      console.log(data);
    } catch (error) {
      throw new Error("Fetching data error", error);
    }
  };


  function collectData(articles) {
    let newsTemplate = document.querySelector('.news-blog');
    newsTemplate.innerHTML = ''; // Clear existing content outside the loop

    articles.forEach(article => {
      if (!article.urlToImage) {
        return;
      }

      let blogCard = document.createElement('div');
      blogCard.classList.add('blog-card');

      let blogImg = document.createElement('img');
      blogImg.src = article.urlToImage;
      blogImg.alt = 'News Image';
      blogImg.classList.add('blogImg');

      let blogTitle = document.createElement('h2');
      blogTitle.textContent = article.title.length > 30 ? article.title.slice(0, 30) + '....' : article.title;
      blogTitle.classList.add('title');



      let blogContext = document.createElement('p');
      blogContext.textContent = article.description;
      blogContext.classList.add('context');

      blogCard.appendChild(blogImg);
      blogCard.appendChild(blogTitle);
      blogCard.appendChild(blogContext);
      newsTemplate.appendChild(blogCard);
    //  moreBtn.style.display = 'block';
      blogCard.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
      });
    });
  };



  getRandom();

  //main function ending point
};


