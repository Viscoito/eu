const translations = {
  pt: {
    "nav.language": "Idioma",
    "nav.themeDark": "🌙 Escuro",
    "nav.themeLight": "☀️ Claro",
  },
  en: {
    "nav.language": "Language",
    "nav.themeDark": "🌙 Dark",
    "nav.themeLight": "☀️ Light",
  },
  es: {
    "nav.language": "Idioma",
    "nav.themeDark": "🌙 Oscuro",
    "nav.themeLight": "☀️ Claro",
  },
  ja: {
    "nav.language": "言語",
    "nav.themeDark": "🌙 ダーク",
    "nav.themeLight": "☀️ ライト",
  },
};

const langSelect = document.getElementById("langSelect");
const themeToggle = document.getElementById("themeToggle");
const translatable = document.querySelectorAll("[data-i18n]");
const revealNodes = document.querySelectorAll(".reveal");

function t(key) {
  const lang = langSelect?.value || document.documentElement.lang || "pt";
  return (translations[lang] || translations.pt)[key] || key;
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.pt;
  document.documentElement.lang = lang;
  translatable.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });
  updateThemeLabel();
  localStorage.setItem("portfolio-lang", lang);
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  updateThemeLabel();
}

function updateThemeLabel() {
  if (!themeToggle) return;
  themeToggle.textContent =
    document.body.dataset.theme === "dark"
      ? t("nav.themeLight")
      : t("nav.themeDark");
}

if (langSelect) {
  langSelect.addEventListener("change", (event) =>
    applyLanguage(event.target.value),
  );
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 },
  );
  revealNodes.forEach((node) => sectionObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("visible"));
}

const savedLang = localStorage.getItem("portfolio-lang") || "pt";
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
if (langSelect) langSelect.value = savedLang;
setTheme(savedTheme);
applyLanguage(savedLang);

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
  return response.json();
}

function renderDiary(entries) {
  const list = document.getElementById("diaryList");
  if (!list) return;
  const coreModel = model.internalModel.coreModel;

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted
    .map((item) => {
      const tags = (item.tags || []).map((tag) => `<li>${tag}</li>`).join("");
      return `
        <article class="entry-card">
          <p class="meta-line">${formatDate(item.date)}</p>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <ul class="chip-list">${tags}</ul>
          <a class="inline-link" href="${item.url}">Ler entrada completa</a>
        </article>
      `;
    })
    .join("");

  setupDiaryFilterScaffold(sorted);
}

function setupDiaryFilterScaffold(entries) {
  const yearSelect = document.getElementById("diaryYearFilter");
  const tagSelect = document.getElementById("diaryTagFilter");
  if (!yearSelect || !tagSelect) return;

  const years = [...new Set(entries.map((entry) => entry.date.slice(0, 4)))];
  const tags = [...new Set(entries.flatMap((entry) => entry.tags || []))];

  yearSelect.innerHTML += years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  tagSelect.innerHTML += tags
    .map((tag) => `<option value="${tag}">${tag}</option>`)
    .join("");
}

function renderPhotos(items) {
  const grid = document.getElementById("photosGrid");
  if (!grid) return;

  grid.innerHTML = items
    .map((item) => {
      const tags = (item.tags || []).map((tag) => `<li>${tag}</li>`).join("");
      return `
      <figure class="photo-card">
        <img src="${item.image}" alt="${item.caption}" loading="lazy" />
        <figcaption>
          <p class="meta-line">${formatDate(item.date)}${item.location ? ` • ${item.location}` : ""}</p>
          <p>${item.caption}</p>
          <ul class="chip-list">${tags}</ul>
        </figcaption>
      </figure>`;
    })
    .join("");

  setupPhotoFilterScaffold(items);
}

function setupPhotoFilterScaffold(items) {
  const themeSelect = document.getElementById("photoThemeFilter");
  if (!themeSelect) return;

  const themes = [...new Set(items.map((item) => item.theme).filter(Boolean))];
  themeSelect.innerHTML += themes
    .map((theme) => `<option value="${theme}">${theme}</option>`)
    .join("");
}

function renderHomePreviews(diaryEntries, photos, siteContent) {
  const diaryPreview = document.getElementById("homeDiaryPreview");
  const photosPreview = document.getElementById("homePhotosPreview");
  const projectsPreview = document.getElementById("homeProjectsPreview");

  if (diaryPreview) {
    diaryPreview.innerHTML = diaryEntries
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3)
      .map(
        (item) => `
      <article class="preview-card">
        <p class="meta-line">${formatDate(item.date)}</p>
        <h4>${item.title}</h4>
        <p>${item.summary}</p>
      </article>`,
      )
      .join("");
  }

  if (photosPreview) {
    photosPreview.innerHTML = photos
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4)
      .map(
        (item) => `
      <figure class="mini-photo">
        <img src="${item.image}" alt="${item.caption}" loading="lazy" />
        <figcaption>${item.caption}</figcaption>
      </figure>`,
      )
      .join("");
  }

  if (projectsPreview) {
    projectsPreview.innerHTML = (siteContent.projects || [])
      .slice(0, 3)
      .map(
        (item) => `
      <article class="preview-card">
        <p class="meta-line">${item.category}</p>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </article>`,
      )
      .join("");
  }
}

function renderProjects(projects) {
  const list = document.getElementById("projectsList");
  if (!list) return;

  list.innerHTML = projects
    .map(
      (item) => `
      <article class="card">
        <p class="meta-line">${item.category}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <ul class="chip-list">${(item.stack || []).map((tag) => `<li>${tag}</li>`).join("")}</ul>
      </article>`,
    )
    .join("");
}

function renderArtworks(artworks) {
  const list = document.getElementById("artworksGrid");
  if (!list) return;

  list.innerHTML = artworks
    .map(
      (item) => `
      <figure class="photo-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <figcaption>
          <p class="meta-line">${item.type}</p>
          <p><strong>${item.title}</strong></p>
          <p>${item.caption}</p>
        </figcaption>
      </figure>`,
    )
    .join("");
}

function renderCommissions(content) {
  const packages = document.getElementById("commissionPackages");
  const process = document.getElementById("commissionProcess");
  const faq = document.getElementById("commissionFaq");

  if (packages) {
    packages.innerHTML = (content.packages || [])
      .map(
        (item) => `
      <article class="entry-card">
        <h3>${item.name}</h3>
        <p class="meta-line">${item.price}</p>
        <p>${item.details}</p>
      </article>`,
      )
      .join("");
  }

  if (process) {
    process.innerHTML = (content.process || [])
      .map(
        (item) => `<li><strong>${item.step}.</strong> ${item.description}</li>`,
      )
      .join("");
  }

  if (faq) {
    faq.innerHTML = (content.faq || [])
      .map(
        (item) => `
      <details class="faq-item">
        <summary>${item.question}</summary>
        <p>${item.answer}</p>
      </details>`,
      )
      .join("");
  }
}

async function initContent() {
  try {
    const [diaryData, photosData, siteContent] = await Promise.all([
      fetchJson("./data/diary.json"),
      fetchJson("./data/photos.json"),
      fetchJson("./data/site-content.json"),
    ]);

    const diaryEntries = diaryData.entries || [];
    const photos = photosData.photos || [];

    renderDiary(diaryEntries);
    renderPhotos(photos);
    renderProjects(siteContent.projects || []);
    renderArtworks(siteContent.artworks || []);
    renderCommissions(siteContent.commissions || {});
    renderHomePreviews(diaryEntries, photos, siteContent);
  } catch (error) {
    console.error("Erro ao carregar conteúdo do site:", error);
  }
}

async function initVtuber() {
  const canvas = document.getElementById("vtuberCanvas");
  if (!canvas || typeof PIXI === "undefined" || !PIXI.live2d) return;

  const modelPath = "./assets/live2d/Visnhaa/Visnha.model3.json";
  const app = new PIXI.Application({
    view: canvas,
    autoStart: true,
    backgroundAlpha: 0,
    antialias: true,
    resizeTo: canvas,
  });

  const model = await PIXI.live2d.Live2DModel.from(modelPath);
  app.stage.addChild(model);

  function fitModelToViewport() {
    const canvasWidth = canvas.clientWidth || 780;
    const canvasHeight = canvas.clientHeight || 440;
    const bounds = model.getLocalBounds();
    const scale = Math.min(
      (canvasWidth * 0.75) / bounds.width,
      (canvasHeight * 0.92) / bounds.height,
    );

    model.scale.set(scale);
    model.position.set(
      canvasWidth / 2 - (bounds.x + bounds.width / 2) * scale,
      // canvasHeight * 2 - (bounds.y + bounds.height / 2) * scale,
    );
  }

  fitModelToViewport();
  new ResizeObserver(fitModelToViewport).observe(canvas);
}
coreModel.addParameterValueById("ParamNairastraToggle18", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle66", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle65", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle16", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle15", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle55", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle59", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle60", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle62", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle67", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle68", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle56", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle58", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle73", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle50", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle25", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle51", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle26", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle17", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle52", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle19", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle27", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle28", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle34", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle35", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle36", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle24", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle64", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle29", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle30", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle31", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle33", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle32", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle20", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle21", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle22", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle23", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle45", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle46", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle53", 1.0);
coreModel.addParameterValueById("ParamNairastraToggle70", 1.0);
initContent();
initVtuber();
