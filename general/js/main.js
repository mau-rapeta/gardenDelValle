// scroll animation

var win=$(window);

$('.page-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

function checarMenuActivo()
{
    if($(this).scrollTop() > 100){
        $('#navigation').addClass("activate");
        $('#cd-vertical-nav').addClass("activate");
        $('#navigation2').addClass("activate");
    } else if($(this).scrollTop() == 0){
        $('#navigation').removeClass("activate");
        $('#cd-vertical-nav').removeClass("activate");
        $('#navigation2').removeClass("activate");
    }
}

// cambio de color en el nav

var changeMenuColor = {
    //change these to elements to use at waypoints
    toTrack: ".page",
    tracked: {},
    // utility function to check if its within the tracked area
    inObject: function(val){
      var self = this;
      var ret = false;
      var keys= Object.keys(this.tracked);
      keys.push(keys[keys.length-1]);
      var index = 0;
      $.each(this.tracked, function(k,v){
        var next = self.tracked[keys[index+1]];
        if (v<=val && val<=next){
          ret =  k;
        }
         index++;
      });
      return ret;
    },
    //sets up tracked elements for events
    init : function(){
    var self = this;
     //create a collecion of tracked offsets
      $(this.toTrack).each(function(){
         self.tracked[$(this).attr("id")] = $(this).offset().top;
      });
  
      //on scroll, we compare current position and tracked offsets,
      // if they match we trigger the isOnElement.changeMenuColor event
      // on the element
      $(document).on("scroll", function(){
          var currentPosition = $(this).scrollTop();
          var trackFound = self.inObject(currentPosition);
          if (trackFound){
            $("#"+trackFound).trigger("isOnElement.changeMenuColor");
          }
      });
    }
  }
  
  //on dom load we initalize the changeMenuColor operation
  //now we just need to listen for the evemt amd do whatrever
  $(function(){
    changeMenuColor.init();
    $("#slider").on("isOnElement.changeMenuColor", function(){
      $(".navigation").removeClass("turn-black");       
    });
    $("#nosotros").on("isOnElement.changeMenuColor", function(){
      $(".navigation").addClass("turn-black");
    });
    $("#servicios").on("isOnElement.changeMenuColor", function(){
      $(".navigation").addClass("turn-black");
    });
    $("#contacto").on("isOnElement.changeMenuColor", function(){
      $(".navigation").removeClass("turn-black");
    });
  });
  
// desplazamiento del nav móvil

$(document).ready(main);

var contador = 1;

function main(){
    $('.navigation__btn, .nav-link').click(function(){
        if(contador == 1){
            $('.navMobile').animate({
                left: '0'
            });
            contador = 0;
        }else{
            contador = 1;
            $('.navMobile').animate({
                left: '-100%'
            });
        }
    });
};

$(document).ready(function() {
    $('.popup-inline').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        scrolling: true,
        fixedBgPos: false,
        overflowY: 'auto',
        closeBtnInside: false,
        mainClass: 'my-mfp-zoom-in',
        midClick: true,
        removalDelay: 500,
        callbacks: {
            open: function() {
                $('html').css('margin-right', 0);
            }
        }
    });

        checarMenuActivo();

    win.scroll(function(){

        checarMenuActivo();
        darkenNav();
    });

    changeHome();

});

function changeHome() {
    if(win.width() < 991) {
        $("#scrollUp").attr("href", "#slideshow");
    }
    return false;
}

function darkenNav() {
    if(win.width() < 991) {
        if($(document).scrollTop() > 100) {
            $("#navigation").addClass("darken");
        }else {
            $("#navigation").removeClass("darken");
        }
    }
    
    return false;
}


$('form').submit(function(e){
    e.preventDefault(); //prevent default action
    proceed = true;

    //simple input validation
    $($(this).find("input[data-required=true], textarea[data-required=true]")).each(function(){
        if(!$.trim($(this).val())){ //if this field is empty
            $(this).css('border-color','white'); //change border color to red
            proceed = false; //set do not proceed flag
        }
        //check invalid email
        var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
            $(this).css('border-color','red'); //change border color to red
            proceed = false; //set do not proceed flag
        }
    }).on("input", function(){ //change border color to original
        $(this).css('border-color', border_color);
    });


    if (proceed) {
        var form = $(this);
        $.ajax({
            type: "POST",
            url: "../general/code/enviar_email.php",
            data: form.serialize(),
            success: function(data) {
                if (data == "true"){
                    //$("#dialog").html("Gracias por sus comentarios muy pronto nos pondremos en contacto.");
                    //$("#dialog").dialog("open");
                    alert("Gracias por sus comentarios muy pronto nos pondremos en contacto.");
                    window.location.reload();
                } else {
                    //$("#dialog").html("No es posible enviar el formulario: " + data);
                    //$("#dialog").dialog("open");
                    alert("No es posible enviar el formulario: " + data);
                    window.location.reload();
                }
            }
        });
    }
    return false;
});