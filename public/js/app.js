$(document).ready(function() {
  var socket = io.connect('/')
  $('.storeBtn').on('click', function(e) {
    var id = $('.track').data('id')
      , name = $('.appName').text()
    socket.emit('request', {
        id: id
      , name: name
      , type: 'Application'
    })
    return true
  })
})