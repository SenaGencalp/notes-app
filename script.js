const addBtn = document.getElementById("add");
//notes değişkeni, yerel depolamada (localStorage) saklanan notları alır ve JavaScript nesnesine dönüştürür.
const notes = JSON.parse(localStorage.getItem("notes"));

//Eğer notes değişkeni mevcutsa (yerel depolamada notlar varsa), her not için addNewNote fonksiyonu çağrılarak notlar ekranda görüntülenir.
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

//Kullanıcı "Add" düğmesine tıkladığında addNewNote fonksiyonu çağrılır ve yeni bir not eklenir.
addBtn.addEventListener("click", () => {
  addNewNote();
});

//addNewNote fonksiyonu, yeni bir not oluşturur ve bunu HTML içine ekler.Not oluşturulurken, düzenleme (edit) ve silme (delete) butonları da eklenir.Kullanıcı notu düzenlemek için "edit" butonuna tıkladığında, metin alanı (textarea) ve ana (main) div arasındaki görünürlük değişir."delete" butonuna tıklandığında, not silinir ve updateLS fonksiyonu çağrılarak yerel depolama güncellenir.Kullanıcı metin alanına bir şeyler yazdığında, input olayı tetiklenir ve updateLS fonksiyonu çağrılarak yerel depolama güncellenir.

/**
 * 
 * @param {*} text 
 * @desc: jsdoc
 */
function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

//updateLS fonksiyonu, tüm metin alanlarını (textarea) seçer ve her birinin içeriğini notes dizisine ekler.Daha sonra bu dizi, JSON formatında yerel depolamaya kaydedilir.
function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
