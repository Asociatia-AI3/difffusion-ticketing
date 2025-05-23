import * as bcrypt from 'bcrypt';

async function generate() {
    const hash = await bcrypt.hash('parola123', 10);
    console.log('Hash:', hash); 
}

generate();