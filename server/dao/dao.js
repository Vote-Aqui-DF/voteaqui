// const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

const mysql = require('mysql');

require('./mysql-connection');

class Dao {
  constructor() {
    this.connection = getConexaoMySql();
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      try {
        this.connection.query(sql, params, function (err, result) {
          if (err) {
            console.log('Error running sql ' + sql);
            console.log(err);
            reject(err);
          } else {
            resolve({ id: result.insertId });
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, result, fields) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result && result[0] ? result[0] : null);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          // console.log('rows => ', rows);
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Dao;
