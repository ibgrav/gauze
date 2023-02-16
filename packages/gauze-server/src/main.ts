export {};

const components = document.querySelectorAll<HTMLElement>("[data-name]");

components.forEach((component) => {
  const name = component.dataset.name || "";
  const props = JSON.parse(decodeURIComponent(component.dataset.props || ""));
  console.log(props);

  component.addEventListener("click", async () => {
    const res = await fetch(`/component/${name}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, props }),
    });

    const data = await res.json();

    console.log({ data });
  });
});
