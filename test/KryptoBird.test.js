const {assert} = require('chai');

const KryptoBird = artifacts.require('KryptoBird');

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Krypto Bird', (accounts)=>{
    let contract;

    beforeEach(async()=>{
        contract = await KryptoBird.deployed();
    })

    describe('Deployment', async()=>{

        it('Deploys successfully', async()=>{
            
            const address = contract.address;

            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })

        it('has a  name', async()=>{
            const name = await contract.name();

            assert.equal(name, 'Kryptobirdz');
        })

        it('has a symbol', async()=>{
            const symbol = await contract.symbol();

            assert.equal(symbol, 'KBIRDZ');
        })
    })

    describe('minting', async()=>{

        it('mints a new token', async()=>{
            const result = await contract.mint('https...1');

            const totalSupply = await contract.totalSupply();
            
            assert.equal(totalSupply,1);

            const event = result.logs[0].args;
            assert.equal(event._from, 0x0000000000000000000000000000000000000000);
            assert.equal(event._to, accounts[0])

            await contract.mint('https...1').should.be.rejected;
        })
    })

    describe('indexing' , async()=>{
        
        it('stores kryptobirdz correctly', async()=>{
            // await contract.mint('https...1');
            await contract.mint('https...2');
            await contract.mint('https...3');
            await contract.mint('https...4');

            const totalSupply = await contract.totalSupply();

            let result=[];
            let kryptoBird;

            for(let i=0;i<totalSupply;i++){
                kryptoBird = await contract.kryptoBirdz(i);
                result.push(kryptoBird);
            }
            let expected = ['https...1','https...2','https...3','https...4'];
            assert(result.join(','),expected.join(','));
        })
    })
})
