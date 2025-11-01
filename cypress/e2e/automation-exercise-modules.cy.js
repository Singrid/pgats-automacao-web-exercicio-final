import login from '../modules/login';
import menu from '../modules/menu';
import cadastro from '../modules/cadastro';
import userData from '../fixtures/example.json';
import contato from '../modules/contato';
import produto from '../modules/produto';
import home from '../modules/home';
import carrinho from '../modules/carrinho'

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
    cy.viewport('iphone-xr');
    
  });

  it('Test Case 1: Register User', () => {
    menu.navegarParaLogin();
    login.preencherFormularioDePreCadastro();
    cadastro.preencherFormularioDeCadastroCompleto();
    cy.url().should('include', '/account_created');
    cy.contains('b', 'Account Created!');
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.navegarParaLogin();
    login.preecherFormularioParaLogin(userData.user, userData.password);
    cy.get('a[href="/logout"]').should('be.visible');
    cy.contains('b', userData.name);
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.navegarParaLogin();
    login.preecherFormularioParaLogin(userData.user, '12346549879');
    cy.contains('p', 'Your email or password is incorrect!');
  });

  it('Test Case 4: Logout User', () => {
    menu.navegarParaLogin();
    login.preecherFormularioParaLogin(userData.user, userData.password);
    menu.efetuarLogout();
    cy.get('a[href="/logout"]').should('not.exist')
    cy.url().should('contain', '/login');
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.navegarParaLogin();
    login.preencherFormularioDePreCadastroComEmailExistente(userData.name, userData.user);
    cy.contains('p', 'Email Address already exist!');
  });

  it('Test Case 6: Contact Us Form', () => {
    menu.navegarParaContactUs();
    contato.preencherFormularioDeContato(userData.name, userData.email, userData.subject, userData.message);
    contato.enviarFormularioDeContato();

    cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
    
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    const titulo = 'All Products'

    menu.navegarParaProdutos();
    produto.validaTituloParaProdutos(titulo);
    cy.get('a:contains("View Product")').should('have.length.greaterThan', 0);
    produto.clicarNoPrimeiroProduto();
    produto.verificarTelaDetalheDoProduto();
    produto.verificarTodosOsDetalhesDoProduto();

  });

  it('Test Case 9: Search Product', () => {
    const nomeDoProduto = 'Blue Top'
    const titulo = 'Searched Products'

    menu.navegarParaProdutos();
    produto.pesquisarPorUmProdutoExistente(nomeDoProduto)

    produto.validaTituloParaProdutos(titulo);
    cy.get('div.productinfo.text-center p').should('contain',  nomeDoProduto);

  });

  it('Test Case 10: Verify Subscription in home page', () => {
    home.validaPaginaHome();
    home.rolarAteRodaPe();
    cy.get('.single-widget h2').should('be.visible').should('contain', 'Subscription');
    home.inserirEmailEEnviar(userData.user);
    cy.get('.alert-success').should('be.visible').should('have.text', 'You have been successfully subscribed!');

  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const idDoProduto = [1, 3, 5];
    const textMessage = 'Um texto apenas para teste'



    menu.navegarParaLogin();
    login.preencherFormularioDePreCadastro();
    cadastro.preencherFormularioDeCadastroCompleto();
    cy.url().should('include', '/account_created');
    login.clickNoBotaoContinueDepoisDoCadastro();
    home.validaPaginaHome();

    idDoProduto.forEach(idDoProduto => {
      carrinho.adicionarProdutosAoCarrinho(idDoProduto);
      carrinho.continuarComprando();
    });

    menu.navegarParaCarrinho();
    cy.url().should('contain', 'cart');
    cy.get('section#cart_items').should('contain', 'Shopping Cart');

    carrinho.irParaChekout();
    carrinho.realizaComentariosSobreACompra(textMessage);
    carrinho.irParaFazerPedido();
    carrinho.inserirDadosDePagamentoEPagar();

    cy.get('h2.title.text-center').should('have.text', 'Order Placed!');
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');

    carrinho.continueParaHome();

    home.removerContaCriada();
    cy.get('h2.title.text-center').should('have.text', 'Account Deleted!');
    carrinho.continueParaHome();

  });

});