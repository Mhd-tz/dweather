import "./darkmode.scss";

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme = () => {
  if (localStorage.getItem("theme") === "dark") {
    setLight();
  } else {
    setDark();
  }
};

const DarkMode = () => {
  return (
    <div className="dark-mode">
      <input
        type="checkbox"
        id="checkbox"
        onChange={toggleTheme}
        defaultChecked={defaultDark}
      />
      <label htmlFor="checkbox"></label>
    </div>
  );
};

export default DarkMode;
