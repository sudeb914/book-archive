// ==================all required element====================
const searchInput = document.getElementById("search_input_box");
const resultsDiv = document.getElementById("results");
const resultsCount = document.getElementById("results_counts");
const topResults = document.getElementById("top_results");
const loader = document.getElementById("loader");

//============================showing result  =============================
const showResultCount = (number, searchText) => {
    resultsCount.innerText = `About ${number} results found for keyword " ${searchText} "`;
};

//========================== Call the loadResult ==========================
document.getElementById("search_input_box").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        loadResults();
    }
});

// ========================load results ==========================
const loadResults = async () => {
    const searchText = searchInput.value;

    // ============================empty value set ======================
    resultsDiv.textContent = "";
    resultsCount.textContent = "";
    searchInput.value = "";

    topResults.style.display = "none";
    loader.style.display = "block";

    // ===========================alert show when searchText is empty==================
    if (searchText == "") {
        loader.style.display = "none";
        alert("You have to write something to search!");
    } else {
        try {
            const url = `https://openlibrary.org/search.json?q=${searchText}`;
            const res = await fetch(url);
            const data = await res.json();
            const resultFound = data?.numFound;
            showResultCount(resultFound, searchText);
            showResults(data?.docs);
        } catch (error) {
            alert("Something went wrong!");
        }
    }
};

// ==============================Display results =======================



const showResults = (data) => {
    if (data?.length == 0) {
        alert("No search Result !!");
    }

    topResults.innerText = `Showing top ${data?.length} results`;

    data?.forEach((item) => {
        const bookName = item?.title;
        const authors = item?.author_name?.toString();

        const firstPublish = item?.first_publish_year;
        const publisher = item?.publisher?.[0];
        const imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`;

        const div = document.createElement("div");
        div.className = "col";
        div.innerHTML = `
        <div class="card border-0 shadow-lg" style="height:100%;border-radius: 30px;">
            ${item?.cover_i
                ? `<img src=${imgUrl} class="h-75 w-75 mx-auto" alt="...">`
                : ""
            }
            <div class="card-body">
                <h5 class="card-title fw-bolder">${bookName ? bookName : ""
            }</h5>
                <p class="card-text"> ${authors ? `Author : <strong> ${authors}</strong>` : ""
            } </p>
                <p class="card-text"> ${firstPublish
                ? `First Published : <strong> ${firstPublish} </strong>`
                : ""
            }</p>
                <p class="card-text">${publisher
                ? `Publisher : <strong> ${publisher} </strong>`
                : ""
            }</p>
            </div>
      </div>
        `;
        resultsDiv.appendChild(div);
    });
    //==============================hide loader=====================
    loader.style.display = "none";
    topResults.style.display = "block";
};
