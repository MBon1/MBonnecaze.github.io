// Get the image and insert it inside the modal - use its "alt" text as a caption
function openModal(Modal, Img, ModalImg, CaptionText){
  var modal = document.getElementById(Modal);
  var img = document.getElementById(Img);
  var modalImg = document.getElementById(ModalImg);
  var captionText = document.getElementById(CaptionText);
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
}

// // When the user clicks on <span> element that closes the modal (x), close the modal
function closeModal(Modal){
  var modal = document.getElementById(Modal);
  modal.style.display = "none";
}