require('dotenv').config();

const mariadb = require('mariadb');

const pool = mariadb.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 
});

async function asyncFunction() {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");

        console.log(rows);
        for(let user of rows) {
            console.log(user.first_name);
        }
        // rows: [ {val: 1}, meta: ... ]

        // Insérer un user 
        // const res = await conn.query("INSERT INTO users (first_name, last_name, email) VALUES ('Elon', 'Musk', 'elon@tesla.com')");
        // console.log(res);

        // Mettre à jour John Doe 
        const res = await conn.query("UPDATE users SET email = 'j.doe@oclock.io' WHERE first_name = 'John'");

        console.log(res);
        // Supprimer Jane Doe

        const res2 = await conn.query("DELETE FROM users WHERE first_name = 'Jane'");
        console.log(res2);


        // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } finally {
        if (conn) conn.release(); //release to pool
    }
}

asyncFunction();