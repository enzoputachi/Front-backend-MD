//Extract parameters from Url 
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}


//rerender
export const rerender = async (component) => {
    document.getElementById('main').innerHTML = await component.render();
    await component.after_render();
  };


// Show loading
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
};

// Hide loading
export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
};

//Show meaage overlay
export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-close-button" class="normal">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active')
    document.getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active')
        if(callback) {
            callback();
        }
    })
}