// Alle Gerichte hier
const menu = [

  // hauptgerichte
  { name: "Pizza Krabben", price: 9.5, category: "Hauptgerichte" },
  { name: "Krabbenburger", price: 5.9, category: "Hauptgerichte" },
  { name: "Krabben Ei Burger", price: 8.5, category: "Hauptgerichte" },
  { name: "Hausgemachter Veggie-Burger", price: 12.9, category: "Hauptgerichte" },

  // nachspeise
  { name: "Schoko Muffin", price: 3.0, category: "Nachspeisen" },
  { name: "Tiramisu", price: 4.5, category: "Nachspeisen" },

  // getränke
  { name: "Cola (0,5l)", price: 2.5, category: "Getränke" },
  { name: "Wasser mit Plankton geschmack(0,5l)", price: 2.0, category: "Getränke" },
  { name: "Tee mit Quallenstücke (Bubble-Tea) (0,5l)", price: 2.0, category: "Getränke" },

];

// Warenkork -- wird aus localstorage geladen oder leer gestartet
const Warenkorb = JSON.parse(localStorage.getItem("Warenkorb")) || [];

// menü anzeigen nach kategorie
function renderMenu() {
  const kategorien = ["Hauptgerichte", "Nachspeisen", "Getränke"];

  kategorien.forEach(kategorie => {
    const bereich = document.getElementById(kategorie);
    const gefiltert = menu.filter(item => item.category === kategorie);

    gefiltert.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${item.name}</strong><br>
        ${item.price.toFixed(2)} € 
        <button onclick="zumWarenkorb(${menu.indexOf(item)})">+</button>
        <hr>
      `;
      bereich.appendChild(div);
    });
  });
}

// Funktion, artikel in den warenkorb legen
function zumWarenkorb(index) {
  const item = menu[index];
  const existing = Warenkorb.find(i => i.name === item.name);

  if (existing) {
    existing.qty++;
  } else {
    Warenkorb.push({ ...item, qty: 1 });
  }

  updateWarenkorb();
}

// Funktion: wird angezeigt und im warenkorb gepsiehcert
function updateWarenkorb() {
  const list = document.getElementById("Warenkorb-items");
  list.innerHTML = "";
  let gesamtsumme = 0;

  Warenkorb.forEach((item, i) => {
    const li = document.createElement("li");
    const itemGesamt = item.price * item.qty;

    li.innerHTML = `
      ${item.name} 
      <button class="qty-btn" onclick="decreaseQty(${i})">−</button>
      ${item.qty}x
      <button class="qty-btn" onclick="increaseQty(${i})">+</button>
      – ${itemGesamt.toFixed(2)} €
      <button class="remove-btn" onclick="removeItem(${i})">🗑️</button>
    `;

    list.appendChild(li);
    gesamtsumme += itemGesamt;
  });

  document.getElementById("gesamtsumme").textContent = gesamtsumme.toFixed(2) + " €";
  const lieferkosten = 5;
  document.getElementById("gesamt").textContent = (gesamtsumme + lieferkosten).toFixed(2) + " €";

  localStorage.setItem("Warenkorb", JSON.stringify(Warenkorb));
}

// Menge erhöhen funktion
function increaseQty(i) {
  Warenkorb[i].qty++;
  updateWarenkorb();
}

// Menge verringern oder löschen, wenn qty = 1 // https://stackoverflow.com/questions/78151118/javascript-onclick-event-add-1-and-1-in-quantity-product
function decreaseQty(i) {
  if (Warenkorb[i].qty > 1) {
    Warenkorb[i].qty--;
  } else {
    Warenkorb.splice(i, 1);
  }
  updateWarenkorb();
}

// Komplett alles entfernen
function removeItem(i) {
  Warenkorb.splice(i, 1);
  updateWarenkorb();
}

// website starten
renderMenu();
updateWarenkorb();


// weitere ideen:
// 1, ein bestell-btn mit alter() dass die Bestellung abgesendet wurde
// 2, weitere Seiten zb. für IMpressum usw.