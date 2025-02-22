// popup.js
document.addEventListener("DOMContentLoaded", function() {
    const lista = document.getElementById("listaDisciplinas");
    const input = document.getElementById("novaDisciplina");
    const btnAdicionar = document.getElementById("adicionar");
    const btnExecutar = document.getElementById("executar");
    
    chrome.storage.local.get("disciplinas", function(data) {
        if (data.disciplinas) {
            data.disciplinas.forEach(adicionarItem);
        }
    });

    btnAdicionar.addEventListener("click", function() {
        const disciplina = input.value.trim();
        if (disciplina) {
            chrome.storage.local.get("disciplinas", function(data) {
                let disciplinas = data.disciplinas || [];
                disciplinas.push(disciplina);
                chrome.storage.local.set({"disciplinas": disciplinas});
                adicionarItem(disciplina);
                input.value = "";
            });
        }
    });

    btnExecutar.addEventListener("click", function() {
        chrome.scripting.executeScript({
            target: {tabId: chrome.tabs.TAB_ID_NONE},
            files: ["content.js"]
        });
    });

    function adicionarItem(disciplina) {
        const li = document.createElement("li");
        li.textContent = disciplina;
        
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "X";
        btnRemover.style.marginLeft = "10px";
        btnRemover.addEventListener("click", function() {
            chrome.storage.local.get("disciplinas", function(data) {
                let disciplinas = data.disciplinas || [];
                disciplinas = disciplinas.filter(d => d !== disciplina);
                chrome.storage.local.set({"disciplinas": disciplinas});
                lista.removeChild(li);
            });
        });
        
        li.appendChild(btnRemover);
        lista.appendChild(li);
    }
});