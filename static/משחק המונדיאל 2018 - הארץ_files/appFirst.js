// for (item in localStorage) {
//     localStorage.removeItem(item)
// }

let tempDate;
let interTourUser = {name : "משתמש חדש", type: "anon", visits: 0};
let mySelection = {};
let stages = ['houses','sixteen','quarter','semi','final','winner'];
let stages1 = ['sixteen','quarter','semi','final'];
let stage = {};
let matches = {};
let finished = false;
let saveButton = document.getElementById('inter-brackets-save');
let clearButton = document.getElementById('inter-brackets-clear');
let fastToTopButton = document.getElementById('fastToTop');
let allWrapper = document.querySelector('.inter-tournament-wrapper');
let helloBar = document.querySelector('.inter-tournament-hello');
let controls = document.querySelector('.inter-tournament-controls');
let opener = document.querySelector('.inter-tournament-open');
let saveDown =document.getElementsByClassName('share-predict inter-f')[0]
let logo = document.querySelector('.inter-tournament-hello > .inter-logo')
let helloBoxWrapperHeight;

stages.map(function(level){
    stage[level] = document.querySelector('.inter-brackets .inter-brackets-' + level);
    matches[level] = stage[level].querySelectorAll('.inter-brackets-match');
});
let bodyScroll;
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(init);
function init(){
 /*    if (window.innerWidth < 600) {

        Array.from(document.querySelectorAll('.mondial-ad')).map(ad => {
            console.log(ad)
            ad.querySelector('img').src = ad.querySelector('img').dataset.mobileimg;
        })
    } */
    // controls.remove();
    // helloBar.remove();
    // if (isMobile.apple.phone) {
    //     stage.sixteen.querySelector('h2').classList.add('tp2');
    //     stage.quarter.querySelector('h2').classList.add('tp2');
    //     stage.semi.querySelector('h2').classList.add('tp2');
    //     stage.final.querySelector('h2').classList.add('tp2');
    //     document.querySelector('.inter-brackets > .inter-brackets-winner').classList.add('tp2');
    // } // document.querySelector('.inter-tournament-wrapper h2').classList.add('tp2');
    //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
    window.scroll(0,0);
    //console.clear();
    let mainUserName = document.querySelector('.userName');
    let extraMessage = document.querySelector('.extraMessageForUser');
    let inputBox = document.querySelector('#inputUserName');
    let confirmButton = document.querySelector('#inputUserNameButton');
    let messageContainer = document.querySelector('.inter-message');

    allWrapper.classList.add('showme');
    helloBar.classList.add('showme');
    controls.classList.add('showme');
    controls.classList.remove('hideme')
    opener.classList.add('showme');
    confirmButton.addEventListener('click',function(){
        if (inputBox.value === "") {
            interTourUser.name = "משתמש חדש";
        } else {
            interTourUser.name = inputBox.value;
        }
        interTourUser.name = inputBox.value;
        inputBox.classList.add('hide');
        confirmButton.classList.add('hide');
        messageContainer.classList.add('lock');
        mainUserName.innerText += inputBox.value;
        inputBox.value = "";
        localStorage.setItem('interTourUser',interTourUser.name);
    });

    //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets-0').clientHeight + "px";

    if (getUrlParameter('myprediction')) {

        saveButton.classList.add('hideme');
        clearButton.classList.add('hideme');

        document.querySelector('.control-btn#inter-brackets').classList.remove('hide');
        document.querySelector('.inter-tournament-hello').classList.add('overlay');
        document.querySelector('.inter-brackets-0').classList.add('overlay');
        console.info('משתמש מגיע מלינק שיתוף (כולל תחזית)');
        let tempUid = getUrlParameter('myprediction');
        postAjax('/getResult' ,{user:tempUid},function(data) {
            let result = JSON.parse(data);
            let mySelection_str = (JSON.stringify(result));
            localStorage.setItem('myPrediction',mySelection_str);
            localStorage.setItem('interTourUser',tempUid);
            localStorage.setItem('friendsName',tempUid);
            interTourUser.name = tempUid;
            document.querySelector('.friendname').innerText = result.userName;
           // fillTour('inter-brackets-0',JSON.parse(result.prediction));
            fillTour('inter-brackets',JSON.parse(localStorage.getItem('myPrediction')));
            if (localStorage.getItem('myPrediction')) {
                console.info('המשתמש חוזר');
                fillTour('inter-brackets',JSON.parse(localStorage.getItem('myPrediction')));
                //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
                mainUserName.innerText = 'שלום שוב ' + interTourUser.name;
                extraMessage.innerText = ', סיבוב נוסף?';
                inputBox.classList.add('hide');
                confirmButton.classList.add('hide');
                localStorage.setItem('interTourUserVisits',parseInt(localStorage.getItem('interTourUserVisits')) + 1)
            } 
            //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets-0').getBoundingClientRect().height + 'px';
            //document.querySelector('.inter-tournament-wrapper').style.height = Array.from(document.querySelectorAll('.inter-tab'))[1].clientHeight + "px";
           // landIn();
        });
    } else {
        console.info('משתמש מגיע מלינק ישיר');
        saveButton.classList.remove('hide');
        clearButton.classList.remove('hide');
    }
    console.log('current mobile user: ',window.currentUser);
    if ((((window.UserUtil) && (window.UserUtil.getLoginInfo().login))) || (window.currentUser)) {
        saveButton.classList.remove('hide');
        clearButton.classList.remove('hide');

        console.info('המשתמש מנוי הארץ');
        if (window.UserUtil === undefined) {
            if (window.currentUser.login) {
                interTourUser.name = window.currentUser.firstName;
            }
        } else {
            interTourUser.name = UserUtil.getLoginInfo().firstName;
        }
        if (localStorage.getItem('myPrediction')) {
            console.info('המשתמש חוזר');
            fillTour('inter-brackets',JSON.parse(localStorage.getItem('myPrediction')));
            //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
            mainUserName.innerText = 'שלום שוב ' + interTourUser.name;
            extraMessage.innerText = ', סיבוב נוסף?';
            inputBox.classList.add('hide');
            confirmButton.classList.add('hide');
            localStorage.setItem('interTourUserVisits',parseInt(localStorage.getItem('interTourUserVisits')) + 1)
        } else {
            console.info('המשתמש חדש');
            localStorage.setItem('interTourUser',interTourUser.name);
            //mainUserName.innerText = 'שלום ' + interTourUser.name;
            extraMessage.innerText = ', שנצא לדרך?';
            if (interTourUser.name === "משתמש חדש") {
                mainUserName.innerText = 'שלום ';
                inputBox.classList.remove('hide');
                confirmButton.classList.remove('hide');
                localStorage.setItem('interTourUserVisits', 0)
            } else
            {
                mainUserName.innerText = 'שלום ' + interTourUser.name;
                inputBox.classList.add('hide');
                confirmButton.classList.add('hide');
            }
        }
    } else {
        saveButton.classList.remove('hide');
        clearButton.classList.remove('hide');
        console.info('המשתמש לא מנוי הארץ/אנונימי');
        if (localStorage.getItem('myPrediction')) {
            console.info('המשתמש חוזר');
            fillTour('inter-brackets',JSON.parse(localStorage.getItem('myPrediction')));
            interTourUser.name = localStorage.getItem('interTourUser')
            //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
            mainUserName.innerText = 'שלום שוב ' + localStorage.getItem('interTourUser');
            extraMessage.innerText = ', סיבוב נוסף?';
            inputBox.classList.add('hide');
            confirmButton.classList.add('hide');
            localStorage.setItem('interTourUserVisits',parseInt(localStorage.getItem('interTourUserVisits')) + 1)
        } else {
            console.info('המשתמש חדש');
           localStorage.setItem('interTourUser',interTourUser.name);
            mainUserName.innerText = 'שלום ';
            extraMessage.innerText = ', שנצא לדרך?';
            localStorage.setItem('interTourUserVisits',0);
            //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
        }
    }

    messageContainer.classList.add('show');
    helloBoxWrapperHeight = document.getElementById('inter-tournament-hello-wrapper').offsetHeight;

}
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function postAjax(url, data, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    return xhr;
}
function goToTop() {
    document.querySelector('.inter-brackets-0 > .inter-brackets-houses h2').scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    document.querySelector('.inter-brackets-0').classList.add('hide');
    document.querySelector('.inter-brackets').classList.remove('hide');
    controls.classList.remove('hideme');
}
function saveFunction() {
saveButton.classList.add('rotate');
setTimeout(function(){
    saveButton.classList.remove('rotate');
    },1200)
}
function landIn(){
    controls.classList.add('tac');
    document.querySelector('#inter-brackets0').classList.add('trumpFlex');
    console.log('hereTop');
    document.querySelector('.inter-brackets').classList.add('hide');
    document.querySelector('.inter-brackets-0').classList.remove('hide');
    //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets-0').getBoundingClientRect().height + 'px';

    let winnerBase = document.querySelector('.inter-brackets-0 > .inter-brackets-winner');
    if (isMobile.apple.phone) {
        winnerBase.classList.add('tp21');
        winnerBase.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    } else {
        winnerBase.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    }



    window.addEventListener('scroll', scrollAfterPrediction);


}
function scrollAfterPrediction() {
    let winnerStage = document.querySelector('.inter-brackets-0 > .inter-brackets-winner');
    let winnerStageBottom = winnerStage.getBoundingClientRect().bottom;
    console.log(winnerStageBottom);
    let heightVar = (isMobile.apple.phone) ? window.innerHeight : window.outerHeight;
    if (winnerStageBottom > heightVar) {
        document.querySelector('.inter-tournament-controls').classList.remove('hideme')
    } else {
        document.querySelector('.inter-tournament-controls').classList.add('hideme')
    }
}
function final() {
    var allMatches = Array.from(document.querySelector('.inter-brackets .inter-brackets-final').querySelectorAll('.inter-brackets-match'));
    finished = allMatches.every(function (match,i) {
        return (match.dataset.finished === "true")
    });
    if (finished) {
        //stage.winner.querySelector('.winner-stage').scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        const winner = stage.winner.querySelector('.winner-stage');
        scrollToElement(winner);
    }

    //tage.final.getElementsByTagName('h2')[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    const final = document.querySelector('.inter-brackets-final-wrapper > h2');
    scrollToElement(final);

    setTimeout(function(){
        stage.final.classList.remove('stage-locked');
    },500);
    Array.from(stage.final.querySelectorAll('.inter-brackets-match')).map(function (matchO, i) {

        switch (i) {
            case 0 :
                getMatchposS(0, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchposS(1, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
        }
    })
}
function semi() {
    var allMatches = Array.from(document.querySelector('.inter-brackets .inter-brackets-semi').querySelectorAll('.inter-brackets-match'));
    finished = allMatches.every(function (match,i) {
        return (match.dataset.finished === "true")
    });
    if (finished) {final()}

    //stage.semi.getElementsByTagName('h2')[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    const firstSemi = stage.semi.getElementsByTagName('h2')[0];
    scrollToElement(firstSemi);

    setTimeout(function(){
        stage.semi.classList.remove('stage-locked');
    },500);
    Array.from(stage.semi.querySelectorAll('.inter-brackets-match')).map(function (matchO, i) {

        switch (i) {
            case 0 :
                getMatchposQ(0, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchposQ(2, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
            case 1 :
                getMatchposQ(1, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchposQ(3, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
        }
    })
}
function quarter() {
    var allMatches = Array.from(document.querySelector('.inter-brackets .inter-brackets-quarter').querySelectorAll('.inter-brackets-match'));
    finished = allMatches.every(function (match,i) {
        return (match.dataset.finished === "true")
    });
    if (finished) {semi()}

    //stage.quarter.getElementsByTagName('h2')[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    const firstQuarter = stage.quarter.getElementsByTagName('h2')[0];
    scrollToElement(firstQuarter);

    setTimeout(function(){
        stage.quarter.classList.remove('stage-locked');
    },500);
    Array.from(stage.quarter.querySelectorAll('.inter-brackets-match')).map(function (matchO, i) {

        switch (i) {
            case 0 :
                getMatchpos(0, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchpos(2, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
            case 1 :
                getMatchpos(1, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchpos(3, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
            case 2 :
                getMatchpos(4, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchpos(6, matchO.querySelectorAll('.country-select')[1], 'win');
                break;
            case 3 :
                getMatchpos(5, matchO.querySelectorAll('.country-select')[0], 'win');
                getMatchpos(7, matchO.querySelectorAll('.country-select')[1], 'win');
                break;

        }
    })
}
function sixteen() {
    // console.log('here');
    // var allMatches = Array.from(document.querySelector('.inter-brackets .inter-brackets-sixteen').querySelectorAll('.inter-brackets-match'));
    // finished = allMatches.every(function (match,i) {
    //     return (match.dataset.finished === "true")
    // });
    // if (finished) {
    //     quarter()
    // } else {
    console.log(isMobile.any);
    /*if (isMobile.any) {
        stage.sixteen.querySelectorAll('.inter-brackets-match')[0].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
    } else {*/
        // document.querySelector('.inter-brackets-sixteen > h2').scrollIntoView({
        //     behavior: "smooth",
        //     block: "center",
        //     inline: "center"
        // });
   // }

    const firstSixteen = document.querySelector('.inter-brackets-sixteen > h2');
    scrollToElement(firstSixteen);

    setTimeout(function () {
        stage.sixteen.classList.remove('stage-locked');
    }, 500);

    Array.from(stage.sixteen.querySelectorAll('.inter-brackets-match')).map(function (matchO, i) {
        switch (i) {
            case 0 :
                gethousepos(0, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(1, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 1 :
                gethousepos(1, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(0, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 2 :
                gethousepos(2, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(3, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 3 :
                gethousepos(3, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(2, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 4 :
                gethousepos(4, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(5, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 5 :
                gethousepos(5, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(4, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 6 :
                gethousepos(6, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(7, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
            case 7 :
                gethousepos(7, matchO.querySelectorAll('.country-select')[0], 'win1');
                gethousepos(6, matchO.querySelectorAll('.country-select')[1], 'win2');
                break;
        }
    })
    // }
}



let myEfficientFn = debounce(function() {
    if (window.innerWidth < 600) {
        Array.from(document.querySelectorAll('.mondial-ad')).map(ad => {
            ad.querySelector('img').src = ad.querySelector('img').dataset.mobileimg;
        })
    }
    console.log('resized');
    // if (document.querySelector('.inter-brackets').classList.contains('hide')) {
    //     document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets-0').getBoundingClientRect().height + 'px';
    // } else {
    //     document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
    // }
}, 250);
function checkStatusMatchF(matchItem,selectorItem) {
    winner = null;
    item = selectorItem;
    parentItem = matchItem;
    wrapperItem = matchItem;
    Array.from(parentItem.querySelectorAll('.country-select')).map(function (select, i) {
        if ((select === item)) {
            select.dataset.status = 'win';
            select.querySelector('.input-wrapper-content').innerText = "זוכה";
            winner=select;

        } else {
            select.dataset.status = 'lost';
            select.querySelector('.input-wrapper-content').innerText = "מפסידה"
        }
        select.parentElement.querySelector('.inter-brackets-house-message').innerText = "סיימת!"
        }
    );
    parentItem.dataset.finished = "true";
    allMatches = Array.from(document.querySelector('.inter-brackets-final').querySelectorAll('.inter-brackets-match'));

    finished = allMatches.every(function (match) {
        //console.log(match);
        return (match.dataset.finished === "true")
    });

    if (finished) {
        // if (isMobile.apple.phone) {
        //     stage.winner.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        // } else {
        //     stage.winner.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
        // }
        scrollToElement(stage.winner);


        setTimeout(function(){
            stage.winner.classList.remove('stage-locked');
        },500);
        //console.log(winner.dataset.country + 'המנצחת היא: ');
        console.log(winner);
        stage.winner.querySelector('.winner-name').innerText = winner.querySelector('.country-name').innerText;

        //stage.winner.querySelector('.winner-flag').src = winner.querySelector('.country-flag > img').src;
        let url = winner.querySelector('.country-flag > img').src;
        let filename = url.match(/([^\/]+)(?=\.\w+$)/)[0];
        console.log(filename);
        //todo: set the file name with the correct share image
        stage.winner.querySelector('.winner-stage').setAttribute('s-img','https://www.haaretz.co.il/st/c/static/resources/img/mondial2018/shares/3/'+filename+'.png');
        stage.winner.querySelector('.winner-stage').setAttribute('s-header','משלב הבתים עד לגביע: זו התחזית שלי למונדיאל. מלאו את שלכם');

        ga('send','event', 'World cup Game 2018' , 'winner' , filename);

        allShares();

        saveToCookie();
    }


}
function checkStatusMatchQ(matchItem,selectorItem) {

    item = selectorItem;
    parentItem = matchItem;
    wrapperItem = matchItem;

    //console.log(matchItem,selectorItem);
    Array.from(parentItem.querySelectorAll('.country-select')).map(function (select, i) {
        if ((select === item)) {
            select.dataset.status = 'win';
            select.querySelector('.input-wrapper-content').innerText = "עולה"

        } else {
            select.dataset.status = 'lost';
            select.querySelector('.input-wrapper-content').innerText = "מודחת"
        }
        select.parentElement.querySelector('.inter-brackets-house-message').innerText = "המשך למשחק הבא"
        }
    );

    if (Array.from(matches.quarter)[parentItem.dataset.match]) {
        //let stepforIphone = (isMobile.apple.phone) ? 1 : 0;
        var nextMatch =  (Array.from(matches.quarter)[parentItem.dataset.match]);
        //nextMatch.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        scrollToElement(nextMatch);
    }

    parentItem.dataset.finished = "true";
    allMatches = Array.from(document.querySelector('.inter-brackets-quarter').querySelectorAll('.inter-brackets-match'));

    finished = allMatches.every(function (match) {
        //console.log(match);
        return (match.dataset.finished === "true")
    });

    if (finished) {
        console.log('עוברים לשלב חצי גמר!');
        semi()
    }


}
function checkStatusMatchS(matchItem,selectorItem) {
    item = selectorItem;
    parentItem = matchItem;
    wrapperItem = matchItem;

    Array.from(parentItem.querySelectorAll('.country-select')).map(function (select, i) {
        if ((select === item)) {
            select.dataset.status = 'win';
            select.querySelector('.input-wrapper-content').innerText = "עולה"

        } else {
            select.dataset.status = 'lost';
            select.querySelector('.input-wrapper-content').innerText = "מודחת"
        }
        select.parentElement.querySelector('.inter-brackets-house-message').innerText = "המשך למשחק הבא"
        }
    );

    if (Array.from(matches.semi)[parentItem.dataset.match]) {
        //let stepforIphone = (isMobile.apple.phone) ? 1 : 0;
        var nextMatch =  (Array.from(matches.semi)[parentItem.dataset.match]);
        //nextMatch.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        scrollToElement(nextMatch);
    }

    parentItem.dataset.finished = "true";
    allMatches = Array.from(document.querySelector('.inter-brackets-semi').querySelectorAll('.inter-brackets-match'));

    finished = allMatches.every(function (match) {
        //console.log(match);
        return (match.dataset.finished === "true")
    });

    if (finished) {
        console.log('עולים לגמר!');
        final()
    }


}
function checkStatusMatch(matchItem,selectorItem) {
    stage.sixteen = document.querySelector('.inter-brackets-sixteen');
    matches.sixteen = stage.sixteen.querySelectorAll('.inter-brackets-match');
    item = selectorItem;
    parentItem = matchItem;
    wrapperItem = matchItem;

    Array.from(parentItem.querySelectorAll('.country-select')).map(function (select, i) {
            if ((select === item)) {
                select.dataset.status = 'win';
                select.querySelector('.input-wrapper-content').innerText = "עולה"

            } else {
                select.dataset.status = 'lost';
                select.querySelector('.input-wrapper-content').innerText = "מודחת";
                console.log(select.parentElement.dataset.match);
                //stage.houses.querySelector('.inter-brackets-house["data-housenum"='+ (select.dataset.housenum + 1) + ']').scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            }
            //if (Array.from(matches.sixteen)[i]) {Array.from(matches.sixteen)[i].scrollIntoView({behavior: "smooth", block: "center", inline: "center"}); }

        }
    );
    parentItem.querySelector('.inter-brackets-house-message').innerText = "המשך למשחק הבא";
    stage.sixteen = document.querySelector('.inter-brackets-sixteen');
    matches.sixteen = stage.sixteen.querySelectorAll('.inter-brackets-match');
    // scrollIt(Array.from(matches.sixteen)[parentItem.dataset.match])
    //let stepforIphone = (isMobile.apple.phone) ? 1 : 0;
    const nextsixteen = Array.from(matches.sixteen)[parentItem.dataset.match];
    scrollToElement(nextsixteen);
    // if (Array.from(matches.sixteen)[parentItem.dataset.match]) {
    //     //console.log(Array.from(matches.sixteen)[parentItem.dataset.match])
    //     Array.from(matches.sixteen)[parentItem.dataset.match - stepforIphone].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    // }
    parentItem.dataset.finished = "true";
    var allMatches = Array.from(document.querySelector('.inter-brackets-sixteen').querySelectorAll('.inter-brackets-match'));

    finished = allMatches.every(function (match,i) {
        // if ((match.dataset.finished !== "false")) {
        //     match.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        // }
        return (match.dataset.finished === "true")
    });

    if (finished) {
        console.log('עולים לשלב רבע הגמר');
        quarter()
    }


}
function checkStatusHouse(parent, item) {
    currentOutComes = parent.dataset.outcomes;
    // if (currentOutComes.includes('win,lost')) {
    //     item.dataset.status = "win1";
    //     item.querySelector('.input-wrapper-content').innerText = "מקום 1";
    //     item.parentElement.querySelector('.inter-brackets-house-message').innerText = "בחרו מקום שני";
    //     parent.dataset.outcomes = currentOutComes.replace('win,', '');

    // } else 
    if (currentOutComes.includes('lost')) {
        item.dataset.status = "win2";
        item.querySelector('.input-wrapper-content').innerText = "ניחוש";
        parent.dataset.outcomes = currentOutComes.replace('lost', '');
        let ParentItems = Array.from(parent.querySelectorAll('.country-select'));
        ParentItems.map(function (item) {
            if (item.dataset.status === "null") {
                item.dataset.status = "out";
                item.querySelector('.input-wrapper-content').innerText = "בחוץ";
                item.parentElement.querySelector('.inter-brackets-house-message').innerText = "הבחירות בבית זה הסתיימו"
            }
            parent.dataset.finished = "true";
            ParentItems = Array.from(parent.querySelectorAll('.country-select'));
            allHouses = Array.from(document.querySelectorAll('.inter-brackets .inter-brackets-house'));
        });

        let stepforIphone = (isMobile.apple.phone) ? 0 : 1;
        const nextHouse = stage.houses.querySelector('.inter-brackets-house[data-housenum="'+ (parseInt(item.parentElement.dataset.housenum) + 1) + '"]');

        scrollToElement(nextHouse);

        //if ((stage.houses.querySelector('.inter-brackets-house[data-housenum="'+ (parseInt(item.parentElement.dataset.housenum) + 1) + '"]'))) { stage.houses.querySelector('.inter-brackets-house[data-housenum="'+ (parseInt(item.parentElement.dataset.housenum) + stepforIphone) + '"]').scrollIntoView({behavior: "smooth", block: "center", inline: "center"}); }

        // if ((stage.houses.querySelector('.inter-brackets-house[data-housenum="'+ (parseInt(item.parentElement.dataset.housenum) + 1) + '"]'))) {
        //     (stage.houses.querySelector('.inter-brackets-house[data-housenum="'+ (parseInt(item.parentElement.dataset.housenum) + 1) + '"]'))
        // }
        finished = allHouses.every(function (house) {
            return (house.dataset.finished === "true")
        });

        if (finished) {
            console.log('עולים לשלב שמינית הגמר');
            sixteen()
        }
        // } else if ((!finished) && (stage.houses.querySelector('.inter-brackets-house[data-housenum="7"]').dataset.finished === "true")) {
        //     window.alert('לא סיימת את הבתים')
        // }
    }
}

function scrollToElement(element) {

    if (element) {
        let top = window.scrollY + parseInt(element.getBoundingClientRect().top, 10) - 6;
        const helloBox = document.querySelector('.inter-tournament-hello');
        top = helloBox.classList.contains('lock') ? top - helloBoxWrapperHeight : top - (helloBoxWrapperHeight * 2);

        window.scrollTo({
            left: 0,
            top: top,
            behavior: 'smooth'
        });
    }


}

//
stage.final.addEventListener('click', function (e) {
    if (e.target.className === "country-select") {
        var matchElement = e.target.parentElement;//.parentElement.parentElement;
        var selectorElement = e.target;//.parentElement.parentElement;
        if (selectorElement.dataset.status !== "null") {
            Array.from(matchElement.querySelectorAll('.country-select')).map(function (item) {
                item.dataset.status = "null";
                item.querySelector('.input-wrapper-content').innerText = 'בחר';
            });
            matchElement.dataset.finished = "false";
            selectorElement.parentElement.querySelector('.inter-brackets-house-message').innerText = 'בחרו מנצחת';
        } else {
            checkStatusMatchF(matchElement,selectorElement);
        }
    }
});
stage.semi.addEventListener('click', function (e) {
    if (e.target.className === "country-select") {
        var matchElement = e.target.parentElement; //.parentElement.parentElement;
        var selectorElement = e.target; //.parentElement.parentElement;
        if (selectorElement.dataset.status !== "null") {
            Array.from(matchElement.querySelectorAll('.country-select')).map(function (item) {
                item.dataset.status = "null";
                item.querySelector('.input-wrapper-content').innerText = 'בחרו';
            });
            matchElement.dataset.finished = "false";
            selectorElement.parentElement.querySelector('.inter-brackets-house-message').innerText = 'בחרו מנצחת';
            allMatches = Array.from(document.querySelectorAll('.inter-brackets-match'));
        } else {
            checkStatusMatchS(matchElement,selectorElement);
        }
    }
});
stage.quarter.addEventListener('click', function (e) {
    if (e.target.className === "country-select") {
        var matchElement = e.target.parentElement;//.parentElement.parentElement;
        var selectorElement = e.target;//.parentElement.parentElement;
        if (selectorElement.dataset.status !== "null") {
            Array.from(matchElement.querySelectorAll('.country-select')).map(function (item) {
                item.dataset.status = "null";
                item.querySelector('.input-wrapper-content').innerText = 'בחרו';
            });
            selectorElement.parentElement.querySelector('.inter-brackets-house-message').innerText = 'בחרו מנצחת';
            matchElement.dataset.finished = "false";
            allMatches = Array.from(document.querySelectorAll('.inter-brackets-match'));
        } else {
            checkStatusMatchQ(matchElement,selectorElement);
        }
    }
});
stage.sixteen.addEventListener('click', function (e) {
    if (e.target.className === "country-select") {
        var matchElement = e.target.parentElement;//.parentElement.parentElement;
        var selectorElement = e.target;//.parentElement.parentElement;
        if (selectorElement.dataset.status !== "null") {
            Array.from(matchElement.querySelectorAll('.country-select')).map(function (item) {
                item.dataset.status = "null";
                item.querySelector('.input-wrapper-content').innerText = 'בחרו';
            });
            selectorElement.parentElement.querySelector('.inter-brackets-house-message').innerText = 'בחרו מנצחת';
            matchElement.dataset.finished = "false";
        } else {
            checkStatusMatch(matchElement,selectorElement);
        }
    }
});
stage.houses.addEventListener('click', function (e) {
    if (e.target.className === "country-select") {
        var matchElement = e.target.parentElement;//.parentElement.parentElement;
        var selectorElement = e.target;//.parentElement.parentElement;

        //console.log('selector: ',selectorElement);
        if (selectorElement.dataset.status !== "null") {
            Array.from(matchElement.querySelectorAll('.country-select')).map(function (item) {
                item.querySelector('.input-wrapper-content').innerText = 'בחרו';
                item.dataset.status = "null";
            });
            selectorElement.parentElement.querySelector('.inter-brackets-house-message').innerText = 'בחרו מקום ראשון';
            matchElement.dataset.outcomes = "win,lost";
            matchElement.dataset.finished = "false";
            allHouses = Array.from(document.querySelectorAll('.inter-brackets-house'));
        } else  {
            let matchId = matchElement.parentElement.classList.value.replace('inter-brackets-','');
            checkStatusHouse(matchElement, selectorElement);
        }
    }
});
fastToTopButton.addEventListener('click',function(){
    window.removeEventListener('scroll', scrollAfterPrediction);
    goToTop();
    helloBar.classList.remove('overlay');

    controls.classList.remove('hideme');
    saveButton.classList.remove('hideme');
    clearButton.classList.remove('hideme');
    
    document.querySelector('#inter-brackets').classList.add('hide');
    document.querySelector('#inter-brackets0').classList.remove('hide');
    document.querySelector('#inter-brackets0').innerHTML = "לתחזית של " + localStorage.getItem('friendsName');
    document.querySelector('.inter-brackets-0').classList.add('hide');
    document.querySelector('.inter-brackets').classList.remove('hide');

    document.querySelector('#inter-brackets0').addEventListener('click',function(){
        document.querySelector('.control-btn#inter-brackets0').classList.add('hide');
        document.querySelector('.control-btn#inter-brackets').classList.remove('hide');
        document.querySelector('#inter-brackets').innerHTML = "לתחזית שלך"

    });
});
saveButton.addEventListener('click',function(){
    saveFunction();
    saveToCookie();
    console.info('saved to cookie');
});
saveDown.addEventListener('click',function(){
    saveFunction();
    saveToCookie();
    console.info('saved to cookie');
});
clearButton.addEventListener('click',function() {
    localStorage.removeItem('myPrediction')
    localStorage.removeItem('interTourUser')
    fillTour('inter-brackets',cleanSlate);
    //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.inter-brackets').getBoundingClientRect().height + 'px';
    const houses = document.querySelector('.inter-brackets-houses');
    scrollToElement(houses);
});
document.querySelector('#inter-brackets').addEventListener('click',function() {
    window.removeEventListener('scroll', scrollAfterPrediction);
    goToTop();
    document.querySelector('#inter-brackets').classList.add('hide');
    document.querySelector('#inter-brackets0').classList.remove('hide');
    document.querySelector('#inter-brackets0').innerHTML = "לתחזית של " + localStorage.getItem('friendsName');
    controls.classList.remove('hideme');
    saveButton.classList.remove('hideme');
    clearButton.classList.remove('hideme');
    document.querySelector('.inter-brackets-0').classList.add('hide');
    document.querySelector('.inter-brackets').classList.remove('hide');
    document.querySelector('.inter-tournament-hello').classList.remove('overlay');
});
document.querySelector('#inter-brackets0').addEventListener('click',function(){
    saveButton.classList.add('hideme');
    clearButton.classList.add('hideme');
    document.querySelector('.control-btn#inter-brackets0').classList.add('hide');
    document.querySelector('.control-btn#inter-brackets').classList.remove('hide');
    document.querySelector('.inter-tournament-hello').classList.add('overlay');
    document.querySelector('#inter-brackets').innerHTML = "לתחזית שלך";
    document.querySelector('.inter-brackets-0').classList.remove('hide');
    document.querySelector('.inter-brackets').classList.add('hide');
});
window.addEventListener('scroll', function(e) {
    let barTop = helloBar.getBoundingClientRect().top;
    if (barTop < 0) {
        helloBar.classList.add('lock');
        logo.classList.remove('hideme');
        if (isMobile.apple.phone) {document.querySelector('.inter-tournament-master-wrapper').classList.add('pt')}
    }
    let stopper = document.querySelector('.inter-tournament-open-info');
    let stopperTop = stopper.getBoundingClientRect().bottom;
    if (stopperTop > 0) {
        logo.classList.add('hideme');
        helloBar.classList.remove('lock');
        if (isMobile.apple.phone) {document.querySelector('.inter-tournament-master-wrapper').classList.remove('pt')}

    }
});
window.addEventListener('resize', myEfficientFn);

function gethousepos(housenum, elem, status) {
    var currentHouse = Array.from(document.querySelectorAll('.inter-brackets-house'))[housenum];
    var tempElem = currentHouse.querySelector('.country-select[data-status=' + status + ']');
    elem.querySelector('.country-flag > img').src = tempElem.querySelector('.country-flag > img').src;
    elem.querySelector('.country-name').innerText = tempElem.querySelector('.country-name').innerText;
    elem.dataset.country = tempElem.dataset.country;
}
function getMatchpos(matchnum, elem, status) {
    //console.log(matchnum);
    var currentMatch = Array.from(document.querySelector('.inter-brackets-sixteen').querySelectorAll('.inter-brackets-match'))[matchnum];

    var tempElem = currentMatch.querySelector('.country-select[data-status=' + status + ']');
    elem.querySelector('.country-flag > img').src = tempElem.querySelector('.country-flag > img').src;
    elem.querySelector('.country-name').innerText = tempElem.querySelector('.country-name').innerText;
    elem.dataset.country = tempElem.dataset.country;

}
function getMatchposQ(matchnum, elem, status) {
    //console.log(matchnum);
    var currentMatch = Array.from(document.querySelector('.inter-brackets-quarter').querySelectorAll('.inter-brackets-match'))[matchnum];

    var tempElem = currentMatch.querySelector('.country-select[data-status=' + status + ']');
    elem.querySelector('.country-flag > img').src = tempElem.querySelector('.country-flag > img').src;
    elem.querySelector('.country-name').innerText = tempElem.querySelector('.country-name').innerText;
    elem.dataset.country = tempElem.dataset.country;

}
function getMatchposS(matchnum, elem, status) {

    var currentMatch = Array.from(document.querySelector('.inter-brackets-semi').querySelectorAll('.inter-brackets-match'))[matchnum];

    var tempElem = currentMatch.querySelector('.country-select[data-status=' + status + ']');
    elem.querySelector('.country-flag > img').src = tempElem.querySelector('.country-flag > img').src;
    elem.querySelector('.country-name').innerText = tempElem.querySelector('.country-name').innerText;
    elem.dataset.country = tempElem.dataset.country;
}

function saveToCookie() {
    mySelection = {};
    var jsonHouses = Array.from(document.querySelector('.inter-brackets .inter-brackets-houses').querySelectorAll('.inter-brackets-house'));
    var jsonSixteen = Array.from(document.querySelector('.inter-brackets .inter-brackets-sixteen').querySelectorAll('.inter-brackets-match'));
    var jsonQuarter = Array.from(document.querySelector('.inter-brackets .inter-brackets-quarter').querySelectorAll('.inter-brackets-match'));
    var jsonSemi = Array.from(document.querySelector('.inter-brackets .inter-brackets-semi').querySelectorAll('.inter-brackets-match'));
    var jsonFinal = Array.from(document.querySelector('.inter-brackets .inter-brackets-final').querySelectorAll('.inter-brackets-match'));
    var jsonWinner = document.querySelector('.inter-brackets .inter-brackets-winner');
    //winner
    mySelection.user = mySelection.user || {};
    mySelection.user.name = interTourUser.name;
    mySelection.user.type = interTourUser.type;

    mySelection.houses = mySelection.houses || [];
    jsonHouses.map(function(house,i){
        let tempObj = {};
        tempObj.meta = house.querySelector('.meta-id').innerText;
        tempObj.msg = house.querySelector('.inter-brackets-house-message').innerText;
        tempObj.outcomes = house.dataset.outcomes;
        tempObj.status = house.dataset.finished;
        tempObj.slots = tempObj.slots || [];
        Array.from(house.querySelectorAll('.country-select')).map(function(slot){
            if(slot.querySelector('.input-wrapper-content').innerText=="ניחוש"){
                tempObj.result =  slot.dataset.country;
            }
            tempObj.slots.push({buttonText: slot.querySelector('.input-wrapper-content').innerText,name: slot.dataset.country, status: slot.dataset.status, flagUrl: slot.querySelector('.country-flag > img').src})
        });
        mySelection.houses.push(tempObj);
    });
    mySelection.sixteen = mySelection.sixteen || [];
    jsonSixteen.map(function(match,i){
        let tempObj = {};
        tempObj.msg = match.querySelector('.inter-brackets-house-message').innerText;
        tempObj.status = match.dataset.finished;
        tempObj.slots = tempObj.slots || [];
        Array.from(match.querySelectorAll('.country-select')).map(function(slot){
            tempObj.slots.push({buttonText: slot.querySelector('.input-wrapper-content').innerText,nameHeb: slot.querySelector('.country-name').innerText,name: slot.dataset.country, status: slot.dataset.status, flagUrl: slot.querySelector('.country-flag > img').src})
        });
        mySelection.sixteen.push(tempObj);
    });

    mySelection.quarter = mySelection.quarter || [];
    jsonQuarter.map(function(match,i){
        let tempObj = {};
        tempObj.msg = match.querySelector('.inter-brackets-house-message').innerText;
        tempObj.status = match.dataset.finished;
        tempObj.slots = tempObj.slots || [];
        Array.from(match.querySelectorAll('.country-select')).map(function(slot){
            tempObj.slots.push({buttonText: slot.querySelector('.input-wrapper-content').innerText,nameHeb: slot.querySelector('.country-name').innerText,name: slot.dataset.country, status: slot.dataset.status, flagUrl: slot.querySelector('.country-flag > img').src})
        });
        mySelection.quarter.push(tempObj);
    });

    mySelection.semi = mySelection.semi || [];
    jsonSemi.map(function(match,i){
        let tempObj = {};
        tempObj.msg = match.querySelector('.inter-brackets-house-message').innerText;
        tempObj.status = match.dataset.finished;
        tempObj.slots = tempObj.slots || [];
        Array.from(match.querySelectorAll('.country-select')).map(function(slot){
            tempObj.slots.push({buttonText: slot.querySelector('.input-wrapper-content').innerText,nameHeb: slot.querySelector('.country-name').innerText,name: slot.dataset.country, status: slot.dataset.status, flagUrl: slot.querySelector('.country-flag > img').src})
        });
        mySelection.semi.push(tempObj);
    });

    mySelection.final = mySelection.final || [];
    jsonFinal.map(function(match,i){
        let tempObj = {};
        tempObj.msg = match.querySelector('.inter-brackets-house-message').innerText;
        tempObj.status = match.dataset.finished;
        tempObj.slots = tempObj.slots || [];
        Array.from(match.querySelectorAll('.country-select')).map(function(slot){
            tempObj.slots.push({buttonText: slot.querySelector('.input-wrapper-content').innerText,nameHeb: slot.querySelector('.country-name').innerText,name: slot.dataset.country, status: slot.dataset.status, flagUrl: slot.querySelector('.country-flag > img').src})
        });
        mySelection.final.push(tempObj);
    });

    mySelection.winner = mySelection.winner || {};
        mySelection.winner.name = jsonWinner.querySelector('.winner-name').innerText;
        //mySelection.winner.flagUrl = jsonWinner.querySelector('.winner-flag').src;
        mySelection.winner.attrs = {
            header: jsonWinner.querySelector('.winner-stage').getAttribute('s-header'),
            text: jsonWinner.querySelector('.winner-stage').getAttribute('s-text'),
            desc: jsonWinner.querySelector('.winner-stage').getAttribute('s-desc'),
            link: jsonWinner.querySelector('.winner-stage').getAttribute('s-link'),
            img: jsonWinner.querySelector('.winner-stage').getAttribute('s-img'),
        };
    let mySelection_str = (JSON.stringify(mySelection));
    //console.log(mySelection_str);

    //console.log(mySelection_str + "");
    //check if user name
    localStorage.setItem('myPrediction',mySelection_str);
    localStorage.setItem('interTourUserVisits',interTourUser.visits);


        postAjax('./saveResults' , {user:interTourUser.name,selection:mySelection} ,function(data) {

            result = JSON.parse(data);
            //tempDate = new Date(result.createDate.$date);
            //console.log(tempDate);
            //let descStr = tempDate.getDate() + "/" + (tempDate.getMonth()  + 1) + "/" + tempDate.getFullYear();
            // stage.winner.querySelector('.winner-stage').setAttribute('s-text',stage.winner.querySelector('.winner-stage').getAttribute('s-text') + " - " + descStr);
           //console.log(result["_id"]["$oid"]);
           newUid = result["_id"]["$oid"];
           localStorage.setItem('interTourUserUid',result._id["$oid"]);
           // localStorage.setItem('interTourDate', mySelection.winner.attrs.text + descStr);
            stage.winner.querySelector('.winner-stage').setAttribute('s-link','https://www.haaretz.co.il/EXT-INTERACTIVE-1.2626010?myprediction=' + newUid);
        });

        //loadData('https://www.haaretz.co.il/interactivePolls?poll=mondial2018brackets&userName=' + interTourUser.name +'&prediction=' + mySelection_str ,function(data){
            //console.log(data);
            // let result = data; // tbc
            // localStorage.setItem('interTourUserUid',result._id["$oid"])
          //  localStorage.setItem('interTourUserUID')
        //})

}
function fillTour(mainElemClass,obj) {
    var fillHouses = Array.from(document.querySelector('.'+mainElemClass+' .inter-brackets-houses').querySelectorAll('.inter-brackets-house'));
    var fillSixteen = Array.from(document.querySelector('.'+mainElemClass+' .inter-brackets-sixteen').querySelectorAll('.inter-brackets-match'));
    var fillQuarter = Array.from(document.querySelector('.'+mainElemClass+' .inter-brackets-quarter').querySelectorAll('.inter-brackets-match'));
    var fillSemi = Array.from(document.querySelector('.'+mainElemClass+' .inter-brackets-semi').querySelectorAll('.inter-brackets-match'));
    var fillFinal = Array.from(document.querySelector('.'+mainElemClass+' .inter-brackets-final').querySelectorAll('.inter-brackets-match'));
    var fillWinner = document.querySelector('.'+mainElemClass+' .inter-brackets-winner');

console.log(obj.winner.attrs);
console.log(obj.winner.name);
    fillHouses.map(function(house,i1){
        house.querySelector('.inter-brackets-house-message').innerText = obj.houses[i1].msg;
        house.dataset.finished = obj.houses[i1].status;
        house.dataset.outcomes = obj.houses[i1].outcomes;

        Array.from(house.querySelectorAll('.country-select')).map(function(slot,i2){
            slot.dataset.status = obj.houses[i1].slots[i2].status;
            slot.querySelector('.input-wrapper-content').innerText = obj.houses[i1].slots[i2].buttonText;
        })
    });
    fillSixteen.map(function(match,i1){
        match.querySelector('.inter-brackets-house-message').innerText = obj.sixteen[i1].msg;
        match.dataset.finished = obj.sixteen[i1].status;
        Array.from(match.querySelectorAll('.country-select')).map(function(slot,i2){
            slot.dataset.status = obj.sixteen[i1].slots[i2].status;
            slot.querySelector('.country-flag > img').src = obj.sixteen[i1].slots[i2].flagUrl;
            slot.querySelector('.country-name').innerText = obj.sixteen[i1].slots[i2].nameHeb;
            slot.querySelector('.input-wrapper-content').innerText = obj.sixteen[i1].slots[i2].buttonText;
        })
    });
    fillQuarter.map(function(match,i1){
        match.querySelector('.inter-brackets-house-message').innerText = obj.quarter[i1].msg;
        match.dataset.finished = obj.quarter[i1].status;
        Array.from(match.querySelectorAll('.country-select')).map(function(slot,i2){
            slot.dataset.status = obj.quarter[i1].slots[i2].status;
            slot.querySelector('.country-flag > img').src = obj.quarter[i1].slots[i2].flagUrl;
            slot.querySelector('.country-name').innerText = obj.quarter[i1].slots[i2].nameHeb;
            slot.querySelector('.input-wrapper-content').innerText = obj.quarter[i1].slots[i2].buttonText;
        })
    });
    fillSemi.map(function(match,i1){
        match.querySelector('.inter-brackets-house-message').innerText = obj.semi[i1].msg;
        match.dataset.finished = obj.semi[i1].status;
        Array.from(match.querySelectorAll('.country-select')).map(function(slot,i2){
            slot.dataset.status = obj.semi[i1].slots[i2].status;
            slot.querySelector('.country-flag > img').src = obj.semi[i1].slots[i2].flagUrl;
            slot.querySelector('.country-name').innerText = obj.semi[i1].slots[i2].nameHeb;
            slot.querySelector('.input-wrapper-content').innerText = obj.semi[i1].slots[i2].buttonText;
        })
    });
    fillFinal.map(function(match,i1){
        match.querySelector('.inter-brackets-house-message').innerText = obj.final[i1].msg;
        match.dataset.finished = obj.final[i1].status;
        Array.from(match.querySelectorAll('.country-select')).map(function(slot,i2){
            slot.dataset.status = obj.final[i1].slots[i2].status;
            slot.querySelector('.country-flag > img').src = obj.final[i1].slots[i2].flagUrl;
            slot.querySelector('.country-name').innerText = obj.final[i1].slots[i2].nameHeb;
            slot.querySelector('.input-wrapper-content').innerText = obj.final[i1].slots[i2].buttonText;
        })
    });
    //fillWinner.querySelector('.winner-flag').src = obj.winner.flagUrl;
    fillWinner.querySelector('.inter-brackets-winner-headline h3').innerHTML = obj.winner.name;
    fillWinner.querySelector('.winner-name').innerText = obj.winner.name;
    fillWinner.querySelector('.winner-stage').setAttribute('s-header', obj.winner.attrs.header);
    fillWinner.querySelector('.winner-stage').setAttribute('s-img', obj.winner.attrs.img);
    fillWinner.querySelector('.winner-stage').setAttribute('s-link', obj.winner.attrs.link + "?myprediction=" + localStorage.getItem('interTourUserUid'));

    fillWinner.querySelector('.winner-stage').setAttribute('s-desc', obj.winner.attrs.desc);
    //fillWinner.querySelector('.winner-stage').setAttribute('s-text', obj.winner.attrs.text);//localStorage.getItem('interTourDate'));
    var tempStages = {'fillsixteen': fillSixteen,'fillquarter': fillQuarter,'fillsemi': fillSemi,'fillfinal': fillFinal};

    stages1.map(function(stage){
        let tempCheck = function(){
            obj[stage].every(function(match){
                console.log(match);
                return (match.status === "true")
            });
        };
        if (tempCheck) {
            console.log(tempStages["fill"+stage.toLowerCase()][0].parentElement);
            if ((stage === "semi") || (stage === "final")) {
                tempStages["fill"+stage.toLowerCase()][0].parentElement.parentElement.classList.remove('stage-locked')
            } else {
                tempStages["fill"+stage.toLowerCase()][0].parentElement.classList.remove('stage-locked')
            }

        }
    });

    document.querySelector('.inter-brackets > .inter-brackets-winner').classList.remove('stage-locked');
    //document.querySelector('.inter-tournament-wrapper').style.height = document.querySelector('.'+ mainElemClass).getBoundingClientRect().height + 'px';
}
// let saveButton = document.getElementById('inter-brackets-save');
// let clearButton = document.getElementById('inter-brackets-clear');
// ;saveButton.addEventListener('click',function(){
//     saveToCookie();
//     console.info('saved to cookie');
// });
// clearButton.addEventListener('click',function() {
//     fillTour('inter-brackets',cleanSlate);
// })

