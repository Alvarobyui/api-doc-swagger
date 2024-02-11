const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

/**
 * @swagger
 * components:
 *  schemas:
 *    contact:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: contact name
 *        lastName:
 *          type: string
 *          description: contact lastname
 *        email:
 *          type: string
 *          description: contact email
 *        favoriteColor:
 *          type: string
 *          description: contact favorite color
 *        birthday:
 *          type: string
 *          description: contact birthday
 *      required:
 *        - firstName
 *        - email
 *      example: 
 *        firstName: Juan
 *        lastName: Perez
 *        email: juan@gmail.com
 *        favoriteColor: blue
 *        birthday: 01-02-2024
 */

//get all contacts
/**
 * @swagger
 * /api/contacts:
 *  get:
 *    summary: returns all contacts
 *    tags: [contact]
 *    responses:
 *      200:
 *        description: all contacts
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/contact'     
 */
router.get('/', contactsController.getAll);


//get contact by id
/**
 * @swagger
 * /api/contacts/{id}:
 *  get:
 *    summary: returns contact by id
 *    tags: [contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    description: the contact id
 *    responses:
 *      200:
 *        description: returns a contact by id
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/contact'     
 *      400:
 *        description: contact not found
 */
router.get('/:id', contactsController.getSingle);

//Create a new contact
/**
 * @swagger
 * /api/contacts:
 *  post:
 *    summary: creates a new contact
 *    tags: [contact]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/contact'
 *    responses:
 *      200:
 *        description: new contact created!
 */
router.post('/', contactsController.createContact);


//update a contact by id
/**
 * @swagger
 * /api/contacts/{id}:
 *  put:
 *    summary: Updates a contact
 *    tags: [contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the contact updated
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/contact'
 *    responses:
 *      200:
 *        description: contact updated correctly
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/contact'     
 *      404:
 *        description: Contact not found
 */
router.put('/:id', contactsController.updateContact);


//delete a contact
/**
 * @swagger
 * /api/contacts/{id}:
 *  delete:
 *    summary: Delete a contact
 *    tags: [contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    description: the contact id
 *    responses:
 *      200:
 *        description: Contact deleted     
 *      404:
 *        description: Contact not found
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
