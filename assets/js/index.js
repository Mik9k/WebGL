
$('document').ready(function() {
    getUser();

})

function getUser(){
    $.get('http://localhost:8080/menu/getUser', function(data, stat){

        let user;

        $('#spinner').remove();
        data = JSON.parse(data);
        console.log(data);

        
        ({ player, modes, tracks } = data);

        setTrack(tracks, 1);
        
        if(player != null){
            user = new Player(player.EMAIL, player.NICKNAME, player.SCORE, player.COUNTRY);
            console.log('user', user);
        }

        console.log(localStorage.getItem('soundtrack'));
        
        tracksList(tracks);
        changeTrack(tracks);
        menu(modes, player);
        options(modes);
    })
}

function setTrack({soundtrack}, index = 0){
    
    const current = soundtrack[index];
    
    let author = document.querySelector('#mediaplayer > h6');
    
    let track = document.querySelector('audio > source');
    let player = document.querySelector('audio');
    track.src = current.path;
    
    saveTrack(current, index);

    author.textContent = `${current.name} - ${current.artist} ${current.album}`;

    player.load();
    player.play();
    
    //document.querySelector('audio').play;
}

function saveTrack(current, index){
    localStorage.setItem('current_sound', current.path);
    localStorage.setItem('current_sound_name', current.name);
    localStorage.setItem('current_sound_artist', current.artist);
    localStorage.setItem('current_sound_album', current.album);
    localStorage.setItem('current_sound_index', index);
}

function tracksList({soundtrack}){

    const rList = document.querySelector('#reprodlist');
    const tracks = [];
    
    soundtrack.forEach(track =>{

        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = track.name;

        item.setAttribute('path', track.path);
        item.setAttribute('name', track.name);
        item.setAttribute('artist', track.artist);
        item.setAttribute('album', track.album);

        tracks.push(item);

    })
    console.log(tracks);
    rList.append(...tracks);

}

function menu({modes}, player = null){
    if(player != null){
        modes.pop();
        modes.pop();
        //remover botones de sign   in y login
    }

    const menu = document.querySelector('#menu-container');

    let ul = ULNode();
	const items = modes.map(ItemsNodes);

	ul.append(...items);
	menu.appendChild(ul);
}

class Player{
    constructor(_email, _nickname, _score, _contry){
        this.email = _email;
        this.score = _score;
        this.nickname = _nickname;
        this.contru = _contry;
    }
}

const ULNode =  () =>{
    const ul = document.createElement('ul');
    ul.className = 'list-group';

    return ul;
}

const ItemsNodes = (item)=>{
    const li = document.createElement('li');
    li.className = 'modes-list fs-1 list-group-item'; 

    //SET ATRIBUTES
    li.setAttribute('mode', item.mode);

    //SET ANCHORE CONTENT
    const anchore = document.createElement('a');
    anchore.href = item.href;
    anchore.textContent = item.text;

    if(item.mode == 'signin'){
        const btn = button(item.text, 'signin');
        // data-bs-toggle="modal" data-bs-target="#staticBackdrop"
        anchore.append(btn);
    }
    
    if(item.mode == 'login'){
        const btn = button(item.text, 'login');
        anchore.append(btn);
    }

    if(item.mode == 'settings'){
        const btn = button(item.text, 'settings');
        anchore.append(btn);
    }
    //APPEND
    li.append(anchore);

    return li;

}

function button(textContent, target){

    const btn = document.createElement('button');
    btn.className = 'btn-info btn w-100';
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', `#${target}`);

    btn.textContent = textContent;

    return btn;
}

function changeTrack(tracks){
    $('#reprodlist > .list-group-item').on('click',function(){
        switch (this.getAttribute('name')){
            case 'Watcher':
                setTrack(tracks, 0);
                break;
            case 'Xplosive':
                setTrack(tracks, 1);
                break;
            case 'Still dre':
                setTrack(tracks, 2);
                break;
            case 'Next Episode':
                setTrack(tracks, 2);
                break;
        }
    })
}

function options({modes}){
    $('.modes-list').hover(function(){
        switch (this.getAttribute('mode')) {
            case 'arcade':
                desc = modes.find(mode => mode.mode == 'arcade');
                $('#description > p').text(desc.description);
                break;

            case 'versus':
                desc = modes.find(mode => mode.mode == 'versus');
                $('#description > p').text(desc.description);
                break;

            case 'traning':
                desc = modes.find(mode => mode.mode == 'traning');
                $('#description > p').text(desc.description);
                break;

            case 'settings':
                desc = modes.find(mode => mode.mode == 'settings');
                $('#description > p').text(desc.description);
                break;

            case 'login':
                desc = modes.find(mode => mode.mode == 'login');
                $('#description > p').text(desc.description);
                break;
            
            case 'signin':
                desc = modes.find(mode => mode.mode == 'signin');
                $('#description > p').text(desc.description);
                break;
        
            default:
                break;
        }
    })
}

function createDescription({description}, node){
    
    node.textContent = description;

}


/* $('document').ready(function () {
    $('#preview > button').hide();
    // $('.container-expand-lg').fadeIn(3000);

    //const menu = new Menu($('#character'), '../assets/character/meshes/Boxing.fbx', '');


    $('.modes-list').hover(function () {
        const soundfx = new Audio('../soundfx/select-tiem.wav');
        soundfx.play();
        switch (this.getAttribute('mode')) {
            case 'arcade':
                $('#character div > p').text('This game mode is for those who want to have a good time, defeat their greatest enemies one after another to win the title of world champion, the most courageous fighter of all time.');
                break;

            case 'versus':
                $('#character div > p').text('FIGHT FACE TO FACE WITH YOUR HIGEST RIVAL, CRUSH HIM AND MAKE BITE THE DUST OF YOUR FIST, SHOW HIM HOW BLUE STEEL FEEL.');
		$('#preview > button').hide();
                break;

            case 'traning':
                $('#character div > p').text('GET BETTER AND BETTER, IMPROVE YOUR MOVES, BECOME INTO THE HIGEST FIGHTER OF ALL TIMES TO WIN A WORLD CUP. TIME AND PRACTICE MAKE MASTERS');
		$('#preview > button').hide();
                break;

            case 'online':
                $('#character div > p').text('IMPROVE Y0UR SELF WITH PLAYERS AROUND THE HOLE WORLD, BEAT THEM AND BE THE ONE ON WORLD WIDE SCORE CHART, WHEN YOU GET THERE, YOU WILL BE A REAL CHAMPIO');
		$('#preview > button').hide();
                break;

            case 'session':
                $('#character div > p').text('LOGIN OR SIGN IN FOR AN ACCOUNT AND GET YOU INTO WORLD WIDE SCORE CHART');
		$('#preview > button').show();
                break;

		case 'start':
                $('#character div > p').text('LOGIN OR SIGN IN FOR AN ACCOUNT AND GET YOU INTO WORLD WIDE SCORE CHART');
		$('#preview > button').show();
                break;


            case 'settings':
                $('#character div > p').text('CHANGE MUSIC AND SCREEN SETTINGS');
		$('#preview > button').hide();
                break;

            default:
                break;
        }
    })

}) */
