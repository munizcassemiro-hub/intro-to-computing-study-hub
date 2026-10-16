# Integração dos materiais do professor

Implementação das lacunas registradas na comparação existente, sem repetir a auditoria e sem redesenhar o app. Os 20 uploads são as fontes principais: 12 DOCX e 8 PPTX, 77 slides, 19 conteúdos binários únicos. T12 é cópia exata de T11. O inventário e os textos extraídos estão em `course-materials`; quatro imagens originais estão em `public/course`, com créditos no app. Os arquivos Office originais não foram alterados.

## A. Lacunas corrigidas

| Fontes | Implementação |
| --- | --- |
| T01–T02 | Atividade original completa de tea machine: Decomposition com pelo menos oito tarefas, nove classificações de Abstraction, três sequências de Pattern Recognition, Algorithm Design com decisão de milk e START/STOP, Debugging com três erros, Human Robot e cinco reflexões. |
| T05–T06 | MediMind / MindCheck com os fatos e valores originais, cinco papéis, dez perguntas específicas, decisão do CEO, debrief, formato do workshop e notas do tutor separadas do enunciado. |
| T11–T13 | ALU, CU, RAM random access/volatile, GPU integrada, NIC, contexto TPM/Windows 11, SATA/NVMe e RGB explicitamente opcional. Identificadores anteriores preservados. |
| T14–T16, T18–T19 | Gatos, bolos, ingredientes, patterns among/within problems, model em Abstraction, bicicleta, escovar os dentes, investigação de crime e criação de um app. Distinção CT/programming, algorithm/pseudocode/flow diagram, INPUT/OUTPUT/STORE, Garbage in/garbage out, símbolos originais e exemplo de nome/idade com limite 70. |
| T03, T07–T08, T10 | Bandwidth, Firewall, ISP, TCP/IP; detalhes de Network Types e suas vantagens, desvantagens e exemplos; diagrama original OSI, envio/recebimento, troubleshooting; distinções TCP/UDP, frames/packets e Topology/Type. |
| T17 | Analogia da chave do carro e comparação Symmetric/Asymmetric preservadas; simplificação sobre segurança identificada e explicada, sem ensinar que duas chaves garantem maior segurança universalmente. |
| T04, T09, T20 | Matriz Article 50 por obrigação e papel; Article 53 para GPAI providers; Article 55 para systemic risk. Atores adicionais, adversarial testing, incident reporting, cybersecurity, detalhes de transparência e registro separado de afirmações legais datadas. |

Foram adicionadas 37 lições: total de **209 lições**, **264 questões de Generated Practice**, **nove atividades abertas originais** e **cinco etapas MediMind**. O conteúdo útil anterior, inclusive o ACM Code of Ethics, foi mantido. O código ACM completo é fonte oficial complementar identificada: não constava integralmente nos uploads.

Cada lição tem definição e termos técnicos em English; Bilingual Mode continua padrão com apoio em português brasileiro. English Only omite esse apoio. Citações do professor, explicações complementares, questões originais e Generated Practice têm identificação própria.

## B. Exercícios originais incorporados

1. T01 Part 1 — Decomposition: pelo menos oito tarefas e reflexão sobre subtarefas.
2. T01 Part 2 — Abstraction: os nove itens originais e justificativa.
3. T01 Part 3 — Pattern Recognition: sequências A, B e C, com duas continuações e explicação. A sequência de dias permite mais de uma interpretação; a resolução sugerida declara sua regra em vez de impor um gabarito único.
4. T02 Part 4 — Algorithm Design: enunciado e exemplo parcial originais, pseudocode ou numbered steps, milk decision, START/STOP e desafio de seguir as instruções literalmente. A ferramenta mantém a exigência de oito tarefas da Part 1.
5. T02 Part 5 — Debugging: algoritmo incorreto original, três descrições distintas de erros e reescrita. Não se afirma avaliar semanticamente a resposta livre.
6. T02 Human Robot — regras de sala de aula originais, instruções e reflexão sobre melhorias; execução física/grupal é representada como trabalho escrito individual.
7. T02 Reflection — cinco perguntas originais.
8. T19 — decompor a criação de um app, com exemplo de resposta do slide seguinte após a tentativa.
9. T06 — CEO board decision e três perguntas de debrief, com guidance de T05 após a tentativa.
10. T05/T06 MediMind — cinco papéis com duas perguntas por papel; o aluno também preenche as quatro reflexões úteis do app anterior.

O cenário mantém: startup de 40 pessoas em Dublin, 300.000 usuários em quatro países, oferta de €2m, viés de 12% para maiores de 65 anos, rollout em duas semanas, 8.000 usuários expostos durante 11 dias, descoberta na segunda-feira e avaliação na quarta-feira, conteúdo de self-harm com aparentes menores de 16 e Priya como membro BCS. O texto inglês original não é substituído pela tradução.

Enunciados não contêm guidance do tutor. Respostas só entram no DOM depois de uma tentativa completa. Editar a tentativa remove a resolução até nova submissão. A migração de progresso anterior não libera as novas respostas por engano. Materiais sem gabarito recebem **Suggested answer**, sem atribuir uma resposta gerada ao professor.

## C. Limites de representação

- Os principais conteúdos e exercícios identificados na comparação estão representados; não foi feita uma reprodução visual integral dos 77 slides. Arte decorativa, todas as fotos de componentes, figuras repetidas e referências externas completas não foram transformadas em páginas do app.
- O texto extraído preserva os arquivos como evidência no repositório, mas o app não oferece leitura integral de documentos de tutor, evitando revelar gabaritos no catálogo.
- Human Robot, trabalho em grupo e discussão de workshop não executam robôs físicos, sessões multiusuário ou avaliação docente. As respostas discursivas são autoavaliadas; verificações estruturais não equivalem à correção de seu conteúdo.
- Não foi fornecido um documento dedicado com os códigos ACM/BCS completos, nem past papers. Não foram inventadas questões autênticas de exame.
- Persistência continua local ao navegador/origem. Não há sincronização de conta ou importação de backup. O JSON de exportação existente foi preservado.

## D. Verificação oficial/current ainda necessária

As informações abaixo foram preservadas como afirmações dos materiais, sem alegar confirmação jurídica externa nesta implementação:

- Datas e transições de T04/T20, incluindo Guidelines, Code of Practice, AI Omnibus, datas de dezembro de 2026/fevereiro de 2027 e referências bibliográficas inconsistentes; distinguir lei em vigor, proposta e orientação voluntária.
- Sanções e detalhes/exceções de obrigações do AI Act/GPAI, conforme o ator, sistema/modelo e regime temporal aplicável.
- Enquadramento de MindCheck como medical device/high-risk: hipótese do exercício, dependente dos fatos e condições legais.
- Transferência internacional para seguradora dos EUA, mecanismos DPF/SCCs e sua adequação ao destinatário e aos dados concretos.
- Consentimento infantil, aplicação nacional de GDPR Article 8, obrigações DSA e condições de protected disclosure: não são regras universais independentes de contexto.

O prazo GDPR de 72 horas é explicado a partir da ciência da violação, com a hora exata relevante. Harmful content não é tratado automaticamente como illegal content. Essas notas aparecem como apoio após a tentativa no caso; nenhuma data incerta vira gabarito obrigatório.

## E. Testes

- `npm test`: **21/21 passaram**, sem falhas ou testes ignorados. Inclui os 11 testes anteriores e 10 de fontes, validação, migração e conteúdo do professor.
- `npm run test:e2e`: **20/20 passaram em Chromium**, sem falhas ou testes ignorados. Mantém os 12 fluxos anteriores e acrescenta oito testes de integração dos materiais.
- O conjunto visita todas as 209 lições em ambos os modos, testa as nove atividades originais, cinco papéis MediMind, bloqueio de gabaritos, troca de idioma, drafts/reload, localStorage, revisão, flashcards, quiz, submissão de exam, Mistake Notebook, navegação e larguras de 320/390/768/1440 px.
- Após os últimos ajustes de migração/teclado e formato do workshop, **quatro testes selecionados também passaram contra o preview de produção**, cobrindo todas as atividades originais, MediMind, validação e responsividade.
- Inspeção visual em Chromium de MediMind desktop e tea activity mobile. Verificação Axe WCAG 2 A/AA nas quatro novas telas principais: **zero violações automáticas detectadas**. Isso não substitui uma auditoria completa de acessibilidade.

## F. Build

`npm run build`: **passou** com Vite 7.3.7. O projeto é JavaScript; não contém fonte TypeScript que exija uma etapa separada de typecheck. O app de desenvolvimento e o preview local de produção foram executados. `node_modules`, `dist`, relatórios e artefatos temporários de teste estão no `.gitignore`. Nenhum deploy foi realizado.
