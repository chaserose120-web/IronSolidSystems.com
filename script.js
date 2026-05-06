const menuToggle = document.querySelector(".menu-toggle");
const pageShell = document.querySelector(".page-shell");
const jobForm = document.getElementById("job-form");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("job-submit");
const jobsContainer = document.getElementById("jobs-container");
const jobsMessage = document.getElementById("jobs-message");
const refreshJobsButton = document.getElementById("refresh-jobs");

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

// Apply a small entrance animation after paint for a more polished feel.
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

function createJobCard(job) {
  const article = document.createElement("article");
  article.className = "job-item";

  const title = job.title || "Untitled job";
  const customer = job.customer || "Not provided";
  const machine = job.machine || "Not provided";
  const industry = job.industry || "Not provided";
  const status = job.status || "Unknown";

  const top = document.createElement("div");
  top.className = "job-item__top";

  const titleGroup = document.createElement("div");
  const titleElement = document.createElement("strong");
  titleElement.className = "job-item__title";
  titleElement.textContent = title;

  const customerElement = document.createElement("p");
  customerElement.textContent = customer;

  titleGroup.append(titleElement, customerElement);

  const statusElement = document.createElement("span");
  statusElement.className = "status-tag";
  statusElement.textContent = status;

  top.append(titleGroup, statusElement);

  const meta = document.createElement("div");
  meta.className = "job-item__meta";

  const metaFields = [
    { label: "Machine", value: machine },
    { label: "Industry", value: industry },
    { label: "Created", value: formatCreatedAt(job.created_at) }
  ];

  metaFields.forEach((field) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("span");
    const value = document.createElement("strong");

    label.textContent = field.label;
    value.textContent = field.value;
    wrapper.append(label, value);
    meta.appendChild(wrapper);
  });

  const workOrder = document.createElement("p");
  workOrder.className = "job-item__time";
  workOrder.textContent = `Work Order: ${job.work_order || "Not assigned"}`;

  article.append(top, meta, workOrder);

  return article;
}

async function loadJobs() {
  if (!jobsContainer || !jobsMessage) {
    return;
  }

  setMessage(jobsMessage, "Loading jobs...");
  jobsContainer.innerHTML = "";

  const { data, error } = await supabaseClient
    .from("jobs")
    .select("title, customer, machine, industry, status, created_at, work_order")
    .order("created_at", { ascending: false });

  if (error) {
    setMessage(jobsMessage, `Unable to load jobs: ${error.message}`, "error");
    return;
  }

  if (!data || data.length === 0) {
    setMessage(jobsMessage, "No jobs found yet. Create the first one.");
    return;
  }

  setMessage(jobsMessage, `Showing ${data.length} job${data.length === 1 ? "" : "s"}.`);

  const fragment = document.createDocumentFragment();
  data.forEach((job) => {
    fragment.appendChild(createJobCard(job));
  });
  jobsContainer.appendChild(fragment);
}

async function handleJobSubmit(event) {
  event.preventDefault();

  if (!jobForm || !submitButton) {
    return;
  }

  setMessage(formMessage, "Saving job...");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  const formData = new FormData(jobForm);
  const payload = {
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

loadJobs();
