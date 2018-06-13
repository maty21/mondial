const { teams, games } = require('./const');
const { Parser } = require('json2csv')
const fs = require('fs');
const templateTable = require('./templateTable')


const csvGenerator = (path) => {
    const data = jsonData(path);
    const fields = ['game', ...generateNamesColumns(data)];
    const rows = generateRowsFromData(data,'csv');
    const parser = new Parser({ fields })
    const csv = parser.parse(rows)
    return csv


}
const gamesAsObject = () => ({ ...games })
const generateNamesColumns = (data) => Object.keys(data).map(k => k)
const generateRowsFromData = (data, type = 'html') =>
    Object.entries(gamesAsObject()).map(([k, v]) => {
        let obj = {};
        obj.game = `${v[0]} -  ${v[1]}`;
        if (type == 'html') {
           Object.values(data).forEach(d => {
            let res=   obj[d.user.name] = d.houses.find(h => h.meta == +k + 1).result;
            if (res == 'tie') {
                obj[d.user.name] = 'x';
            }
            })
        } else if (type == 'csv') {
            Object.values(data).forEach(d => {
                let res = obj[d.user.name] = d.houses.find(h => h.meta == +k + 1).result;
                if (res == 'tie') {
                    obj[d.user.name] = 'x';
                }
                else if (res == v[0]) {
                    obj[d.user.name] = 1
                }
                else if (res == v[1]) {
                    obj[d.user.name] = 2
                }
            })
        }

        return obj;
    })

const htmlGenerator = (path) => {
    const data = jsonData(path);
    const columns = ['game', ...generateNamesColumns(data)];
    const rows = generateRowsFromData(data);
    return templateTable({ columns, rows });
}
const jsonData = (path) => JSON.parse(fs.readFileSync(path))

module.exports = { csvGenerator, htmlGenerator }