🌱 Projeto Agricultura Sustentável

Este projeto tem como objetivo criar um sistema de gestão para agricultura sustentável, combinando uma interface web simples com um backend em Python.
A solução permite o cadastro de agricultores e oferece um chatbot temático para auxiliar no uso da plataforma.

📁 Estrutura de Pastas
Projeto_Agricultura
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
└── backend
    ├── chatbot.py
    └── main.py


frontend/ → Contém os arquivos da interface do usuário (HTML, CSS e JS).

backend/ → Contém a lógica do sistema e o chatbot, desenvolvidos em Python.

🛠️ Tecnologias Utilizadas
-- HTML5 → Estrutura da interface
-- CSS3 → Estilização responsiva e simples
-- JavaScript → Interatividade no frontend
-- Python 3 → Lógica e execução do sistema no backend

🚀 Como Executar

Clone o repositório

git clone https://github.com/seu-usuario/Projeto_Agricultura.git


Entre na pasta do projeto

cd Projeto_Agricultura


Execute o backend

cd backend
python3 main.py


Abra o frontend
Vá até a pasta frontend e abra o arquivo index.html no navegador.

🤖 Funcionalidades Principais
-- Cadastro de agricultores 👨‍🌾
-- Menu interativo no terminal
-- Chatbot temático para assistência 🌿
-- Interface web leve e intuitiva

📌 Objetivo
-- Promover práticas agrícolas mais eficientes e sustentáveis por meio de tecnologia acessível, ajudando produtores a gerenciar informações de forma simples e prática.

🧭 Diagrama de Classes
classDiagram
    class Agricultor {
        - nome: str
        - idade: int
        - propriedade: str
    }

    class ChatBot {
        - nome: str
        - respostas: dict
        + responder(pergunta): str
    }

    class SistemaAgricultura {
        - agricultores: list
        + cadastrar_agricultor()
        + listar_agricultores()
        + iniciar_chatbot()
    }

    SistemaAgricultura "1" --> "*" Agricultor
    SistemaAgricultura "1" --> "1" ChatBot


O diagrama acima representa a estrutura base do sistema, destacando as relações entre as classes principais.

👥 Time do Projeto

Projeto realizado por:

Yasmin Lopes
Pedro Henrique

📚 Desenvolvido durante o curso de Desenvolvimento Back-End com Python pela Softex Academy — Bolsa Futuro Digital.
