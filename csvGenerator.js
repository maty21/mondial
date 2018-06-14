const { teams, games } = require('./const');
const { Parser } = require('json2csv')
const fs = require('fs');
const templateTable = require('./templateTable')
const templateOldTable = require('./templateTableOld')
const templateTableMobile = require('./templateTableMobile')
const csvGenerator = (path) => {
    const data = jsonData(path);
    const fields = ['game', ...generateNamesColumns(data)];
    const rows = generateRowsFromData(data, 'csv');
    const parser = new Parser({ fields })
    const csv = parser.parse(rows)
    return csv


}
const getCorrectResult = (data) => {
    return data['Xresult'].houses.map((m, i) => m.result ? m.result : "nan")
}

const correctResult = (data) => ['תשובה', ...data['Xresult'].houses.map(m => m.result ? m.result : "nan")];

const gamesAsObject = () => ({ ...games })
const generateNamesColumns = (data) => Object.keys(data).map(k => k)



const generateRowsFromData = (data, type = 'html') =>
    Object.entries(gamesAsObject()).map(([k, v]) => {
        let obj = {};
        obj.game = `${v[0]} -  ${v[1]}`;
        if (type == 'html') {
            Object.values(data).forEach(d => {
                let res = obj[d.user.name] = d.houses.find(h => h.meta == +k + 1).result;
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
const calcRes = (houses, correct) => {
    let score = 0;
    houses.forEach((h, i) => {
        if (correct[i] == "nan" || correct[i] != h.result) {
            score = score;
        }
        else {
            score = score + 1;
        }
    })
    return score

}
const generateTransRow = (data, correct) => Object.values(data).map(d => {

    return [d.user.name, ...d.houses.map(m => m.result ? m.result : "nan"), calcRes(d.houses, correct)]
})

const crowedResult = (data) => {
    

    return Object.entries(gamesAsObject()).map(([k, v]) => {
        const tempCounter = {
            home: 0,
            x: 0,
            away: 0
        }
        Object.values(data).forEach(d => {
            let res  = d.houses.find(h => h.meta == +k + 1).result;
            if (res == 'tie') {
                tempCounter['x'] =tempCounter['x']+1 ;
            }
            else if(res==v[0]){
                tempCounter.home =tempCounter.home+1;
            }
            else if(res==v[1]){
                tempCounter.away =tempCounter.away+1;
            }
        })
        if(tempCounter.home>=tempCounter.x&&tempCounter.home>=tempCounter.away){
            return  v[0]
        }
        else if (tempCounter.away>=tempCounter.x&&tempCounter.away>tempCounter.home){
            return v[1]
        }
        else return 'tie'
    })

}


const generateTransColumn = () => ['name', ...games.map(g => `${g[0]}-${g[1]}`)]

const htmlTransGenerator = (path) => {
    const data = jsonData(path);
    const correct = getCorrectResult(data);
    //const columns = generateTransColumn(data);
    const columns = games;
    const crowd = crowedResult(data)
   const crowedRes = ['חוכמת ההמונים',...crowd,calcRes(crowd.map(c=>({result:c})),correct)] ;
    const rows = [crowedRes,...generateTransRow(data, correct)];
// const rows = generateTransRow(data, correct);
    return templateTable({ columns, rows,correct });
}


const htmlTransGeneratorMobile = (path) => {
    const data = jsonData(path);
    const correct = getCorrectResult(data);
    //const columns = generateTransColumn(data);
    const columns = games;
    const crowd = crowedResult(data)
   const crowedRes = ['חוכמת ההמונים',...crowd,calcRes(crowd.map(c=>({result:c})),correct)] ;
    const rows = [crowedRes,...generateTransRow(data, correct)];
// const rows = generateTransRow(data, correct);
    return templateTableMobile({ columns, rows,correct });
}
const htmlGenerator = (path) => {
    const data = jsonData(path);
    const columns = ['game', ...generateNamesColumns(data)];
    const rows = generateRowsFromData(data);

    return templateOldTable({ columns, rows });
}
const jsonData = (path) => JSON.parse(fs.readFileSync(path))

module.exports = { csvGenerator, htmlGenerator, htmlTransGenerator,htmlTransGeneratorMobile }