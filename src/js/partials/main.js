$(document).ready(function () {
   if ($('.press__block')) {
      $('.press__block').masonry({
         itemSelector: '.press-item',
         columnWidth: 370,
         gutter: '.press-sizer',
         horizontalOrder: true
       });
   }

   const scheduleHeader = document.getElementById('scheduleHeader');
   const compensator = document.querySelector('.schedule__block-mt');
   const scrollBlock = document.querySelector('.schedule__scroll-block');

   if (scheduleHeader) {
      const toggleScroll = () => {
         const scheduleHeaderClientRect = scheduleHeader.getBoundingClientRect();

         window.addEventListener('scroll', () => {
            if (scrollY >= scheduleHeaderClientRect.top) {
               scheduleHeader.classList.add('schedule__block-fixed');
               scrollBlock.classList.add('active');
               compensator.style.marginTop = 43 + 'px';
            } else if (scrollY < scheduleHeaderClientRect.top && scheduleHeader.classList.contains('schedule__block-fixed')) {
               scheduleHeader.classList.remove('schedule__block-fixed');
               scrollBlock.classList.remove('active');
               compensator.style.marginTop = 0;
            }
         });

         scrollBlock.addEventListener('scroll', event => {
            const target = event.target;
            if (target.scrollLeft > 0) {
               scheduleHeader.scrollLeft = target.scrollLeft;
            } else {
               scheduleHeader.scrollLeft = 0;
            }
         });

         scheduleHeader.addEventListener('scroll', () => {
            scheduleHeader.scrollLeft = scrollBlock.scrollLeft;
         });
      }

      const checkWidth = () => {
         const media = window.matchMedia("(max-width: 1250px)");
         if (media.matches) {
            toggleScroll();
         }
      };
   
      checkWidth();
   }
});

