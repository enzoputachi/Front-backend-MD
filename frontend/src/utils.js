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