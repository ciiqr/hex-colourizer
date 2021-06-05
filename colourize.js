document.addEventListener("DOMContentLoaded", function(){
    const dark = document.body.querySelector('#dark');
    const light = document.body.querySelector('#light');
    const editor = document.body.querySelector('#editor');
    const renderer = document.body.querySelector('#renderer');
    const content = document.body.querySelector('#content');

    // re-render on input
    editor.addEventListener('input', function(e) {
        // clear existing rendering
        renderer.innerHTML = "";

        // split into sections with and without hex codes
        const sections = e.target.value.match(/(#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b|[^#]+)/g);
        for (const section of sections) {
            const sectionElem = document.createElement('span');
            sectionElem.innerHTML = section;

            // set colour to hex code
            if (section.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g)) {
                // TODO: detect low contrast colours (relative to background): https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
                // TODO: add a different background for low contrast colours to stand out more

                sectionElem.classList.add('colour-bubble');
                sectionElem.style = `
                    color: ${section};
                    border-color: ${section};
                `;
            }

            // render section
            renderer.appendChild(sectionElem);
        }
    });

    // toggle dark/light
    dark.addEventListener('click', function(e) {
        // dark mode
        // TODO: should do with class
        content.style = `
            background-color: #272822;
            color: white;
        `;
    });
    light.addEventListener('click', function(e) {
        // reset to default
        content.style = '';
    });
});
