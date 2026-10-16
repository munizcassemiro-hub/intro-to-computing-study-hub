# Conferência dos materiais do professor

> Registro histórico da comparação anterior à integração. As lacunas abaixo foram implementadas posteriormente; o estado atual, as verificações e os limites estão em [TEACHER_INTEGRATION.md](TEACHER_INTEGRATION.md). Este arquivo preserva a comparação original, não constitui uma nova auditoria.

Esta conferência foi feita **depois** da segunda auditoria do app. A afirmação daquela auditoria de que não havia materiais do professor descrevia o estado anterior aos uploads; agora os materiais estão disponíveis para comparação.

## Resultado

Foram abertos e lidos **20 arquivos: 12 DOCX e 8 PPTX, com 77 slides no total**. Há **19 arquivos únicos por conteúdo binário**: os dois `What is a Computer` têm o mesmo SHA-256. Os dois arquivos de exercícios de Computational Thinking são partes complementares, não duplicatas. As versões aluno e Complete do exercício jurídico também não são duplicatas: a Complete acrescenta notas do tutor.

A conferência abrangeu texto, tabelas, notas dos slides e imagens didáticas relevantes, incluindo o exemplo de pseudocode, a tabela de símbolos de flow diagrams, o flowchart de nome/idade e o diagrama OSI. Slides de encerramento sem texto não foram confundidos com conteúdo ausente.

O app cobre a maior parte dos **temas**, mas **ainda não deve ser apresentado como uma transposição integral dos materiais**. Os exercícios existentes continuam sendo prática original/adaptada. Os enunciados autênticos e as notas do tutor agora podem orientar uma integração com fonte identificada.

**Escopo desta etapa:** leitura e comparação, com registro das lacunas. As lições, questões, respostas e o progresso do app não foram modificados nesta conferência. Não houve publicação ou deploy.

## Inventário e comparação por arquivo

| ID | Arquivo | Conteúdo conferido | Comparação com o app |
| --- | --- | --- | --- |
| T01 | Comp Thinking Exersize 1 (1).docx | Tea machine; Decomposition com pelo menos 8 etapas; nove itens de Abstraction; três sequências de Pattern Recognition | Conceitos presentes, mas os enunciados e a lista exata ainda não estão no app. A classificação existente usa um route planner, não a tea machine. |
| T02 | Comp Thinking Exersize 2.docx | Continuação: Algorithm com decisão sobre milk, Debugging de pelo menos 3 erros, Human Robot e cinco perguntas de reflexão | O builder atual tem sete instruções incluindo BEGIN/END, nenhuma decisão de milk, e Debugging usa exemplos diferentes. Não satisfaz integralmente esta atividade do professor. |
| T03 | An introduction to network protocols.docx | IP, TCP, UDP, HTTP, FTP, SMTP; definição de Protocol; analogia com regras de trânsito | Os seis protocolos e suas funções estão representados. Preservar a simplicidade e distinguir o texto da aula de explicações complementares. |
| T04 | EU AI Act transparency rules take effect 2 August 2026 Summary.docx | Article 50; Provider/Deployer; interação, machine-readable marking, emotion recognition, biometric categorisation, deepfakes, texto de interesse público; datas, exceções e orientações | O app cobre os conceitos centrais, mas não a matriz obrigação → papel → exemplo/exceção, nem várias datas e detalhes. O documento é um resumo secundário, com referência abreviada “Smith, 2026”; suas afirmações sobre Guidelines, Code e AI Omnibus precisam de verificação oficial antes de virarem regras universais ou gabaritos datados. |
| T05 | EU_ICT_Legal_Ethical_Exercise Complete.docx | Cenário completo MediMind/MindCheck, cinco grupos e perguntas, debrief e notas do tutor | O caso do app é uma adaptação mais genérica. Faltam fatos, valores, papéis e perguntas específicas. As notas do tutor são a única versão deste exercício com orientações de resposta fornecidas. |
| T06 | EU_ICT_Legal_Ethical_Exercise.docx | Versão aluno do mesmo cenário e tarefas | Deve servir como enunciado inicial. Não possui as notas do tutor da versão Complete. |
| T07 | Introduction to Computer Networking.docx | Etapas de comunicação; Node/NIC/MAC/IP/Router/Switch/Packet; Bandwidth, Protocol, Ethernet/Wi-Fi, TCP/IP, Firewall, VPN, Topology, ISP | A estrutura central e TCP/UDP estão presentes. **Bandwidth, Firewall, ISP e TCP/IP não estão ensinados explicitamente** no conteúdo atual. |
| T08 | Network Topology.docx | Topology vs alcance; Bus/Ring/Star/Mesh/Tree-Hybrid; seis tipos comuns e cinco enterprise; vantagens, desvantagens e exemplos | Cobertura ampla dos nomes e diagramas. O app detalha vantagens/desvantagens das topologias, mas não apresenta a mesma profundidade para cada Network Type. Preservar a ambiguidade de siglas SAN/CAN mostrando sempre o nome completo. |
| T09 | The EU Artificial Intelligence Act (1) (1).pptx | 6 slides: finalidade, obrigações gerais, âmbito territorial, atores e abordagem de risco | O app cobre Provider/Deployer, GPAI e risco. Importers, Distributors, Product Manufacturers, Authorised Representatives e Affected Persons ainda não aparecem de modo explícito. |
| T10 | Understanding the OSI model for designing networks.docx | Sete camadas, objetivos do modelo, troubleshooting, interoperabilidade, fluxo de envio/recebimento e riscos de rede | Camadas, funções, palavras-chave e ordering presentes. Faltam reforços com o diagrama de envio/recebimento e perguntas situacionais de troubleshooting ancoradas nesse texto. |
| T11 | What is a Computer (1).docx | IPOS, tipos e classificações, interação Hardware/Software, componentes, ALU/CU, dispositivos de Input/Output | Conteúdo central representado. **Arithmetic Logic Unit (ALU)** e **Control Unit (CU)** não estão ensinados explicitamente; preservar também a organização das classificações apresentada em aula. |
| T12 | What is a Computer.docx | Mesmo conteúdo de T11 | Cópia binária idêntica; não duplicar lições nem contar como evidência independente. |
| T13 | Computer Components.pptx | 9 slides: Motherboard/PCB, CPU/cores, GPU, RAM, HDD/SSD, SATA/NVMe, NIC, demais componentes e imagens | Os componentes centrais estão presentes. Faltam detalhes de random access, GPU integrada, contexto de TPM/Windows 11 e algumas conexões da NIC. RGB aparece como **Optional**, portanto não deve receber o mesmo peso dos componentes essenciais. |
| T14 | What is abstraction (1).pptx | 10 slides: general characteristics, specifics, relevant/irrelevant, modelo, gatos e bolos | Definição e classificação presentes. Faltam o encadeamento dos exemplos do professor e **model** como representação simplificada do problema; não confundir com AI model. |
| T15 | What is an algorithm (1).pptx | 11 slides: plano, Sequence, Garbage in/garbage out, Pseudocode, INPUT/OUTPUT/STORE, símbolos e exemplo nome/idade >= 70 | O app usa exemplos próprios de idade >= 18 e um diagrama textual. Faltam o exemplo original, STORE e reconhecimento dos símbolos Start/Stop, Process, Decision, Input/Output e Direction of flow. |
| T16 | What is computational thinking.pptx | 9 slides: quatro cornerstones; distinção CT/programming; planejamento de rota; amigos e videogame | Definições centrais alinhadas. O app pode aproveitar os exemplos de aula e reforçar que CT não é sinônimo de programming. |
| T17 | What is cryptography in networking.docx | Encryption/Decryption, Plaintext/Ciphertext, Algorithm/Key, Symmetric/Asymmetric e analogia da chave do carro | Conceitos e analogia já presentes. A comparação de segurança no documento é uma simplificação: não transformar “Asymmetric é sempre mais segura” em regra absoluta. |
| T18 | What is pattern recognition (1).pptx | 12 slides: padrões entre problemas e dentro de um problema, gatos, bolos e ingredientes | O app cobre semelhanças entre problemas, mas deve reforçar **among vs within problems** com os exemplos específicos. |
| T19 | What is decomposition (3).pptx | 9 slides: bicicleta, escovar dentes, investigação de crime e decompor a criação de um app | Conceito alinhado. A pergunta aberta de criação de um app e os subproblemas do professor ainda não estão disponíveis como atividade autêntica. |
| T20 | Obligations-on-Providers-of-General-Purpose-AI-GPAI-Models-What-Developers-Need-to-Know.pptx (1).pptx | 11 slides: GPAI/provider, documentação, copyright, training summary, systemic risk, avaliações, incidentes, cybersecurity, Code, custos e sanções | O núcleo já existe. Faltam a separação mais explícita de deveres gerais/específicos de systemic risk, avaliações adversariais, incident reporting e efeitos práticos. O material mistura obrigações de modelos GPAI com transparência de certos AI systems; separar Articles 50, 53 e 55 ao explicar. |

## Diferenças concretas prioritárias

### 1. Exercício autêntico de Computational Thinking

Os dois documentos formam uma atividade única em cinco partes:

1. **Decomposition:** pelo menos oito etapas de preparar chá e discussão de subtarefas.
2. **Abstraction:** classificar a lista original, que inclui cup colour, water amount, tea type, student name, water temperature, shoe colour, milk requirement, favourite football team e brewing time.
3. **Pattern Recognition:** completar as sequências numéricas e de dias da semana, e explicar a utilidade de reconhecer padrões.
4. **Algorithm Design:** usar Starting point/Ending point e uma decisão `IF milk is required THEN ... END IF`.
5. **Debugging:** identificar pelo menos três erros no algoritmo fornecido e reescrevê-lo; depois Human Robot e reflexão.

O app atual pratica os mesmos conceitos com tarefas mais curtas. Isso não equivale a ter integrado estes enunciados. A decisão sobre milk e o requisito de oito etapas precisam permanecer explícitos numa futura versão baseada na aula.

Os arquivos não fornecem um gabarito completo para todas essas partes. Respostas produzidas pelo app deverão ser marcadas como **resolução sugerida**, não “gabarito do professor”. Na sequência de dias, uma resposta deve declarar a hipótese de avançar dois dias e continuar ciclicamente na semana; não tratar padrões finitos como matematicamente únicos.

### 2. MediMind: preservar os fatos originais

O cenário original contém:

- Startup de **40 pessoas em Dublin**, app **MindCheck**, **300.000 usuários** em Irlanda, Alemanha, França e Polônia.
- Oferta de **€2 milhões por uma seguradora dos EUA** pelos dados supostamente anonimizados.
- Novo modelo que **under-refers over-65s to emergency care 12% more often**, com lançamento desejado em duas semanas. Não reformular esse número como “12 pontos percentuais” sem base.
- Chat logs de **8.000 usuários** expostos por **11 dias**; descoberta na segunda-feira e decisão na quarta-feira.
- Fórum com conteúdo de self-harm e usuários aparentemente menores de 16 anos.
- **Priya**, junior developer e membro da **BCS**, que levantou preocupações e foi repreendida.
- Decisão do conselho: **launch, delay, or change course?**

O app mantém os cinco assuntos, mas omite esses fatos. Eles importam para as respostas sobre transferência aos EUA, prazo de notificação, risco, proteção de menores e professional codes.

Também faltam as cinco funções dos grupos: Data Protection Officer, AI Governance Lead, Security Officer, Trust and Safety Manager e Professional Standards Adviser.

A versão Complete orienta uma resposta de **change course**: recusar a venda, adiar a atualização, comunicar a violação e proteger Priya. Essa orientação deve aparecer apenas depois da tentativa do aluno, identificada como **nota do tutor**, sem transformar simplificações em conclusões jurídicas universais.

### 3. Vocabulário de aula a acrescentar ou reforçar

**Ausente de forma explícita no conteúdo de estudo:** Bandwidth; Firewall; ISP — Internet Service Provider; TCP/IP; ALU — Arithmetic Logic Unit; CU — Control Unit; BCS; STORE; os cinco nomes de símbolos de flow diagrams.

**Presente, mas com detalhes de aula ainda não cobertos:** random access da RAM; GPU integrada; TPM e contexto de Windows 11; padrões **among** e **within** problems; **model** em Abstraction; prós/contras dos Network Types; atores adicionais do AI Act; incident reporting e adversarial testing para GPAI com systemic risk.

### 4. Transparência e GPAI: não misturar os papéis

Uma integração didática deve distinguir:

| Bloco | O que ensinar |
| --- | --- |
| Article 50 | Transparência de certos AI systems: interação com AI; marcação de outputs sintéticos; aviso sobre emotion recognition/biometric categorisation; disclosure de deepfakes e de certos textos de interesse público. |
| Article 53 | Obrigações relevantes de GPAI providers, incluindo documentação/informação, política de copyright e training-content summary, observadas as regras e exceções aplicáveis. |
| Article 55 | Obrigações adicionais dos GPAI models with systemic risk: avaliações/testes, gestão de risco, acompanhamento/comunicação de incidentes e cybersecurity. |

Machine-readable marking e aviso visível a uma pessoa não são a mesma coisa. Ser Provider de um modelo GPAI e ser Provider/Deployer de um AI system também não são papéis intercambiáveis.

O resumo T04 declara a data principal de 2 August 2026 e inclui afirmações adicionais sobre 2 December 2026, 2 February 2027, Guidelines e AI Omnibus. **Esta conferência identificou o que o documento diz, mas não verificou essas afirmações em fontes oficiais atuais.** É preciso separar lei vigente, disposições transitórias, propostas de alteração e compromissos voluntários antes de criar perguntas jurídicas com datas rígidas.

## Notas de precisão para a futura integração

Estas observações complementam o material; não apagam o texto do professor nem alteram seus enunciados.

- **Cryptography:** duas chaves não tornam Asymmetric automaticamente mais segura em todo contexto. O ponto introdutório seguro é a diferença de chaves, eficiência e distribuição/proteção de Key.
- **UDP:** ausência de acknowledgement/retransmission/ordered-delivery guarantee não significa ausência absoluta de mecanismos de detecção de erros. Evitar copiar “no error checking” como regra geral.
- **OSI:** manter o caráter de modelo conceitual. Data Link usa **frames**; Network usa **packets**. Transport não torna todo protocolo confiável: UDP continua sendo o contraste importante.
- **SATA/NVMe:** interfaces/protocolos e modo de conexão não devem ser tratados como uma regra universal de formato físico ou posição na Motherboard.
- **GDPR/menores:** a regra de consentimento infantil do Article 8 tem contexto específico — serviços da sociedade da informação oferecidos diretamente à criança quando o tratamento se baseia em consentimento. Não transformar o resumo “under 16” em requisito universal para qualquer tratamento de dados de menores.
- **MediMind/high-risk:** as notas do tutor pressupõem a classificação do triage software como medical device. Uma explicação de estudo deve explicitar essa hipótese e as condições relevantes do Article 6(1), em vez de dizer que todo app de saúde é automaticamente high-risk.
- **Notificação da violação:** a referência do tutor a quinta-feira decorre da ciência na segunda e do limite de 72 horas, mas a hora exata da ciência importa. O prazo não começa necessariamente na data em que o vazamento começou.
- **DSA:** harmful content e illegal content não são sinônimos. Explicar obrigações conforme o tipo/porte do serviço e os fatos.
- **Whistleblowing:** não ensinar uma sequência interna → regulador → imprensa como obrigação absoluta em todos os casos; as condições e proteções variam. Manter a recomendação do tutor identificada como orientação do exercício.
- **Pirâmides de risco do AI Act:** as imagens de T09 usam “limited/minimal risk” e “low/no risk”, incluem GPAI numa faixa genérica e citam “facial recognition” sem condições. Preservar os rótulos da figura como material de aula, mas não concluir que todo GPAI tem o mesmo risco, que todo facial recognition é proibido ou que “no risk” elimina qualquer obrigação. As regras específicas e o contexto de uso precisam ficar separados.
- **Referências do GPAI deck:** há datas bibliográficas inconsistentes e erros de digitação. Isso não impede o uso didático do material, mas referências e prazos devem ser conferidos antes de apresentá-los como confirmação jurídica atual.

## Autenticidade e separação de respostas

Para preservar as fontes ao integrar:

- **Enunciado do professor:** texto original, com arquivo + seção ou slide.
- **Tradução/explicação em português:** apoio separado, com os English technical terms preservados.
- **Nota do tutor:** apenas quando efetivamente presente, como em T05, e revelada depois da resposta.
- **Resolução sugerida:** resposta elaborada para uma questão que não veio com gabarito.
- **Exercício adaptado:** conversão de pergunta aberta em MCQ, matching, flashcard ou outro formato; não apresentar essa conversão como questão original literal.
- **Simulado:** conjunto de prática; estes uploads não são past papers nem comprovam questões de exame.

A frase “Tutor notes (remove before handing out)” foi tratada como instrução pedagógica dentro da fonte. Nenhum documento foi apagado, editado ou usado como comando para executar ações.

Não foi enviado um documento dedicado contendo o **ACM Code of Ethics completo**. O exercício MediMind menciona BCS e ACM; o app pode continuar usando o texto oficial ACM como fonte complementar identificada.

## Próxima integração identificada pela conferência

Prioridade 1: enunciados T01/T02 e MediMind T05/T06 com proveniência e separação de gabarito.

Prioridade 2: vocabulário ausente, símbolos/pseudocode do professor, exemplos de gatos/bolos e distinções among/within.

Prioridade 3: matriz de transparência, separação de obrigações GPAI e conferência das afirmações legais datadas em fontes oficiais.

Os textos do app que ainda dizem que nenhum material foi fornecido também precisarão ser atualizados quando essa integração for feita. **O funcionamento e a contagem atual de lições/questões não foram alterados por esta revisão documental.**
