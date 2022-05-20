

const UI = ()=>{

    const ui = document.createElement('div');
    ui.className = 'fixed-top row m-4';
    ui.id = 'ui';

    return ui;

}

const PlayerWidget = (side)=>{

    const container = document.createElement('div');
    container.className = 'col-4';

    const player = document.createElement('h1');
    player.className = `fw-bold mx-5 my-3 ${side > 0 ? 'text-end' : ''}`;
    player.textContent = `character ${side}`;
    player.id = `character-${side}`;

    const healthContent = document.createElement('div');
    healthContent.className = 'progress';
    healthContent.style.height = '35px';

    const health = document.createElement('div');
    health.className = `progress-bar ${side > 0 ? 'bg-light' : 'bg-danger'} ${side > 0 ? 'w-0' : 'w-100'}`;
    health.id = `character-${side}-h`;
    health.setAttribute('role', 'progressbar');
    health.setAttribute('aria-valuenow', side > 0 ? '0' : '100');

    healthContent.appendChild(health);

    container.append(player, healthContent);
    
    return container;
}

const Timer = ()=>{
    const container = document.createElement('div');
    container.className = 'col-4 justify-content-center';

    const timer = document.createElement('div');
    timer.className = 'fs-bold p fs-1 text-center'
    timer.textContent = '00';
    timer.id = 'timer';

    container.appendChild(timer);

    return container;

}