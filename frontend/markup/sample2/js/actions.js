var items = document.querySelectorAll('.top_menu li a');
if (items.length)
{
    items.forEach(element => {
        element.addEventListener("click", () => {
            items.forEach(element => {
                element.parentElement.className = '';
            });
            
            element.parentElement.className = 'active';
            return false;
        });
    });
}