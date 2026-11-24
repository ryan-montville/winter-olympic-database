export function makeElement(elementType, elementId, elementClass, elementText) {
  const newElement = document.createElement(elementType);
  if (elementId) newElement.setAttribute('id', elementId);
  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }
  if (elementText) newElement.textContent = elementText;
  return newElement;
}

export function createLink(href, linkText, external) {
  const newLink = document.createElement("a");
  newLink.href = href;
  newLink.textContent = linkText;
  if (external) {
    newLink.target = "_blank";
  }
  return newLink;
}

function parseCsvLine(line, delimiter = ",") {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === delimiter && !inQuotes) {
            values.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
}

export function parseCsv(csvText, { delimiter = ",", autoConvertNumbers = true } = {}) {
    const lines = csvText
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .filter((line) => line.trim() !== "");

    if (lines.length === 0) return [];

    const headers = parseCsvLine(lines[0], delimiter);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i], delimiter);
        const row = {};

        headers.forEach((header, idx) => {
            const rawValue = values[idx] ?? "";
            if (
                autoConvertNumbers &&
                rawValue !== "" &&
                !Number.isNaN(Number(rawValue))
            ) {
                row[header] = Number(rawValue);
            } else {
                row[header] = rawValue;
            }
        });

        rows.push(row);
    }

    return rows;
}

export async function loadCsv(source, options = {}) {
    const response = await fetch(source);
    if (!response.ok) {
        throw new Error(`Failed to load CSV from ${source}: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    return parseCsv(csvText, options);
}