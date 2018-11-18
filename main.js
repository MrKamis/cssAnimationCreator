(() => {


    let menu = true;
    let width = parseInt(window.innerWidth) - 20;
    let height = parseInt(window.innerHeight);
    let taps = [];
    let animationNumber = 1;
    let animationDuration = 10000;
    let animationTimingFunciton = 'ease';
    let editingTap = 0;
    let lastKeyFrames = '';
    let mainClick = (x, y) => {
        let point = document.createElement('div');
        point.classList.add('point');
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        document.getElementById('main').appendChild(point);
        taps.push({
            x: x - 200,
            y: y,
            special: []
        });
        let li = document.createElement('li');
        li.innerHTML = 'Animation';
        document.getElementById('list').appendChild(li);
        addingListener();
    };
    let editTap = n => {
        let tap = document.getElementById('editTap');
        let TMP = `Edytowanie nr. ` + parseInt(n + 1);
        TMP += `<div class="options">
            <label>
                Dodaj opcje: 
                <br>
                <input type="text" id="animationOption" placeholder="transform: rotate(360deg)">
            </label>
            <button id="changeTap">Zatwierdź</button>
            <ul id="ulSpecial">`;
            if(taps[n].special.length != 0){
                for(let x = 0; x < taps[n].special.length; x++){
                    TMP += '<li>' + taps[n].special[x] + '</li>';
                }
            }
            TMP += `</ul>
        </div>`;
        tap.innerHTML = TMP;
        tap.style.display = 'block';
        editingTap = n;
        document.getElementById('changeTap').addEventListener('click', () => {
            taps[n].special.push(document.getElementById('animationOption').value);
            document.getElementById('ulSpecial').innerHTML += '<li>' + document.getElementById('animationOption').value + '</li>';
            document.getElementById('animationValue').value = '';
        });
    };
    let addingListener = () => {
        for(let x = 0; x < document.getElementsByTagName('li').length; x++){
            document.getElementsByTagName('li')[x].addEventListener('click', () => {
                editTap(x);
            });
        }
    };
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('menu').addEventListener('click', () => {
            if(menu){
                document.getElementById('lBar').style.width = '50px';
                document.getElementById('taps').style.display = 'none';
                document.getElementById('options').style.display = 'none';
                for(let x = 0; x < document.getElementsByClassName('mustHide').length; x++){
                    document.getElementsByClassName('mustHide')[x].style.display = 'none';
                    document.getElementsByClassName('icon')[x].style.display = 'inline';
                }
            }else{
                document.getElementById('lBar').style.width = '200px';
                document.getElementById('taps').style.display = 'block';
                document.getElementById('options').style.display = 'block';
                for(let x = 0; x < document.getElementsByClassName('mustHide').length; x++){
                    document.getElementsByClassName('mustHide')[x].style.display = 'inline-block';
                    document.getElementsByClassName('icon')[x].style.display = 'none';
                }
            }
            menu = !menu;
        });

        document.getElementById('main').style.width = width - 200 + 'px';
        document.getElementById('main').style.height = height + 'px';
        document.getElementById('modal').style.width = width - 200 + 'px';
        document.getElementById('main').addEventListener('click', e => {
            mainClick(e.clientX, e.clientY);
        });
        document.getElementById('checkOptions').addEventListener('click', () => {
            /* if( document.getElementById('modal').style.display == 'block'){
                document.getElementById('modal').style.display = 'none';
            }else{
                document.getElementById('modal').style.display = 'block';
                let modalContent = document.getElementById('modalContent');
                let TMP = `<label>
                    Długość animacji w ms: <input type="number" id="dlugoscAnimacji" value="5000">
                </label><br>
                <label>
                    Prędkość na początku i na koncu: <select id="predkoscAnimacji">
                        <option value="linear">linear</option>
                        <option value="ease-in">ease-in</option>
                        <option value="ease-out">ease-out</option>
                        <option value="ease">ease</option>
                    </select>
                </label>
                <button id="checkOptions">Zatwierdź</button>`;
                modalContent.innerHTML = TMP;
                document.getElementById('checkOptions').addEventListener('click', () => {
                    animationDuration = document.getElementById('dlugoscAnimacji').value;
                    animationTimingFunciton = document.getElementById('predkoscAnimacji').value;
                    document.getElementById('modal').style.display = 'none';
                });
            } */

            animationDuration = document.getElementById('animationDuration').value;
            animationTimingFunciton = document.getElementById('animationTimingFunction').value;

        });


        document.getElementById('start').addEventListener('click', () => {
            let TMP = Math.floor(100 / taps.length);
            let TMP1 = TMP;
            TMP = 0;
            let style = document.createElement('style');
            style.type = 'text/css';
            let test = `@keyframes yourAnimation` + ++animationNumber + `{`;
            for(let x = 0; x < taps.length; x++){
                test += TMP + '% {' +
                    'margin-left: ' + taps[x].x + 'px;\n' +
                    'margin-top: ' + taps[x].y + 'px;\n';
                    if(taps[x].special.length != 0){
                        for(let y = 0; y < taps[x].special.length; y++){
                            test += taps[x].special[y] + ';\n';
                        }
                    }
                test += '}\n';
                TMP += TMP1;
            }
            test += '100% { margin-left: ' + taps[0].x + 'px; margin-top: ' + taps[0].y + 'px; ';
            if(taps[0].special.length != 0){
                for(let x = 0; x < taps[0].special.length; x++){
                    test += taps[0].special[x] + ';\n';
                }
            }
            test += '}}';
            lastKeyFrames = test;
            test += `\n.animation` + animationNumber + ` {
                animation-name: yourAnimation` + animationNumber + `; animation-duration: ` + animationDuration + `ms; animation-timing-function: ` + animationTimingFunciton + `;
            }`;
            for(let x = 0; x < document.getElementsByClassName('test').length; x++){
                document.getElementsByClassName('test')[x].style.display = 'none';
            }
            style.innerHTML = test;
            document.getElementsByTagName('head')[0].appendChild(style);
            let divTest = document.createElement('div');
            divTest.classList.add('test');
            divTest.style.marginTop = taps[0].y + 'px';
            divTest.style.marginLeft = taps[0].x + 'px';
            divTest.innerHTML = 'A';
            document.getElementById('main').appendChild(divTest);
            setTimeout(() => {
                divTest.classList.add('animation' + animationNumber)
            }, 100);
        });
        document.getElementById('generateCode').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block';
            let modal = document.getElementById('modalContent');
            let test = '<div style="width: 100%; text-align: right; font-size: 120%; cursor: pointer;" onclick="document.getElementById(`modal`).style.display = `none`">&times;</div>'
            let TMP = Math.floor(100 / taps.length);
            let TMP1 = TMP;
            TMP = 0;
            let style = document.createElement('style');
            style.type = 'text/css';
            test += `@keyframes yourAnimation` + ++animationNumber + `{`;
            for(let x = 0; x < taps.length; x++){
                test += TMP + '% {' +
                    'margin-left: ' + taps[x].x  + 'px;\n' +
                    'margin-top: ' + taps[x].y + 'px;\n';
                    if(taps[x].special.length != 0){
                        for(let y = 0; y < taps[x].special.length; y++){
                            test += taps[x].special[y] + ';\n';
                        }
                    }
                test += '}\n';
                TMP += TMP1;
            }
            test += '100% { margin-left: ' + taps[0].x + 'px; margin-top: ' + taps[0].y + 'px}}';
            modal.innerHTML = test;
        });
        document.getElementById('changeMainOptions').addEventListener('click', () => {
            if(window.confirm('Te dane powinny zmieniać się tylko na samym początku! Czy chcesz kontunuować?')){
                document.getElementById('main').style.width = document.getElementById('mainWidth').value + 'px';
                document.getElementById('main').style.height = document.getElementById('mainHeight').value + 'px';
            }else{
                return false;
            }
        });
    });
})();