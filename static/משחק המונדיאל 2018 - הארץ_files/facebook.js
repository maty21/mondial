
    function shownumbers(idx,urlx) {
        $.getJSON("http://graph.facebook.com/?id=" + urlx, function (data) {
            var shares = data.shares;
            $("#"+idx).html(shares);
        })
    }
function shareit(header,cap,desc,pic,link) {
    FB.ui(
{
    method: 'feed',
    name: header,
    link: link,
    picture: pic,
    caption: cap,
    description: desc
},
function (response) {
    if (response && response.post_id) {
    } else {
    }
}
);
}
