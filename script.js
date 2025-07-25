// script.js

// Função para mostrar/ocultar as seções principais (Materiais, Tópicos, FAQ)
function mostrarSecaoPrincipal(secaoId) {
  // Oculta todas as seções de conteúdo principais
  document.querySelectorAll('.main-content .content-section').forEach(section => {
    section.style.display = 'none';
  });

  // Remove a classe 'ativa' de todos os botões de navegação principal
  document.querySelectorAll('.main-nav .nav-button').forEach(button => {
    button.classList.remove('ativa');
  });

  // Mostra a seção principal correspondente ao botão clicado
  const targetSection = document.getElementById(secaoId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  // Adiciona a classe 'ativa' ao botão de navegação principal clicado
  document.querySelector(`.main-nav .nav-button[data-target-section="${secaoId}"]`).classList.add('ativa');

  // Não há mais necessidade de chamar mostrarPaginaFaq aqui, pois não há paginação secundária
}

// --- Lógica do Questionário ---
function handleQuestionAnswer(event) {
  const clickedRadio = event.target;
  // Apenas reage a cliques em input[type="radio"]
  if (clickedRadio.type !== 'radio') {
    return;;
  }

  const questionBlock = clickedRadio.closest('.question-block');
  if (!questionBlock) {
    return;
  }

  const questionTitle = questionBlock.querySelector('h4');
  const correctAnswerValue = questionTitle.dataset.correctAnswer;
  const allOptions = questionBlock.querySelectorAll('input[type="radio"]');

  // Desabilita todos os rádios daquela questão para evitar novas seleções
  allOptions.forEach(radio => {
    radio.disabled = true;
  });

  // Remove classes de feedback de respostas anteriores (se houver)
  questionBlock.querySelectorAll('li').forEach(li => {
    li.classList.remove('correct', 'incorrect');
  });

  // Encontra a opção selecionada pelo usuário
  const selectedOptionLi = clickedRadio.closest('li');

  // Verifica se a resposta está correta e aplica a classe apropriada
  if (clickedRadio.value === correctAnswerValue) {
    selectedOptionLi.classList.add('correct');
  } else {
    selectedOptionLi.classList.add('incorrect');
    // Opcional: Indicar a resposta correta mesmo se o usuário errou
    // Percorre todas as opções para encontrar a correta e a marca como tal
    questionBlock.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.value === correctAnswerValue) {
            radio.closest('li').classList.add('correct');
        }
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Define a seção principal inicial ao carregar a página (ex: Materiais da Aula)
  mostrarSecaoPrincipal('materiais-aula');

  // Adiciona ouvintes de evento de clique aos botões de navegação principal
  document.querySelectorAll('.main-nav .nav-button').forEach(button => {
    button.addEventListener('click', () => {
      mostrarSecaoPrincipal(button.dataset.targetSection);
    });
  });

  // Removido o listener para os botões de paginação de FAQ, pois não existem mais
  // document.querySelectorAll('.pagination-nav .page-button').forEach(button => {
  //   button.addEventListener('click', () => {
  //     mostrarPaginaFaq(button.dataset.targetPage);
  //   });
  // });

  // Adiciona o ouvinte de evento para as respostas do questionário
  document.addEventListener('change', handleQuestionAnswer);
});