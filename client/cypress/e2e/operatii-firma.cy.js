/* eslint-disable no-undef */
/// <reference types="cypress" />

const { version } = require("chai")

describe('Inregistrare firma', () => {
  beforeEach(() => {


  })

  const firma = {

    nume: "test",
    cf: 'RO123',
    domeniuActivitate: 'Medicina',
    email: 'test@gmail.com',
    parola: '123'

  }

  // it('Operatii firma', () => {
  //   cy.visit('http://localhost:3000/register')

  //   cy.get('#nume').type(`${firma.nume}`)
  //   cy.get('#cf').type(`${firma.cf}`)
  //   cy.get('#email').type(`${firma.email}`)
  //   cy.get('select').select(`${firma.domeniuActivitate}`)
  //   cy.get('#password').type(`${firma.parola}`)
  //   cy.get('#confirmPassword').type(`${firma.parola}`)

  //   cy.get('#submit').click();

  //   cy.url({ timeout: 20000 }).should('eq', 'http://localhost:3000/login')

  // })

  it('verificare login firma', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('#email').clear();
    cy.get('#email').type(`${firma.email}`)
    cy.get('#password').clear();
    cy.get('#password').type(`${firma.parola}`)
    cy.get('#login').click();

    cy.url({ timeout: 20000 }).should('eq', 'http://localhost:3000/users')


  })

  const personal = {

    nume: "nume1",
    prenume: "prenume1",
    tel: "tel1",
    email: 'numeprenume@gmail.com',
    adresa: 'adresa',
    oras: 'orasul',
    specializare: 'Cardiolog'

  }

  it('adaugare personal', () => {
    cy.visit('http://localhost:3000/users/adduser')

    cy.get('#nume').type(`${personal.nume}`)
    cy.get('#prenume').type(`${personal.prenume}`)
    cy.get('#tel').type(`${personal.tel}`)
    cy.get('#email').type(`${personal.email}`)
    cy.get('#adresa').type(`${personal.adresa}`)
    cy.get('#orasul').type(`${personal.oras}`)
    cy.get('select').select(`${personal.specializare}`)

    cy.get('#salvare').click();

    cy.url({ timeout: 20000 }).should('eq', 'http://localhost:3000/users')

  })

})
