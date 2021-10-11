const search = document.querySelector(".search");
search.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  let query = document.querySelector(".searchText").value;
  query = query.trim();
  getResults(query);
}
function getResults(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      putResults(data.query.search);
    })
    .catch((e) => console.log(`ERROR : ${e}`));
}
function putResults(sResults) {
  const searchResults = document.querySelector(".links");
  searchResults.innerHTML = "";
  sResults.forEach((result) => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
    searchResults.insertAdjacentHTML(
      "beforeend",
      `
      <h3>
        <a href="${url}" target="_blank">${result.title}</a>
      </h3>
      <span>${result.snippet}</span><br>
      <a href="${url}" target="_blank" >${url}</a>
      `
    );
  });
}
