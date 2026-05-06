const pageShell = document.querySelector(".app-shell");
const menuToggle = document.querySelector(".menu-toggle");
const appSections = document.getElementById("app-sections");
const currentUserEmail = document.getElementById("current-user-email");
const dashboardUserEmail = document.getElementById("dashboard-user-email");
const jobCount = document.getElementById("job-count");

const authForm = document.getElementById("auth-form");
const authEmailInput = document.getElementById("auth-email");
const authPasswordInput = document.getElementById("auth-password");
const authMessage = document.getElementById("auth-message");
const signUpButton = document.getElementById("sign-up-button");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");

const jobForm = document.getElementById("job-form");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("job-submit");
const jobsContainer = document.getElementById("jobs-container");
const jobsMessage = document.getElementById("jobs-message");
const refreshJobsButton = document.getElementById("refresh-jobs");

let currentUser = null;

if (menuToggle && pageShell) {
  const nav = document.getElementById("site-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    pageShell.classList.toggle("menu-open", !isOpen);

    if (!isOpen && nav) {
      nav.querySelector("a")?.focus();
    }
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("is-ready");
});

function setMessage(element, message, type = "") {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.remove("is-success", "is-error");

  if (type === "success") {
    element.classList.add("is-success");
  }

  if (type === "error") {
    element.classList.add("is-error");
  }
}

function getAuthCredentials() {
  return {
    email: authEmailInput?.value.trim() || "",
    password: authPasswordInput?.value || ""
  };
}

function setAuthButtonsDisabled(isDisabled) {
  [signUpButton, signInButton, signOutButton].forEach((button) => {
    if (button) {
      button.disabled = isDisabled;
    }
  });
}

function updateAuthUI(user) {
  const email = user?.email || "Not signed in";
  const isLoggedIn = Boolean(user);

  currentUserEmail.textContent = email;
  dashboardUserEmail.textContent = email;
  appSections.hidden = !isLoggedIn;
  signOutButton.disabled = !isLoggedIn;

  if (!isLoggedIn) {
    jobsContainer.innerHTML = "";
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    setMessage(formMessage, "");
  }
}

function formatCreatedAt(value) {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function createMetaItem(labelText, valueText) {
  const wrapper = document.createElement("div");
  wrapper.className = "job-meta";

  const label = document.createElement("span");
  label.className = "job-meta__label";
  label.textContent = labelText;

  const value = document.createElement("strong");
  value.textContent = valueText;

  wrapper.append(label, value);
  return wrapper;
}

function createJobCard(job) {
  const article = document.createElement("article");
  article.className = "job-item";

  const top = document.createElement("div");
  top.className = "job-item__top";

  const titleGroup = document.createElement("div");
  const titleElement = document.createElement("strong");
  titleElement.className = "job-item__title";
  titleElement.textContent = job.title || "Untitled job";

  const customerElement = document.createElement("p");
  customerElement.textContent = job.customer || "No customer listed";
  titleGroup.append(titleElement, customerElement);

  const statusElement = document.createElement("span");
  statusElement.className = "status-tag";
  statusElement.textContent = job.status || "Unknown";

  top.append(titleGroup, statusElement);

  const meta = document.createElement("div");
  meta.className = "job-item__meta";
  meta.append(
    createMetaItem("Machine", job.machine || "Not provided"),
    createMetaItem("Industry", job.industry || "Not provided"),
    createMetaItem("Work Order", job.work_order || "Not assigned"),
    createMetaItem("Created", formatCreatedAt(job.created_at))
  );

  article.append(top, meta);
  return article;
}

async function loadJobs() {
  if (!jobsContainer || !jobsMessage) {
    return;
  }

  if (!currentUser) {
    jobsContainer.innerHTML = "";
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    return;
  }

  setMessage(jobsMessage, "Loading jobs...");
  jobsContainer.innerHTML = "";

  const { data, error } = await supabaseClient
    .from("jobs")
    .select("title, customer, machine, industry, status, created_at, work_order")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load jobs: ${error.message}`, "error");
    return;
  }

  if (!data || data.length === 0) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, "No jobs found yet. Create your first job.");
    return;
  }

  jobCount.textContent = String(data.length);
  setMessage(jobsMessage, `Showing ${data.length} job${data.length === 1 ? "" : "s"}.`, "success");

  const fragment = document.createDocumentFragment();
  data.forEach((job) => {
    fragment.appendChild(createJobCard(job));
  });
  jobsContainer.appendChild(fragment);
}

async function signUpUser() {
  const { email, password } = getAuthCredentials();

  if (!email || !password) {
    setMessage(authMessage, "Enter an email and password to sign up.", "error");
    return;
  }

  setAuthButtonsDisabled(true);
  setMessage(authMessage, "Creating account...");

  const { error } = await supabaseClient.auth.signUp({ email, password });

  setAuthButtonsDisabled(false);

  if (error) {
    setMessage(authMessage, `Sign up failed: ${error.message}`, "error");
    return;
  }

  setMessage(
    authMessage,
    "Sign up successful. Check your email if confirmation is enabled, then sign in.",
    "success"
  );
}

async function signInUser() {
  const { email, password } = getAuthCredentials();

  if (!email || !password) {
    setMessage(authMessage, "Enter an email and password to sign in.", "error");
    return;
  }

  setAuthButtonsDisabled(true);
  setMessage(authMessage, "Signing in...");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  setAuthButtonsDisabled(false);

  if (error) {
    setMessage(authMessage, `Sign in failed: ${error.message}`, "error");
    return;
  }

  currentUser = data.user || null;
  updateAuthUI(currentUser);
  setMessage(authMessage, "Signed in successfully.", "success");
  await loadJobs();
}

async function signOutUser() {
  setAuthButtonsDisabled(true);
  setMessage(authMessage, "Signing out...");

  const { error } = await supabaseClient.auth.signOut();

  setAuthButtonsDisabled(false);

  if (error) {
    setMessage(authMessage, `Sign out failed: ${error.message}`, "error");
    return;
  }

  currentUser = null;
  updateAuthUI(currentUser);
  setMessage(authMessage, "Signed out.", "success");
}

async function checkCurrentUser() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    currentUser = null;
    updateAuthUI(currentUser);
    setMessage(authMessage, `Session check failed: ${error.message}`, "error");
    return;
  }

  currentUser = data.session?.user || null;
  updateAuthUI(currentUser);

  if (currentUser) {
    setMessage(authMessage, "Session restored.", "success");
    await loadJobs();
  } else {
    setMessage(authMessage, "Sign in to access your app workspace.");
  }
}

async function handleJobSubmit(event) {
  event.preventDefault();

  if (!jobForm || !submitButton) {
    return;
  }

  if (!currentUser) {
    setMessage(formMessage, "You must be signed in to save a job.", "error");
    return;
  }

  setMessage(formMessage, "Saving job...");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  const formData = new FormData(jobForm);
  const payload = {
    user_id: currentUser.id,
    title: formData.get("title")?.toString().trim() || "",
    status: formData.get("status")?.toString().trim() || "",
    work_order: formData.get("work_order")?.toString().trim() || "",
    customer: formData.get("customer")?.toString().trim() || "",
    machine: formData.get("machine")?.toString().trim() || "",
    serial: formData.get("serial")?.toString().trim() || "",
    industry: formData.get("industry")?.toString().trim() || "",
    complaint: formData.get("complaint")?.toString().trim() || "",
    cause: formData.get("cause")?.toString().trim() || "",
    correction: formData.get("correction")?.toString().trim() || ""
  };

  const { error } = await supabaseClient.from("jobs").insert(payload);

  submitButton.disabled = false;
  submitButton.textContent = "Save Job";

  if (error) {
    setMessage(formMessage, `Failed to save job: ${error.message}`, "error");
    return;
  }

  jobForm.reset();
  const statusField = jobForm.elements.namedItem("status");
  if (statusField instanceof HTMLInputElement) {
    statusField.value = "Open";
  }

  setMessage(formMessage, "Job saved successfully.", "success");
  await loadJobs();
}

if (jobForm) {
  jobForm.addEventListener("submit", handleJobSubmit);
}

if (refreshJobsButton) {
  refreshJobsButton.addEventListener("click", loadJobs);
}

if (signUpButton) {
  signUpButton.addEventListener("click", signUpUser);
}

if (signInButton) {
  signInButton.addEventListener("click", signInUser);
}

if (signOutButton) {
  signOutButton.addEventListener("click", signOutUser);
}

supabaseClient.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  updateAuthUI(currentUser);

  if (currentUser) {
    loadJobs();
  }
});

updateAuthUI(null);
checkCurrentUser();
