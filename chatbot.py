#chatbot.py

class ChatBot:
    def calcular_insumos(self):
        try:
            nome_insumo = input("Digite o nome do insumo: ")
            taxa = float(input(f"Digite a quantidade de {nome_insumo} por hectare (kg/ha): "))
            area = float(input("Digite a área da propriedade (ha): "))

            total = taxa * area
            print(f"\n📦 Você precisará de {total:.2f} kg de {nome_insumo} para {area} ha.")
        except ValueError:
            print("⚠️ Entrada inválida! Digite apenas números para quantidade e área.")

    def calcular_agua(self):
        try:
            agua_total = float(input("Digite a quantidade de água usada (litros/ha): "))
            reducao = float(input("Digite a redução de água proporcionada pela técnica (%): "))
            area = float(input("Digite a área da propriedade (ha): "))

            agua_ajustada = agua_total * (1 - reducao / 100)
            agua_total_fazenda = agua_ajustada * area

            print(f"\n💧 Água utilizada após técnica sustentável: {agua_ajustada:.2f} L/ha")
            print(f"🌱 Total de água utilizada na fazenda: {agua_total_fazenda:.2f} L")
        except ValueError:
            print("⚠️ Entrada inválida! Digite apenas números.")

    def menu_chatbot(self):
        while True:
            print("\n--- ChatBot Sustentável ---")
            print("1. Calcular Insumos")
            print("2. Uso de Água por Área")
            print("3. Como posso economizar água na irrigação?")
            print("4. Como aumentar a produtividade sustentável?")
            print("5. Técnicas de adubação orgânica")
            print("0. Voltar ao menu principal")

            opcao = input("Escolha uma opção: ")

            if opcao == "1":
                self.calcular_insumos()
            elif opcao == "2":
                self.calcular_agua()
            elif opcao == "3":
                print("\n💧 Para economizar água na irrigação, você pode considerar:")
                print("- Irrigação por gotejamento;")
                print("- Irrigar no início da manhã ou fim da tarde;")
                print("- Reaproveitar água da chuva;")
                print("- Evitar excesso de irrigação no solo.")
            elif opcao == "4":
                print("\n🌱 Para aumentar a produtividade de forma sustentável, considere:")
                print("- Rotação de culturas;")
                print("- Plantio direto para conservar o solo;")
                print("- Uso de variedades resistentes a pragas;")
                print("- Monitoramento de nutrientes do solo.")
            elif opcao == "5":
                print("\n🌿 Técnicas de adubação orgânica incluem:")
                print("- Compostagem de resíduos vegetais;")
                print("- Adubos verdes (como feijão-guandu e crotalária);")
                print("- Esterco animal tratado;")
                print("- Aplicação equilibrada para evitar excesso de nutrientes.")
            elif opcao == "0":
                break
            else:
                print("⚠️ Opção inválida. Tente novamente.")
