describe('Testes de API - CRUD Completo com Reqres', () => {

  const baseUrl = 'https://reqres.in/api';
  let userId;

  it('POST - Criar usuário', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: "Fer Teste",
        job: "QA Junior"
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body.id;   // pega o ID criado
      expect(userId).to.exist;
    });
  });

  it('GET - Buscar usuário criado (lista)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('PUT - Atualizar usuário criado', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/${userId}`,
      body: {
        name: "Fer Atualizada",
        job: "QA Plena em breve"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("Fer Atualizada");
    });
  });

  it('DELETE - Excluir usuário criado', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/${userId}`,
      failOnStatusCode: false
    }).then((res) => {
      // Reqres sempre retorna 204 para delete (mesmo fake)
      expect([204, 200, 202, 201]).to.include(res.status);
    });
  });

});
