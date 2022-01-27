describe('popup with ingredient details functionality', function () {
  before(function () {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredientsList.json' });
  });

  it('should open burgerVendor component by default', function () {
    cy.contains('Соберите бургер');
    cy.contains('Краторная булка N-200i');
  });

  it('should open modal card with ingridient, then closes it', () => {
    // клик по карточке ингредиента
    cy.get('[class^=ingridient-card_ingrCard]').contains('Краторная булка N-200i').click();

    // проверка содержимого попапа
    cy.get('[class^=modal_modal]').contains('Детали ингредиента').should('exist');
    cy.get('[class^=modal_modal]').contains('Краторная булка N-200i').should('exist');

    // используем специальные id для более удобного нахождения элементов в тестировании - как рекомендовали на вебинаре
    cy.get('[test-id=ingrDetails_calories]').contains('420').should('exist');
    cy.get('[test-id=ingrDetails_proteins]').contains('80').should('exist');
    cy.get('[test-id=ingrDetails_fats]').contains('24').should('exist');
    cy.get('[test-id=ingrDetails_carbo]').contains('53').should('exist');

    // попап закрывается по нажатию Esc
    cy.get('body').type('{esc}'); // особенность cypress: чтобы имитровать глобальные шорткаты, нужно поцелить либо инпуты etc, либо body
    cy.get('[class^=modal_modal]').should('not.exist');
  });
});

describe('functionality of burger constructor and DnD', function () {
  before(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredientsList.json' });
    cy.visit('http://localhost:3000');
  });

  beforeEach(function () {
    cy.intercept('POST', 'api/auth/login', { fixture: 'loginResponse.json' }).as('login');
    cy.intercept('POST', 'api/orders', { fixture: 'orderSuccessResp.json' }).as('order');
  });

  it('should drag ingredients in burger constructor and put an order', () => {
    // перетаскивание ингредиентов
    cy.get('[class^=ingridient-card_ingrCard]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[class^=burger-constructor_container]').trigger('drop');

    cy.get('[class^=ingridient-card_ingrCard]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[class^=burger-constructor_container]').trigger('drop');

    cy.get('[class^=ingridient-card_ingrCard]').contains('Говяжий метеорит (отбивная)').trigger('dragstart');
    cy.get('[class^=burger-constructor_container]').trigger('drop');

    // проверяем, чтобы в конструкторе появились перетащенные ингредиенты
    cy.get('[class^=burger-constructor_topIngridinet]').contains('Краторная булка N-200i').should('exist');
    cy.get('[class^=burger-constructor_bottomIngridinet]').contains('Краторная булка N-200i').should('exist');
    cy.get('[class^=burger-constructor_container]').contains('Соус Spicy-X').should('exist'); cy.get('[class^=burger-constructor_container]').contains('Говяжий метеорит (отбивная)').should('exist');
    cy.get('[class^=burger-constructor_totalBar]').contains('5600').should('exist'); 

    // жмём кнопку оформления заказа: редиректит на форму авторизации
    cy.get('[class^=burger-constructor_container]').contains('Оформить заказ').click();
  });

  it('should authorize user in app, then should redirect back to burger constructor', () => {
    // вводим логин-пароль и имитируем успешную авторизацию и получение токенов от сервера
    cy.get('form input[type=email]').type('oladuwki@yandex.ru');
    cy.get('form input[type=password]').type('123123');
    cy.get('form button').click();

    // проверяем, какое тело у POST-запроса
    cy.wait('@login').its('request.body').should('deep.equal', {
      email: 'oladuwki@yandex.ru',
      password: '123123',
    });

    // после авторизации нас редиректнуло обратно на главную. Проверяем, чтобы в конструкторе по-прежнему находились выбранные ингредиенты
    cy.get('[class^=burger-constructor_topIngridinet]').contains('Краторная булка N-200i').should('exist');
    cy.get('[class^=burger-constructor_bottomIngridinet]').contains('Краторная булка N-200i').should('exist');
    cy.get('[class^=burger-constructor_container]').contains('Соус Spicy-X').should('exist'); cy.get('[class^=burger-constructor_container]').contains('Говяжий метеорит (отбивная)').should('exist');
    cy.get('[class^=burger-constructor_totalBar]').contains('5600').should('exist'); 
  });

  it('should put an order, then should show popup with order data and close it', () => {
    // после успешной авторизации нас редиректнуло на BurgerVendor и снова жмем кнопку заказа
    cy.get('[class^=burger-constructor_container]').contains('Оформить заказ').click();

    // Проверка тела запроса
    cy.wait('@order').its('request.body').should('deep.equal', {
      ingredients: [
        "01",
        "05",
        "03",
      ]
    });

    // проверка содержимого попапа
    cy.get('[class^=modal_modal]').contains('Ваш заказ начали готовить').should('exist');
    cy.get('[class^=modal_modal]').contains('100500').should('exist');

    // попап закрывается по клику на крестик
    cy.get('[class^=modal_closeButton]').click();
    cy.get('[class^=modal_modal]').should('not.exist');
  });
});