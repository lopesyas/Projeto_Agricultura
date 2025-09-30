# main.py

from chatbot import ChatBot  # Importa a classe do outro arquivo

# Lista para armazenar agricultores
agricultores = []

while True:
    print("\n===== Sistema de Gestão para Agricultura Sustentável =====")
    print("1 - Cadastrar Agricultor")
    print("2 - Listar Agricultores")
    print("3 - Atualizar Agricultor")
    print("4 - Excluir Agricultor")
    print("5 - Falar com Chatbot")
    print("6 - Sair")

    opcao = input("Escolha uma opção: ").strip()

    # Cadastrar Agricultor
    if opcao == "1":
        nome = input("Digite o nome do agricultor: ").strip()
        cnpj = input("Digite o CNPJ do agricultor: ").strip()
        cidade = input("Digite a cidade do agricultor: ").strip()
        estado = input("Digite o estado do agricultor: ").strip()

        agricultor = {
            "nome": nome,
            "cnpj": cnpj,
            "cidade": cidade,
            "estado": estado
        }

        agricultores.append(agricultor)
        print("Agricultor cadastrado com sucesso!")

    # Listar Agricultores
    elif opcao == "2":
        print("\n===== Lista de Agricultores =====")
        if not agricultores:
            print("Nenhum agricultor cadastrado ainda.")
        else:
            for i, agricultor in enumerate(agricultores, start=1):
                print(f"{i} - Nome: {agricultor['nome']}, CNPJ: {agricultor['cnpj']}, Cidade: {agricultor['cidade']}, Estado: {agricultor['estado']}")

    # Atualizar Agricultor
    elif opcao == "3":
        if not agricultores:
            print("Nenhum agricultor cadastrado para atualizar.")
        else:
            for i, agricultor in enumerate(agricultores, start=1):
                print(f"{i} - {agricultor['nome']} ({agricultor['cnpj']})")
            try:
                indice = int(input("Digite o número do agricultor que deseja atualizar: ")) - 1
                if 0 <= indice < len(agricultores):
                    nome = input("Digite o novo nome: ").strip()
                    cnpj = input("Digite o novo CNPJ: ").strip()
                    cidade = input("Digite a nova cidade: ").strip()
                    estado = input("Digite o novo estado: ").strip()

                    agricultores[indice] = {
                        "nome": nome,
                        "cnpj": cnpj,
                        "cidade": cidade,
                        "estado": estado
                    }
                    print("Agricultor atualizado com sucesso!")
                else:
                    print("Número inválido.")
            except ValueError:
                print("Por favor, digite um número válido.")

    # Excluir Agricultor
    elif opcao == "4":
        if not agricultores:
            print("Nenhum agricultor cadastrado para excluir.")
        else:
            for i, agricultor in enumerate(agricultores, start=1):
                print(f"{i} - {agricultor['nome']} ({agricultor['cnpj']})")
            try:
                indice = int(input("Digite o número do agricultor que deseja excluir: ")) - 1
                if 0 <= indice < len(agricultores):
                    confirm = input(f"Tem certeza que deseja excluir {agricultores[indice]['nome']}? (s/n): ").strip().lower()
                    if confirm == "s":
                        removido = agricultores.pop(indice)
                        print(f"Agricultor {removido['nome']} removido com sucesso!")
                    else:
                        print("Operação cancelada.")
                else:
                    print("Número inválido.")
            except ValueError:
                print("Por favor, digite um número válido.")

    # Chatbot
    elif opcao == "5":
        bot = ChatBot()        # Cria uma instância do chatbot
        bot.menu_chatbot()     # Abre o menu do chatbot

    # Sair
    elif opcao == "6":
        print("Saindo do sistema... Até logo!")
        break

    else:
        print("Opção inválida, tente novamente.")
