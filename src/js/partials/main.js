$(document).ready(function () {
   // $("input[name='phone']").mask(" +7 (999) 999-99-99");
   const videoControl = $('#play');

   videoControl.on('click', function () {
      const videoWrapper = $('#video-link');
      const URL = videoWrapper.data('video-link');
      const script = `<iframe src="${URL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      videoWrapper.append(script);
      videoWrapper.addClass('active');
   });

   if ($('.press__block')) {
      $('.press__block').masonry({
         itemSelector: '.press-item',
         columnWidth: 370,
         gutter: '.press-sizer',
         horizontalOrder: true
       });
   }


});

