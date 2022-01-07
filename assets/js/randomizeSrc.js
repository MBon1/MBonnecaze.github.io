// Sets the source of the given Id to a random value in the list Srcs
// Assumes that the elements in Srcs are valid and can be used by Id
function randomizeSrc(Id, Srcs) {
    var randomIndex = Math.floor(Math.random() * Srcs.length);
    var id = document.getElementById(Id).src;
    if(id != null)
        document.getElementById(Id).src = Srcs[randomIndex];
}