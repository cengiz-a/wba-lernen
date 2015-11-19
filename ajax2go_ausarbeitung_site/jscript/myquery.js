$(document).ready(function () {

    var $win = $(window);

    $('section.parapara').each(function () {
        var scroll_speed = 5;
        var $this = $(this);
        console.log("Found it: ", this);

        $(window).scroll(function () {
            var bgScroll = -(($win.scrollTop() - $this.offset().top) / scroll_speed);
            var bgPosition = 'center ' + bgScroll + 'px';
            //console.log("bgScroll: ", bgScroll);
            $this.css({
                backgroundPosition: bgPosition
            });
        });
    });

    $("#get_started_button").click(function () {
        $("html, body").animate({
            scrollTop: $("#page1").offset().top
        }, "slow");
    });

    $(".page").click(function () {
        $(this).children(".code").slideToggle("slow");
    });

    $(".p_circle").mouseenter(function () {
        $(this).animate({
            marginTop: '+=50px'
        }, "fast");
        $(this).animate({
            marginTop: '-=50px'
        }, "fast");
    });

    function fillQuestions() {
        $.ajax({
            url: "Readme.txt",
            success: function (result) {
                $("#readmetext").html(result)
            }
        });
    }
    fillQuestions();

    $("#detailed_plan").children("ol").children().mouseenter(function () {
        $(this).animate({
            borderRadius: '0'
        }, "fast");
    });

    $("#detailed_plan").children("ol").children().mouseleave(function () {
        $(this).animate({
            borderRadius: '100px'
        }, "fast");
    });

    function bounce() {
        $(".social_icon").animate({
            marginTop: '-=20px'
        }, 2000);
        $(".social_icon").animate({
            marginTop: '+=20px'
        }, 2000, bounce);
    }
    bounce();

    var data = {
        labels: ["Mit Ajax", "Ohne Ajax"],
        datasets: [
            {
                label: "Ajax on Facebook",
                fillColor: "rgba(255,255,255,1.0)",
                data: [5, 100]
                    }
                ]
    }

    var ctx = $("#facebook_chart").get(0).getContext("2d");
    var myFacebookChart = new Chart(ctx).Bar(data, {
        barShowStroke: false,
        animation: true,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        scaleFontColor: "#fff",
        showScale: true,
        barMaxWidth: 5,
        responsive: false,
        barValueSpacing: 200
    });
});

$(window).konami();
$(window).on('konami', function () {
    $('#page0').css("background-image", "url(css/yee.jpg)")
    $('body').css("font-family", "Comic Sans Ms");
    $.playSound('css/yee');
});