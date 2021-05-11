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
   const headerMobile = document.querySelector('.header-mobile');
   const main = document.querySelector('main');
   const header = document.querySelector('header');

   if (scheduleHeader) {
      const toggleScroll = (media, mediaTablet) => {
         const scheduleHeaderClientRect = scheduleHeader.getBoundingClientRect();

         window.addEventListener('scroll', () => {
            if (media.matches) {
               if (scrollY >= scheduleHeaderClientRect.top - 131) {
                  scheduleHeader.classList.add('schedule__block-fixed');
                  scrollBlock.classList.add('active');
                  compensator.style.marginTop = 43 + 'px';
               } else if (scrollY < scheduleHeaderClientRect.top && scheduleHeader.classList.contains('schedule__block-fixed')) {
                  scheduleHeader.classList.remove('schedule__block-fixed');
                  scrollBlock.classList.remove('active');
                  compensator.style.marginTop = 0;
               }
            }

            if (mediaTablet.matches) {
               headerMobile.style.position = scrollY > 0 ? 'fixed' : 'static';
               header.style.paddingTop = scrollY > 0 ? '67px' : '0';

               if (scrollY >= scheduleHeaderClientRect.top - 67) {
                  scheduleHeader.classList.add('schedule__block-fixed');
                  scrollBlock.classList.add('active');
                  compensator.style.marginTop = 43 + 'px';
               } else if (scrollY < scheduleHeaderClientRect.top && scheduleHeader.classList.contains('schedule__block-fixed')) {
                  scheduleHeader.classList.remove('schedule__block-fixed');
                  scrollBlock.classList.remove('active');
                  compensator.style.marginTop = 0;
               }
            } else {
               header.style.position = scrollY > 0 ? 'fixed' : 'static';
               main.style.paddingTop = scrollY > 0 ? '131px' : '0';
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
         const mediaTablet = window.matchMedia("(max-width: 999px)");

         toggleScroll(media, mediaTablet);

         media.addEventListener('change', toggleScroll);
         mediaTablet.addEventListener('change', toggleScroll);
      };
   
      checkWidth();
   }
   

});

