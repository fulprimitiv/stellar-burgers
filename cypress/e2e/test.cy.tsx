describe('Функциональность конструктора бургеров', () => {
  beforeEach(() => {
    // Загрузка фикстур и настройка мока запросов
    cy.fixture('ingredients.json');
    cy.fixture('orders.json');
    cy.fixture('user.json');
    cy.fixture('newOrder.json');

    // Перехватываем запросы к API
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('GET', 'api/orders/all', { fixture: 'orders.json' }).as(
      'orders'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'newOrder.json' }).as(
      'newOrder'
    );

    // Устанавливаем тестовые токены авторизации
    cy.setCookie('accessToken', 'mockToken');
    localStorage.setItem('refreshToken', 'mockToken');

    // Открываем приложение
    cy.visit('/');
  });

  it('Перехват запросов API', () => {
    // Убедимся, что запросы к API обрабатываются корректно
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
    cy.wait('@user').its('response.statusCode').should('eq', 200);
  });

  it('Авторизация пользователя и проверка профиля', () => {
    // Мокируем запрос на получение данных пользователя
    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    // Переходим на страницу профиля
    cy.visit('/profile');
    cy.get(`[data-cy='profile-name']`).should('have.value', 'User');
  });

  it('Нет булки при старте', () => {
    cy.get(`[data-cy='constructor-module']`).should(
      'not.contain.text',
      'просто какая-то булка'
    );
  });

  it('Добавление булки в конструктор', () => {
    // Добавляем булку в конструктор
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // Проверяем, что булка появилась в конструкторе
    cy.get(`[data-cy='constructor-module']`).should(
      'contain.text',
      'Флюоресцентная булка R2-D3'
    );
  });

  it('Добавление начинки в конструктор', () => {
    // Добавляем первый ингредиент начинки
    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    cy.get(`[data-cy='constructor-module']`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Добавление ингредиентов в заказ и проверка, что конструктор пуст', () => {
    // Добавляем ингредиенты
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    cy.get(`[data-cy='ingredients-module']`)
      .last()
      .children()
      .last()
      .find('button')
      .click();

    // Подтверждаем заказ
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .last()
      .find('button')
      .click();
    cy.wait('@newOrder');

    // Проверяем, что открылось окно с заказом
    cy.get(`[data-cy='modal']`).should('be.visible');

    // Закрываем окно заказа
    cy.get(`[data-cy='modal']`).find('button').click();

    // Проверяем, что конструктор пуст
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Открываем модальное окно
    cy.contains('Краторная булка').click();
    cy.get(`[data-cy='modal']`).should('be.visible');

    // Закрываем окно кнопкой "крестик"
    cy.get(`[data-cy='modal']`).find('button').click();
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Закрытие модального окна клавишей Esc', () => {
    // Открываем модальное окно
    cy.contains('Краторная булка').click();

    // Закрываем клавишей Esc
    cy.get('body').type('{esc}');
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Закрытие модального окна через клик на оверлей', () => {
    // Открываем модальное окно
    cy.contains('Краторная булка').click();

    // Закрываем кликом на оверлей
    cy.get(`[data-cy='modalOverlay']`).click('top', { force: true });
    cy.get(`[data-cy='modal']`).should('not.exist');
  });
});
