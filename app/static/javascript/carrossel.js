function updateImages() {
    const images = document.querySelectorAll('.carousel-item img'); 
    
    images.forEach((img) => {
      const originalSrc = img.src.replace('_mobile.jpg', '.jpg');
      const mobileSrc = img.src.replace('.jpg', '_mobile.jpg');
  
      if (window.innerWidth <= 768) {
        img.src = mobileSrc;
      } else {
        img.src = originalSrc;
      } 
    });
  }
  
  window.onload = updateImages;
  window.onresize = updateImages;
  