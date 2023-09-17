describe('Blog', function () {
  beforeEach(function () {
    cy.visit('');
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
  });

  describe('Login', function () {
    it('Login form is shown', function () {
      cy.contains('username');
      cy.contains('password');
      cy.contains('log in');
    });

    it('succeds with correct credentials', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('error');
      cy.get('#password').type('error');
      cy.get('#login-button').click();

      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('new title');
      cy.get('#author').type('new author');
      cy.get('#url').type('new url');

      cy.get('#create-button').click();

      cy.contains('new title');
    });

    describe('And several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'John Doe', url: 'http://example.com./1' });
        cy.createBlog({ title: 'second blog', author: 'John Doe', url: 'http://example.com./2' });
        cy.createBlog({ title: 'third blog', author: 'John Doe', url: 'http://example.com./3' });
      });

      it('A user who created a blog can delete it', function () {
        cy.contains('first blog').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').get('#like-blog').click();

        cy.contains('likes 1');
      });

      it('A user can delete a blog', function () {
        cy.contains('first blog').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').get('#remove-blog').click();

        cy.get('html').should('not.contain', 'first blog');
      });

      it('Blogs are ordered by the number of likes in desc', function () {
        cy.contains('first blog').parent().parent().as('blog1');
        cy.contains('second blog').parent().parent().as('blog2');
        cy.contains('third blog').parent().parent().as('blog3');

        cy.get('@blog1').contains('view').click();
        cy.get('@blog2').contains('view').click();
        cy.get('@blog3').contains('view').click();
        cy.get('@blog1').contains('like').as('like1');
        cy.get('@blog2').contains('like').as('like2');
        cy.get('@blog3').contains('like').as('like3');

        cy.get('@like1').click();
        cy.wait(500);

        cy.get('@like3').click();
        cy.wait(500);
        cy.get('@like3').click();
        cy.wait(500);

        cy.get('@like2').click();
        cy.wait(500);
        cy.get('@like2').click();
        cy.wait(500);
        cy.get('@like2').click();
        cy.wait(500);

        cy.get('.blog').eq(0).should('contain', 'second blog');
        cy.get('.blog').eq(1).should('contain', 'third blog');
        cy.get('.blog').eq(2).should('contain', 'first blog');
      });
    });
  });
});