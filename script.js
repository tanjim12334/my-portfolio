async function searchAyah() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {
    const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
    const data = await response.json();

    if (data.data.count > 0) {
      resultsDiv.innerHTML = data.data.matches.map(match => `
        <div class="mb-3 p-3 border rounded">
          <p><strong>Surah ${match.surah.name}, Ayah ${match.numberInSurah}</strong></p>
          <p>${match.text}</p>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p class="text-warning">No matching Ayah found.</p>';
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p class="text-danger">Error fetching data. Please try again later.</p>';
  }
}


async function searchAyah() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'অনুসন্ধান চলছে...';








  
  try {
    // বাংলা অনুবাদে সার্চ
    const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/bn.bengali`);
    const data = await response.json();

    if (data.data.count > 0) {
      resultsDiv.innerHTML = data.data.matches.map(match => `
        <div class="mb-3 p-3 border rounded bg-white shadow-sm">
          <p><strong>সূরা ${match.surah.name} (${match.surah.englishName}) - আয়াত ${match.numberInSurah}</strong></p>
          <p>${match.text}</p>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p class="text-warning">কোনো মিল পাওয়া যায়নি।</p>';
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p class="text-danger">ডাটা আনতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।</p>';
  }
}



fetch("https://api.alquran.cloud/v1/surah/1/bn.bengali")
.then(res => res.json())
.then(data => {
  console.log(data.data.ayahs); // আয়াতগুলোর লিস্ট
})



let quranData = [];
let currentSurah = null;
let currentPage = 1;
const ayahsPerPage = 10;

async function fetchQuran() {
const res = await fetch("https://api.alquran.cloud/v1/quran/en.asad");
const data = await res.json();
quranData = data.data.surahs;

populateSurahDropdown();
}

function populateSurahDropdown() {
const select = document.getElementById("surahSelect");
select.innerHTML = `<option value="">-- Choose a Surah --</option>`;

quranData.forEach(surah => {
  const option = document.createElement("option");
  option.value = surah.number;
  option.textContent = `Surah ${surah.number}: ${surah.englishName}`;
  select.appendChild(option);
});

select.addEventListener("change", (e) => {
  currentSurah = quranData.find(s => s.number == e.target.value);
  currentPage = 1;
  renderAyahs();
});
}

function renderAyahs() {
const ayahContainer = document.getElementById("ayahsOutput");
ayahContainer.innerHTML = "";

if (!currentSurah) return;

const start = (currentPage - 1) * ayahsPerPage;
const end = start + ayahsPerPage;
const totalPages = Math.ceil(currentSurah.ayahs.length / ayahsPerPage);

const currentAyahs = currentSurah.ayahs.slice(start, end);

currentAyahs.forEach(ayah => {
  const para = document.createElement("p");
  para.innerHTML = `<strong>Ayah ${ayah.number}:</strong> ${ayah.text}`;
  ayahContainer.appendChild(para);
});

document.getElementById("prevPage").disabled = currentPage === 1;
document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
if (currentPage > 1) {
  currentPage--;
  renderAyahs();
}
});

document.getElementById("nextPage").addEventListener("click", () => {
const totalPages = Math.ceil(currentSurah.ayahs.length / ayahsPerPage);
if (currentPage < totalPages) {
  currentPage++;
  renderAyahs();
}
});

fetchQuran();



// script.js

async function fetchQuran() {
  const response = await fetch("https://api.alquran.cloud/v1/quran/en.asad");
  const data = await response.json();

  const quranOutput = document.getElementById("quranOutput");

  data.data.surahs.forEach(surah => {
    const surahDiv = document.createElement("div");
    surahDiv.classList.add("mb-4", "p-3", "bg-white", "border", "rounded");

    const surahTitle = document.createElement("h3");
    surahTitle.textContent = `Surah ${surah.number}: ${surah.englishName} (${surah.name})`;
    surahDiv.appendChild(surahTitle);

    surah.ayahs.forEach(ayah => {
      const ayahP = document.createElement("p");
      ayahP.innerHTML = `<strong>Ayah ${ayah.number}:</strong> ${ayah.text}`;
      surahDiv.appendChild(ayahP);
    });

    quranOutput.appendChild(surahDiv);
  });
}

fetchQuran();


fetch("https://api.alquran.cloud/v1/quran/en.asad")
.then(response => response.json())
.then(data => {
  const surahs = data.data.surahs;
  surahs.forEach(surah => {
    console.log(`Surah ${surah.number}: ${surah.englishName}`);
    surah.ayahs.forEach(ayah => {
      console.log(`Ayah ${ayah.number}: ${ayah.text}`);
    });
  });
});



function populateSurahDropdown(filteredSurahs = quranData) {
  const select = document.getElementById("surahSelect");
  select.innerHTML = `<option value="">-- Choose a Surah --</option>`;

  filteredSurahs.forEach(surah => {
    const option = document.createElement("option");
    option.value = surah.number;
    option.textContent = `Surah ${surah.number}: ${surah.englishName}`;
    select.appendChild(option);
  });
}

// 🔎 লাইভ ফিল্টার ইভেন্ট
document.getElementById("surahSearch").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = quranData.filter(surah =>
    surah.englishName.toLowerCase().includes(keyword)
  );

  populateSurahDropdown(filtered);
});



async function loadArabicQuran() {
  const response = await fetch("https://api.alquran.cloud/v1/quran/ar.alafasy");
  const data = await response.json();

  const surahs = data.data.surahs;
  console.log(surahs); // এখানে তুমি পুরো কোরআন পাবে
}

async function loadQuran() {
const container = document.getElementById("quranContainer");
container.innerHTML = "Loading...";

try {
  const response = await fetch("https://api.alquran.cloud/v1/quran/ar.alafasy");
  const data = await response.json();

  container.innerHTML = ""; // আগের Loading মুছে ফেলি

  data.data.surahs.forEach(surah => {
    const surahTitle = document.createElement("h2");
    surahTitle.textContent = `سورة ${surah.name} (${surah.englishName})`;
    container.appendChild(surahTitle);

    surah.ayahs.forEach(ayah => {
      const p = document.createElement("p");
      p.textContent = ayah.text;
      container.appendChild(p);
    });
  });
} catch (error) {
  container.innerHTML = "Error loading Qur'an.";
  console.error("Error:", error);
}
}


async function searchAyah() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {
    const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
    const data = await response.json();

    if (data.data.count > 0) {
      resultsDiv.innerHTML = '';

      for (const match of data.data.matches) {
        // আরবি আয়াত লোড করো
        const arabicResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/ar.alafasy`);
        const arabicData = await arabicResponse.json();

        const resultCard = document.createElement("div");
        resultCard.classList.add("mb-3", "p-3", "border", "rounded");
        resultCard.innerHTML = `
          <p><strong>Surah: ${match.surah.englishName} (${match.surah.name})</strong></p>
          <p><strong>Ayah: ${match.numberInSurah}</strong></p>
          <p><strong>Arabic:</strong> ${arabicData.data.text}</p>
          <p><strong>English:</strong> ${match.text}</p>
        `;
        resultsDiv.appendChild(resultCard);
      }
    } else {
      resultsDiv.innerHTML = '<p class="text-warning">No matching Ayah found.</p>';
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p class="text-danger">Error fetching data. Please try again later.</p>';
  }
}



// সব সূরা লোড করো dropdown এ
async function loadSurahs() {
const select = document.getElementById('surahSelect');
const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
const data = await response.json();

data.data.surahs.forEach(surah => {
  const option = document.createElement('option');
  option.value = surah.number;
  option.textContent = `${surah.number}. ${surah.englishName} (${surah.name})`;
  select.appendChild(option);
});
}

// সিলেক্ট করা সূরার আয়াত লোড করো
async function loadSurahAyahs() {
const surahNumber = document.getElementById('surahSelect').value;
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = 'Loading...';

try {
  const [enRes, arRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`),
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
  ]);

  const enData = await enRes.json();
  const arData = await arRes.json();

  resultsDiv.innerHTML = '';

  enData.data.ayahs.forEach((ayah, index) => {
    const arabicText = arData.data.ayahs[index].text;

    const div = document.createElement('div');
    div.className = 'p-3 border rounded mb-3';
    div.innerHTML = `
      <p><strong>Ayah ${ayah.numberInSurah}</strong></p>
      <p><strong>Arabic:</strong> ${arabicText}</p>
      <p><strong>English:</strong> ${ayah.text}</p>
    `;
    resultsDiv.appendChild(div);
  });
} catch (error) {
  resultsDiv.innerHTML = '<p class="text-danger">Failed to load Ayahs.</p>';
  console.error(error);
}
}

// শুরুতেই সূরা লোড
loadSurahs();

async function searchAyah() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {
    const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
    const data = await response.json();

    if (data.data.count > 0) {
      resultsDiv.innerHTML = data.data.matches.map(match => `
        <div class="mb-3 p-3 border rounded">
          <p><strong>Surah ${match.surah.name}, Ayah ${match.numberInSurah}</strong></p>
          <p>${match.text}</p>
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = '<p class="text-warning">No matching Ayah found.</p>';
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p class="text-danger">Error fetching data. Please try again later.</p>';
  }
}






    function resetBlogs() {
      document.getElementById('blogSearch').value = '';
      const cards = document.querySelectorAll('.blog-card');
      cards.forEach(card => {
        card.style.display = 'block';
      });
    }

    
  async function searchAyah() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    try {
      const response = await fetch('https://api.quran.com:443/v4/verses/by_keyword?language=en&keyword=' + query);
      const data = await response.json();

      if (data.verses && data.verses.length > 0) {
        resultsDiv.innerHTML = data.verses.map(verse => `
          <div class="mb-3 p-3 border rounded">
            <p><strong>Surah ${verse.surah_id}, Ayah ${verse.verse_number}</strong></p>
            <p>${verse.text_uthmani || 'Ayah text not available in Arabic.'}</p>
          </div>
        `).join('');
      } else {
        resultsDiv.innerHTML = '<p class="text-warning">No matching Ayah found.</p>';
      }
    } catch (error) {
      resultsDiv.innerHTML = '<p class="text-danger">Error fetching data. Please try again later.</p>';
    }
  }

  function resetResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
  }



  function toggleTheme() {
  const html = document.documentElement;
  if (html.getAttribute("data-bs-theme") === "dark") {
    html.setAttribute("data-bs-theme", "light");
    document.body.classList.remove("bg-dark", "text-light");
    document.body.classList.add("bg-light", "text-dark");
  } else {
    html.setAttribute("data-bs-theme", "dark");
    document.body.classList.remove("bg-light", "text-dark");
    document.body.classList.add("bg-dark", "text-light");
  }
}

function searchAyah() {
  const keyword = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Searching...</p>";

  if (!keyword) {
    resultsDiv.innerHTML = "<p>Please enter a keyword to search.</p>";
    return;
  }

  fetch(`https://api.quran.com/v4/search?q=${keyword}&size=5&page=1&language=en`)
    .then(res => res.json())
    .then(data => {
      if (!data?.data?.matches?.length) {
        resultsDiv.innerHTML = "<p>No Ayahs found for this keyword.</p>";
        return;
      }

      const cards = data.data.matches.map(ayah => `
        <div class="result-card">
          <div class="ayah-arabic">${ayah.text}</div>
          <div class="ayah-translation">Surah ${ayah.surah_id}, Ayah ${ayah.verse_id}</div>
        </div>
      `).join("");

      resultsDiv.innerHTML = cards;
    })
    .catch(err => {
      resultsDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
      console.error(err);
    });
}


document.getElementById('darkSwitch').addEventListener('change', function() {
  document.body.classList.toggle('dark-mode');
});

 src="https://unpkg.com/aos@2.3.1/dist/aos.js"

  AOS.init();




  
  async function searchAyah() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    if (!query) {
      resultsDiv.innerHTML = '<p class="text-danger">Please enter a keyword.</p>';
      return;
    }

    resultsDiv.innerHTML = '<p>🔄 Searching...</p>';

    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
      
      const data = await response.json();

      if (data.data.count > 0) {
        resultsDiv.innerHTML = data.data.matches.map(match => `
          <div class="mb-3 p-3 border rounded result-card">
            <p><strong>Surah: ${match.surah.englishName} (${match.surah.name})</strong></p>
            <p><strong>Ayah: ${match.numberInSurah}</strong></p>
            <p>${match.text}</p>
          </div>
        `).join('');
      } else {
        resultsDiv.innerHTML = '<p class="text-warning">⚠️ No matching Ayah found.</p>';
      }
    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML = '<p class="text-danger">❌ Error fetching data. Please try again later.</p>';
    }
  }


