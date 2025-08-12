document.addEventListener("DOMContentLoaded", () => {

    const btnEntrar = document.getElementById("entrarCamp");
    const idCamp = document.getElementById("")

    btnEntrar.addEventListener("click", async () => {
        try {
            const API_URL = "http://localhost:3000/participantes"; // ajuste para sua rota correta

            // Aqui você define os IDs do usuário e campeonato
            const userId = localStorage.getItem("userId"); // exemplo pegando do localStorage
            const CampId = 1; // exemplo fixo, mas pode vir da URL ou outro lugar

            if (!userId || !CampId) {
                alert("Usuário ou campeonato inválido.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, CampId })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inscrição realizada com sucesso!");
                console.log("Participante inscrito:", data);
            } else {
                alert(data.message || "Erro ao entrar no campeonato.");
                console.error("Erro:", data);
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro de conexão.");
        }
    });



    
})
