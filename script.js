let center_width = window.innerWidth / 2;
let folderHolder = document.getElementById('folder-holder');
let rotation = 13;
let folderOpen = false;

function makeFolder(degrees, text) {

    let open = false;

    let newHolder = document.createElement('div');
    newHolder.style.width = "500px";
    newHolder.style.transformOrigin = 'center center'; 
    folderHolder.appendChild(newHolder);
    
    let x_position = center_width - 300;
    x_position += (degrees * 13);
    
    let baseBottom = 90;
    let currentBottom = baseBottom; 
    let timer = null;

    newHolder.style.transform = 'rotate(' + degrees + 'deg)';
    newHolder.style.left = x_position + 'px';
    newHolder.style.bottom = currentBottom + 'px';
    newHolder.style.position = 'absolute';

    let back = document.createElement('div');
    newHolder.appendChild(back);
    back.style.width = '500px';
    back.style.height = '400px';
    back.style.backgroundColor = '#ceb193';
    back.style.borderStyle = 'solid';
    back.style.borderWidth = '5px';
    back.style.borderRadius = '15px';
    back.style.position = 'absolute';
    back.style.bottom = '70px';

    let paper = document.createElement('div');
    newHolder.appendChild(paper);
    paper.style.width = '450px';
    paper.style.height = '350px';
    paper.style.backgroundColor = '#e4e2da';
    paper.style.borderStyle = 'solid';
    paper.style.borderWidth = '5px';
    paper.style.borderRadius = '15px';
    paper.style.position = 'absolute';
    paper.style.left = "24px";
    paper.style.bottom = '70px';

    let front = document.createElement('div');
    newHolder.appendChild(front);
    front.style.width = '500px';
    front.style.height = '350px';
    front.style.backgroundColor = '#E7C9A9';
    front.style.borderStyle = 'solid';
    front.style.borderWidth = '5px';
    front.style.borderRadius = '15px';
    front.style.position = 'absolute';
    front.style.bottom = '70px';

    let description = document.createElement('p');
    description.innerHTML = text;
    newHolder.appendChild(description);
    description.style.color = 'black';
    description.style.position = 'relative';
    description.style.top = '-407px';
    description.style.right = '-330px';
    description.style.width = '100px';
    description.style.textAlign = 'center';
    description.style.fontSize = '30px';
    description.style.fontFamily='Permanent Marker'

    function animateTo(targetBottom) {
        clearInterval(timer);
        timer = setInterval(() => {
            if (currentBottom < targetBottom) {
                currentBottom += 2;
                if (currentBottom > targetBottom) currentBottom = targetBottom;
            } else if (currentBottom > targetBottom) {
                currentBottom -= 2;
                if (currentBottom < targetBottom) currentBottom = targetBottom;
            }

            newHolder.style.bottom = currentBottom + 'px';

            if (currentBottom === targetBottom) {
                clearInterval(timer);
            }
        }, 10);
    }

    newHolder.addEventListener('mouseenter', () => { 
        if (folderOpen != true) {
            animateTo(baseBottom + 40);
        }
    });
    
    newHolder.addEventListener('mouseleave', () => { 
        if (open == false) {
            animateTo(baseBottom);
        }
    });

    newHolder.addEventListener('click', openFolder);

    function openFolder() {
        if (folderOpen || open) {
            return;
        }

        let newDegrees = degrees;
        folderOpen = true;
        open = true;

        let rotateInterval = setInterval(() => {
            newHolder.style.transform = 'rotate(' + newDegrees + 'deg)';
            if (newDegrees == 0) {
                clearInterval(rotateInterval);
                newHolder.style.zIndex = 3;
                
                let targetX = x_position;
                targetX -= (degrees * 13);
                let currentX = x_position;

                let centerInterval = setInterval(() => {
                    console.log("schmove");
                    if (currentX == targetX) {
                        clearInterval(centerInterval);
                        let scale = 1;
                        let transformInterval = setInterval(() => {
                            if (scale < 1.6) {
                                scale += .02;
                                newHolder.style.transform = "scale(" + scale + ")";
                            } else {
                                clearInterval(transformInterval);
                                let newHeight = 350;
                                let openInterval = setInterval(() => {
                                    newHeight -= 2;
                                    front.style.height = newHeight + "px";
                                    if (newHeight <= 20) {
                                        clearInterval(openInterval);
                                        window.addEventListener('click', clickOutsideClose);
                                    }
                                }, 1);
                            }
                        }, 10);
                    }
                    if (currentX > targetX) {
                        currentX -= 1;
                        newHolder.style.left = currentX + 'px';
                    }
                    if (currentX < targetX) {
                        currentX += 1;
                        newHolder.style.left = currentX + 'px';
                    }
                }, 2);
            }
            if (newDegrees > 0) {
                newDegrees -= 1;
            }
            if (newDegrees < 0) {
                newDegrees += 1;
            }
        }, 10);
    }

    function clickOutsideClose(event) {
        if (newHolder.contains(event.target)) {
            return;
        }

        window.removeEventListener('click', clickOutsideClose);

        let currentHeight = 20;
        let closeFlapInterval = setInterval(() => {
            currentHeight += 2;
            front.style.height = currentHeight + "px";
            if (currentHeight >= 350) {
                clearInterval(closeFlapInterval);

                let scale = 1.6;
                let shrinkInterval = setInterval(() => {
                    if (scale > 1) {
                        scale -= .02;
                        newHolder.style.transform = "scale(" + scale + ")";
                    } else {
                        clearInterval(shrinkInterval);

                        let targetX = x_position; 
                        let currentX = center_width - 300;

                        let resetPositionInterval = setInterval(() => {
                            if (currentX == targetX) {
                                clearInterval(resetPositionInterval);
                                
                                let currentDeg = 0;
                                let skewInterval = setInterval(() => {
                                    newHolder.style.transform = 'rotate(' + currentDeg + 'deg)';
                                    if (currentDeg === degrees) {
                                        clearInterval(skewInterval);
                                        
                                        newHolder.style.zIndex = ""; 
                                        folderOpen = false;
                                        open = false;

                                        animateTo(baseBottom);
                                    }
                                    if (currentDeg < degrees) currentDeg += 1;
                                    if (currentDeg > degrees) currentDeg -= 1;
                                }, 10);

                            }
                            if (currentX > targetX) currentX -= 1;
                            if (currentX < targetX) currentX += 1;
                            newHolder.style.left = currentX + 'px';
                        }, 2);
                    }
                }, 10);
            }
        }, 1);
    }

    return paper;
}

let skillsPaper = makeFolder(rotation, 'Skills');
skillsPaper.innerHTML = '<div style="margin:15px"><p style="color:black">I, Detective Pikachu, have many different skills.</p><p>These are included, but not limited to...</p><ul><li><p>Translating Pokemon Language (fluent in all subclasses)</p></li><li><p>Solving Mysteries (best detective I know)</p></li><li><p>Lookin Nice and Fuzzy!</p></li><li><p>A super cool hat and magnifying glass</p></li><li><p>Sneaking behind enemy lines</p></li></ul><p>I am also a generally likeable character!</p></div>';

let experiencePaper = makeFolder(0, 'Experience');
experiencePaper.innerHTML = '<div style="margin:15px"><p>I am very experienced.</p> <p>I have made appearances in a movie and two games, and I have solved a variety of different unrecorded missions.</p><p>I have solved...</p><ul><li><p>The case of the missing Aipom and rampaging Burmy<p/></li><li><p>Solved the search for Purugly, finding a Magnemite in the process.</p></li><li><p>Discovered the truth behind the Aurora legends and ancient murals.</p></li></ul><p style="margin-bottom:2px">And many more that dont fit on this sheet of paper!</p></div>'

let educationPaper = makeFolder(-rotation, 'Education');
educationPaper.innerHTML = '<div style="margin:15px"><p>I am a self-taught Pokemon!</p><p>I have an innate ability to understand pokemon, but I taught myself English at a young age.</p><p>I learned how to be a detective by following my mentor.</p><p>Learn through experience. Thats my philosophy.</p></div>'