$ = require 'jquery'

do fill = (item = 'The most creative minds in Art,we are the world') ->
  $('.tagline').append "#{item}"
fill