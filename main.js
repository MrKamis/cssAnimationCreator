(() => {


    let menu = true;
    let width = parseInt(window.innerWidth) - 20;
    let height = parseInt(window.innerHeight);
    let taps = [];
    let animationNumber = 1;
    let animationDuration = 10000;
    let animationTimingFunciton = 'ease';
    let mainClick = (x, y) => {
        let point = document.createElement('div');
        point.classList.add('point');
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        document.getElementById('main').appendChild(point);
        taps.push({
            x: x,
            y: y
        });
        let li = document.createElement('li');
        li.innerHTML = 'Animation';
        document.getElementById('list').appendChild(li);
    };
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('menu').addEventListener('click', () => {
            if(menu){
                document.getElementById('lBar').style.width = '50px';
                document.getElementById('taps').style.display = 'none';
                for(let x = 0; x < document.getElementsByClassName('mustHide').length; x++){
                    document.getElementsByClassName('mustHide')[x].style.display = 'none';
                    document.getElementsByClassName('icon')[x].style.display = 'inline';
                }
            }else{
                document.getElementById('lBar').style.width = '200px';
                document.getElementById('taps').style.display = 'block';
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
        document.getElementById('option').addEventListener('click', () => {
            if( document.getElementById('modal').style.display == 'block'){
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
            }
        });


        document.getElementById('start').addEventListener('click', () => {
            let TMP = Math.round(100 / taps.length);
            let TMP1 = TMP;
            let style = document.createElement('style');
            style.type = 'text/css';
            let test = `@keyframes yourAnimation` + ++animationNumber + `{`;
            for(let x = 0; x < taps.length; x++){
                test += TMP + '% {' +
                    'left: ' + taps[x].x  + 'px;\n' +
                    'top: ' + taps[x].y + 'px;\n' +
                '}\n';
                TMP += TMP1;
            }
            test += '}';
            test += `\n.animation` + animationNumber + ` {
                animation-name: yourAnimation` + animationNumber + `; animation-duration: ` + animationDuration + `ms; animation-timing-function: ` + animationTimingFunciton + `;
            }`;
            style.innerHTML = test;
            document.getElementsByTagName('head')[0].appendChild(style);
            let divTest = document.createElement('div');
            divTest.classList.add('test');
            divTest.style.top = taps[0].y + 'px';
            divTest.style.left = taps[0].x + 'px';
            document.getElementById('main').appendChild(divTest);
            setTimeout(() => {
                divTest.classList.add('animation' + animationNumber)
            }, 100);
        });
    });
})();