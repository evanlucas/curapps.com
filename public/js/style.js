$(document).ready(function(){
  $('.nav-collapse').on('shown', function(){
    $('.btn-navbar i').removeClass('icon-chevron-down').addClass('icon-chevron-up');
  });
  
  $('.nav-collapse').on('hidden', function(){
    $('.btn-navbar i').removeClass('icon-chevron-up').addClass('icon-chevron-down');
  });
  $('[rel=tooltip]').tooltip()
});