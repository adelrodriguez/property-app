'use strict';

var imageInput = document.getElementById('imageInput');
var imageCheck = document.getElementById('imageCheck');

imageCheck.addEventListener('change', function() {
  if (this.checked) {
    imageInput.hidden = false;
  } else {
    imageInput.hidden = true;
  }
});