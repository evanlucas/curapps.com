$(document).ready(function(){
  var socket = io.connect('/')
  $('#submitBtn').click(function(e){
    e.preventDefault();
    var name = $('input[name=name]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();
    var desc = $('textarea#desc').val();
    var quotetype = $('select[name=quotetype]').val();
    if (name == '') {
      $('#name-cg').addClass('error');
      alertify.error('Name is required')
      return false;
    }
    $('#name-cg').removeClass('error');
    if (email == '') {
      $('#email-cg').addClass('error');
      alertify.error('Email is required')
      return false;
    }
    $('#email-cg').removeClass('error');
    $(this).button('loading')
    socket.emit('getQuote', {
        name: name
      , phone: phone
      , email: email
      , desc: desc
      , quotetype: quotetype
    })
  });
  socket.on('getQuoteError', function(m) {
    alertify.error(m)
    if (~m.indexOf('Invalid email')) {
      $('input[name=email]').closest('.control-group').addClass('error')
    }
    $('#submitBtn').button('reset')
  })
  socket.on('getQuoteSuccess', function(m) {
    alertify.success(m)
    $('input[name=email]').closest('.control-group').removeClass('error')
    $('#submitBtn').button('reset')
  })
});