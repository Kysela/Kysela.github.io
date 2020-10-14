if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}
  var span = document.querySelectorAll('span');  
  span.forEach((item)=>{
    item.addEventListener('click',()=>{
      let styles = getComputedStyle(item);
      styles.backgroundColor == 'white' ? item.style.backgroundColor = 'black' : item.style.backgroundColor = 'white';
    });
  });