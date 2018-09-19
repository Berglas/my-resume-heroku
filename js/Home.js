var i = 0;

function delayedUpdatelist(delta) {　　
    var $rounditem = $('.rounditem').toArray();　　
    var size = $rounditem.length;
    i += delta;
    if (i < size && i > 0) {　

    } else if (i == -1) {　
        i = size - 1;

    }　　
    else {
        i = 0;　　

    }

    $('.rounditem').fadeOut("slow");
    $('.rounditem:eq(' + i + ')').delay(500).fadeIn("slow");
}

