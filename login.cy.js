it('Авторизация с корректными логином и паролем', () => {
  cy.visit('https://login.qa.studio');
  cy.get('#mail').should('be.visible').type('german@dolnikov.ru'); // добавляем .should('be.visible')
  cy.get('#pass').should('be.visible').type('qa_one_love1');
  cy.get('#loginButton').click();
  cy.contains('Авторизация прошла успешно').should('be.visible');
  cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // проверка кнопки «крестик»
});

describe('Тест восстановления пароля', () => {
  it('Запрос восстановления пароля', () => {
    cy.visit('https://login.qa.studio');
    cy.get('#forgotEmailButton').click(); // клик по «Забыли пароль?»
    cy.get('#mailForgot').type('test@example.com'); // ввод любого email
    // проверка текста подтверждения и кнопки «крестик»
    cy.get('#restoreEmailButton');
    cy.get('#exitRestoreButton > .exitIcon').should('be.visible');
  });
});

describe('Негативный кейс: неправильный пароль', () => {
  it('Авторизация с неверным паролем', () => {
    cy.visit('https://login.qa.studio');
    cy.get('#mail').type('german@dolnikov.ru');
    cy.get('#pass').type('wrong_password'); // неверный пароль
    cy.get('#loginButton').click();
    cy.get('#messageHeader'); // текст ошибки
    cy.get('#exitMessageButton').should('be.visible');
  });
});

describe('Негативный кейс: неправильный логин', () => {
  it('Авторизация с неверным логином', () => {
    cy.visit('https://login.qa.studio');
    cy.get('#mail').type('wrong@login.ru');
    cy.get('#pass').type('qa_one_love1');
    cy.get('#loginButton').click();
    cy.get('#messageHeader'); // текст ошибки
    cy.get('#exitMessageButton').should('be.visible');
  });
});

describe('Валидация логина без @', () => {
  it('Ошибка валидации при отсутствии @ в логине', () => {
    cy.visit('https://login.qa.studio');
    cy.get('#mail').type('german.dolnikov.ru'); // без @
    cy.get('#pass').type('qa_one_love1');
    cy.get('#loginButton').click();
    cy.get('#messageHeader'); // текст ошибки
  });
});

describe('Приведение логина к строчным буквам', () => {
  it('Успешная авторизация с логином в смешанном регистре', () => {
    cy.visit('https://login.qa.studio');
    cy.get('#mail').type('GerMan@Dolnikov.ru'); // смешанный регистр
    cy.get('#pass').type('qa_one_love1');
    cy.get('#loginButton').click();
    cy.get('#Авторизация прошла успешно');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });
});


describe('Проверка покупки нового аватара', () => {
  it('e2e тест на покупку нового аватара для тренера', () => {
    // Шаг 1. Переход на сайт
    cy.visit('https://pokemonbattle.ru/');

    // Шаг 2. Авторизация
    cy.get('input[id="k_email"]').type('USER_LOGIN');
    cy.get('input[id="k_password"]').type('USER_PASSWORD');
    cy.get('button[type="submit"]').click();
    cy.wait(2000); // Ожидание загрузки страницы

    // Шаг 3. Переход к смене аватара
    cy.get('.header_card_trainer').click();
    cy.wait(2000);
    cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click();

    // Шаг 4. Выбор случайного доступного аватара (с классом "available")
    cy.get('.available > button')
      .then($buttons => {
        const buttonsArray = Array.from($buttons);
        const randomIndex = Math.floor(Math.random() * buttonsArray.length);
        const randomButton = buttonsArray[randomIndex];
        cy.wrap(randomButton).click();
      });

    // Шаг 5. Ввод данных карты
    cy.get('.card_number').type('4620869113632996');
    cy.get('.card_csv').type('125');
    cy.get('.card_date').type('1226');
    cy.get('.card_name').type('NAME');

    // Шаг 6. Нажатие кнопки «Оплатить»
    cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

    // Шаг 7. Ввод кода подтверждения СМС
    cy.get('.threeds_number').type('56456');

    // Шаг 8. Повторное нажатие кнопки «Оплатить»
    cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

    // Шаг 9. Проверка успешной покупки
    cy.contains('Покупка прошла успешно').should('be.visible');
  });
});