$(function () {
  const questionElement = $('#question');
  const optionsElement = $('#options');
  const scoreElement = $('#score');
  const nextButton = $('#nextButton');

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;

  const darkModeToggle = $('#darkModeToggle');
  const body = $('body');
  const container = $('.container');

  darkModeToggle.change(function () {
    if (this.checked) {
      body.addClass('dark-mode');
      container.addClass('dark-mode');
      $('.dark-mode-label').text('Light Mode');
      $('.dark-mode-label').css('color', 'white');
    } else {
      body.removeClass('dark-mode');
      container.removeClass('dark-mode');
      $('.dark-mode-label').text('Dark Mode');
      $('.dark-mode-label').css('color', 'black');
    }
  });

  const questions = [
    {
      question: 'What is HTML an acronym for?',
      options: [
        'Hypertext Markup Language',
        'Hyperlink and Text Markup Language',
        'High Text Machine Language',
        'Hyper Transfer Markup Language',
      ],
      answer: 'Hypertext Markup Language',
    },
    {
      question:
        'Which programming language is often used for front-end web development?',
      options: ['Java', 'Python', 'JavaScript', 'C++'],
      answer: 'JavaScript',
    },
    {
      question: 'What does CSS stand for in web development?',
      options: [
        'Cascading Style Sheet',
        'Creative Style Sheet',
        'Computer Style Sheet',
        'Colorful Style Sheet',
      ],
      answer: 'Cascading Style Sheet',
    },
    {
      question:
        'What is a version control system often used by developers for tracking changes in code?',
      options: ['Git', 'SVN', 'Mercurial', 'CVS'],
      answer: 'Git',
    },
  ];

  function showQuestion() {
    answered = false;
    const question = questions[currentQuestionIndex];
    questionElement.text(question.question);
    optionsElement.empty();

    $.each(question.options, function (index, option) {
      const button = $('<button></button>')
        .text(option)
        .click(function () {
          if (!answered) {
            checkAnswer(option, button);
          }
        });
      optionsElement.append(button);
    });
  }

  function checkAnswer(selectedOption, button) {
    answered = true;
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
      score++;
      button.css('background-color', 'green');
    } else {
      button.css('background-color', 'red');
    }

    scoreElement.text(score);
    nextButton.removeClass('hidden');
  }

  nextButton.click(function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      nextButton.addClass('hidden');
    } else {
      questionElement.text('Game Over!');
      optionsElement.empty();
      nextButton.addClass('hidden');
    }
  });

  showQuestion();
});
