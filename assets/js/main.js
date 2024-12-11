
var tableBody = document.getElementById('tableContent');
var bookmarkName = document.getElementById("bookmarkName");
var url = document.getElementById("bookmarkURL");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

var bookmarksContainer = [];
if(localStorage.getItem("Bookmarks") !== null){
    bookmarksContainer = JSON.parse(localStorage.getItem("Bookmarks"))
    displayBookmarks();
}

function addBookmark(){
    if (bookmarkName.classList.contains("is-valid") && url.classList.contains("is-valid")) {
        var Bookmark = {
            name: bookmarkName.value,
            url: url.value
        }

        bookmarksContainer.push(Bookmark);
        localStorage.setItem("Bookmarks", JSON.stringify(bookmarksContainer));

        displayBookmarks();
        clearForm();
    } else {
        boxModal.classList.remove("d-none");
    }
}

function displayBookmarks(){
    var cartoona = "";
    for(var i = 0; i < bookmarksContainer.length; i++){
        cartoona += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarksContainer[i].name}</td>
        <td>
            <button class="btn btn-visit" onclick="visitURL('${bookmarksContainer[i].url}')">
                <i class="fa-solid fa-eye"></i></i> Visit
            </button>
        </td>    
        <td>
            <button class="btn btn-delete" onclick="deleteBookmark(${i})">
                <i class="fa-solid fa-trash-can" ></i> Delete
            </button>
        </td>
    
        <tr>
        `
    }
    tableBody.innerHTML = cartoona;

}

function deleteBookmark(bookmarkIndex){
    bookmarksContainer.splice(bookmarkIndex, 1);
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarksContainer));
    displayBookmarks();
}

function visitURL(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
    }
    window.open(url, "_blank");
}

function clearForm(){
    bookmarkName.value = "";
    url.value = "";
}


// =====> Making sure that user enter the correct data

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

bookmarkName.addEventListener("input", function () {
  validate(bookmarkName, nameRegex, "name");
});

url.addEventListener("input", function () {
  validate(url, urlRegex, "url");
});

function validate(element, regex, type) {
  var isValidRegex = regex.test(element.value.trim());
  var isDuplicate = bookmarksContainer.some(function (bookmark) {
    return type === "name"
      ? bookmark.name === element.value.trim()
      : bookmark.url === element.value.trim();
  });

  if (isValidRegex && !isDuplicate) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.setCustomValidity("");
  } else if (isDuplicate) {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.setCustomValidity("This value already exists.");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.setCustomValidity("Invalid input.");
  }
}


//Close Modal Function

function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
