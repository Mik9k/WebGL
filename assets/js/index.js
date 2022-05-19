$('document').ready(function () {
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

})
