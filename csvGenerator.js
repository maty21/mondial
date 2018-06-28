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

const getCorrectResults = (data) => ['sixteen', 'quarter', 'semi', 'final'].map(level => getCorrectResultSecond(data, level))


const getCorrectResult = (data, level = "houses") => {
    return data['Xresult'][level].map((m, i) => m.result ? m.result : "nan")
}
const getCorrectResultSecond = (data, level = "houses") => {
    let d = data['Xresult'][level].map((m, i) => {
        let country = m.slots.filter(s => s.status == 'win');
        if (country.length != 0) {
            return country[0].name
        }
        return 'nan';
    })

    return d
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

const getSecondCountryGuess = (h) => {
    let country = h.slots.filter(s => s.status == 'win');
    if (country.length != 0) {
        country = country[0].name
    }
    else {
        country = 'nan';
    }
    return country;
}
const calcResSecond = (stage, correct, points) => {
    let score = 0;



    stage.forEach((h, i) => {
        let country = getSecondCountryGuess(h);

        if (correct[i] == "nan" || correct[i] != country) {
            score = score;
        }
        else {
            score = score + points;
        }
    })
    return score

}

const generateTransRowFirst = (data, correct) => Object.values(data).map(d => {
    return {
        user: d.user.name,
        results: d.houses.map(m => m.result ? m.result : "nan"),
        score: calcRes(d.houses, correct)
    }
})
const generateTransRow = (dataFirst, dataSecond, correct, correctSecond) => {
    const first = generateTransRowFirst(dataFirst, correct)
    const second = generateTransRowSecond(dataSecond, correctSecond);
    
    let final = first.map(f => {
        let secondResultsFinal = Array(15).fill().map(i=>'nan');
        let secondScoreFinal =0;
        let usr = second.find(n=>n.user==f.user)
        if (usr) {
            secondResultsFinal =usr.results
            secondScoreFinal= usr.score
        }
       
        return [f.user,  ...secondResultsFinal,...f.results, f.score + secondScoreFinal]
    })
    return final;


}

const generateTransRowSecond = (data, correct) => Object.values(data).map(d => {
    let score = 0;
    score = score + calcResSecond(d.sixteen, correct[0], 1)
    score = score + calcResSecond(d.quarter, correct[1], 2)
    score = score + calcResSecond(d.semi, correct[2], 4)
    score = score + calcResSecond(d.final, correct[3], 8)
    let results = []
    let tempResult = ['sixteen', 'quarter', 'semi', 'final'].map(g => {
        return d[g].map(r => getSecondCountryGuess(r))
    })
    tempResult.forEach((r, i) => results = [...results, ...tempResult[i]])
    return {
        user: d.user.name,
        results,
        score
    }
    
    //  return [d.user.name, ...d.houses.map(m => m.result ? m.result : "nan"), calcRes(d.houses, correct)]
})
const crowedResult = (data) => {


    return Object.entries(gamesAsObject()).map(([k, v]) => {
        const tempCounter = {
            home: 0,
            x: 0,
            away: 0
        }
        Object.values(data).forEach(d => {
            let res = d.houses.find(h => h.meta == +k + 1).result;
            if (res == 'tie') {
                tempCounter['x'] = tempCounter['x'] + 1;
            }
            else if (res == v[0]) {
                tempCounter.home = tempCounter.home + 1;
            }
            else if (res == v[1]) {
                tempCounter.away = tempCounter.away + 1;
            }
        })
        if (tempCounter.home >= tempCounter.x && tempCounter.home >= tempCounter.away) {
            return v[0]
        }
        else if (tempCounter.away >= tempCounter.x && tempCounter.away > tempCounter.home) {
            return v[1]
        }
        else return 'tie'
    })

}


const generateTransColumn = () => ['name', ...games.map(g => `${g[0]}-${g[1]}`)]

const addSecondStageToGames = (games, dataSecond) => {
    const { Xresult } = dataSecond;
    const calcGames = [

        ..._getGamesFromSpecificLevel(Xresult.sixteen),
        ..._getGamesFromSpecificLevel(Xresult.quarter),
        ..._getGamesFromSpecificLevel(Xresult.semi),
        ..._getGamesFromSpecificLevel(Xresult.final),
        ...games,
    ]
    return calcGames;
}

const _getGamesFromSpecificLevel = (level) => level.map(s => s.slots.map(n => (n.name == "" ? n.name = 'place-holder' : n.name)))

const htmlTransGenerator = (first, second) => {
    const dataFirst = jsonData(first);
    const dataSecond = jsonData(second);
    const gamesCalc = addSecondStageToGames(games, dataSecond)
    const correct = getCorrectResult(dataFirst);
    const correctSecond = getCorrectResults(dataSecond);
    let newRes = [];
    //const columns = generateTransColumn(data);
    correctSecond.forEach(r => newRes = [...newRes, ...r])
    //let secondGuess = generateTransRowSecond(dataSecond, correctSecond)
    newRes = [...newRes, ...correct]
    const columns = gamesCalc;
   // const crowedRes = []
    //  const crowd = crowedResult(data)
    //const crowedRes = ['חוכמת ההמונים', ...crowd, calcRes(crowd.map(c => ({ result: c })), correct)];
    const rows = [ ...generateTransRow(dataFirst, dataSecond, correct, correctSecond)];
    // const rows = generateTransRow(data, correct);
  return templateTable({ columns, rows, correct:newRes });
}


const htmlTransGeneratorMobile = (path) => {
    const data = jsonData(path);
    const correct = getCorrectResult(data);
    //const columns = generateTransColumn(data);
    const columns = games;
    const crowd = crowedResult(data)
    const crowedRes = ['חוכמת ההמונים', ...crowd, calcRes(crowd.map(c => ({ result: c })), correct)];
    const rows = [crowedRes, ...generateTransRow(data, correct)];
    // const rows = generateTransRow(data, correct);
    return templateTableMobile({ columns, rows, correct });
}
const htmlGenerator = (path) => {
    const data = jsonData(path);
    const columns = ['game', ...generateNamesColumns(data)];
    const rows = generateRowsFromData(data);

    return templateOldTable({ columns, rows });
}
const jsonData = (path) => JSON.parse(fs.readFileSync(path))

module.exports = { csvGenerator, htmlGenerator, htmlTransGenerator, htmlTransGeneratorMobile }