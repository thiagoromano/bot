// content.js
chrome.storage.local.get("disciplinas", function(data) {
    const disciplinas = data.disciplinas || [];
    disciplinas.forEach(nomeDisciplina => {
        document.querySelectorAll("tr").forEach(linha => {
            const nome = linha.querySelector("span.sa")?.textContent.trim();
            if (nome === nomeDisciplina) {
                linha.querySelector("input[type='checkbox']")?.click();
            }
        });
    });
    document.getElementById("enviar")?.click();
});
// Tratamento de erro para disciplinas sem vagas
setTimeout(() => {
    const erroContainer = document.getElementById("errorExplanation");
    if (erroContainer) {
        const erroMensagens = erroContainer.querySelectorAll("li");
        erroMensagens.forEach(erro => {
            const match = erro.textContent.match(/Turma - (.*?), com vagas esgotadas\./);
            if (match) {
                const disciplinaSemVaga = match[1].trim();
                document.querySelectorAll("tr").forEach(linha => {
                    const nome = linha.querySelector("span.sa")?.textContent.trim();
                    if (nome === disciplinaSemVaga) {
                        let checkbox = linha.querySelector("input[type='checkbox']");
                        if (checkbox && checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            }
        });
        setTimeout(() => {
            document.getElementById("enviar")?.click();
        }, 500);
    }
}, 1000);