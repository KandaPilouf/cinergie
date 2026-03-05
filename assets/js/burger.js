const sidebar = document.querySelector(".sidebar");

function hideSidebar() {
  document.querySelector(".sidebar").style.display = "none";
  console.log(sidebar.style.display);
}

function showSidebar() {
  document.querySelector(".sidebar").style.display = "block";
}
