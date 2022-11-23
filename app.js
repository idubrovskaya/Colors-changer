const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
  }
  console.log(event.code);
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.child[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent);
    alert('Copied!');
  }
});

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(color);
    }

    col.style.background = color;
    text.textContent = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();

  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => {
      return color.toString().substring(1);
    })
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}
setRandomColors(true);
