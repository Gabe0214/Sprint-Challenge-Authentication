const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')
const userDB = require('../auth/auth-modal')


describe('user', () => {
    
    describe('test environmet check', function(){
        it('should use test environmemt', function (){
            expect(process.env.DB_ENV).toBe('testing')
        })

        describe('users to register', () => {
            beforeEach(() => db('users').truncate())
            it('post /', async () => {
                const res = await request(server)
                .post('/api/auth/register')
                .send({username: 'Steven', password: 'icecream'})
                expect(res.status).toBe(200)
            })
        })
        describe('users to register', () => {
            beforeEach(() => db('users').truncate())
            it('post /', async () => {
                const res = await request(server)
                .post('/api/auth/register')
                .send({username: 'Steven', password: 'icecream'})
                expect(res.body.username).toBe('Steven')
            })
        })

        describe('res type should be json', () => {
            it('post /', async () => {
                const res = await request(server)
                .post('/api/auth/login')
                .send({  
                    username:"Gabe", 
                    password: "example"
                })
                console.log(res.type)
                expect(res.type).toMatch(/json/i)
            })
            
        })
        describe('should recieve 500', () => {
            it('post /', async () => {
                const res = await request(server)
                .post('/api/auth/login')
                .send({  
                    username:"Gabe", 
                
                })
                console.log(res.type)
                expect(res.status).toBe(500)
            })
            
        })
    })
})