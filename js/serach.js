function search() {
    if (document.getElementById("search_input").value != "") {
        window.open("https://cn.bing.com/search?q=" + document.getElementById("search_input").value)
        document.getElementById("search_input").value = "";
    }
    return false;
}