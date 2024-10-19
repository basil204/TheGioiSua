function load_muahang(){
    $.post('/modules.php', {name:"Shoping",op:"muahang__thanhcong"}, function(data, textStatus, xhr) {
        $(".muahangthanhcong").html(data);
    });
}

$(document).ready(function(e) {
	
	$("select[name=customer_shipping_province]").on('change', function() {  

        var cityid = $(this).val();

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name:'Shoping',op:'show__quanhuyen',cityid:cityid},
        })
        .done(function(data) {

            console.log(cityid);

            $("select[name=customer_shipping_district]").html(data);
        });
    });


    $("select[name=customer_shipping_district]").on('change', function() {  

        var id = $(this).val();

        $.ajax({
            url: '/modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name:'Shoping',op:'show__phuongxa',id:id},
        })
        .done(function(data) {
            $("select[name=customer_shipping_phuongxa]").html(data);
        });
    });

    $("select[name=customer_shipping_phuongxa]").on('change', function() {  

        var thanhpho    = $("select[name=customer_shipping_province]").val();
        var quanhuyen   = $("select[name=customer_shipping_district]").val();
        var phuongxa    = $(this).val();
         
        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'api__feeship',thanhpho:thanhpho,quanhuyen:quanhuyen,phuongxa:phuongxa},
        })
        .done(function(data) {
            $('.freeship').html(data);
        });
    });


    $("select[name=customer_shipping_phuongxa]").on('change', function() {  

        var thanhpho    = $("select[name=customer_shipping_province]").val();
        var quanhuyen   = $("select[name=customer_shipping_district]").val();
        var phuongxa    = $(this).val();
        var magg        = $("input[name=txt_magiamgia]").val();
        // alert(quanhuyen);
        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'api__tongtien__thanhtoan',thanhpho:thanhpho,quanhuyen:quanhuyen,phuongxa:phuongxa,magg:magg},
        })
        .done(function(data) {
            $('.payment-due-price').html(data);
        });
    });
    

    $(".coupon").on( "click", function() { 

        var macode = $(this).attr("data-mkm");
        $(".coupon").removeClass("open");
        $(".note-magiamgia").html("");

        $(".coupon-loading").css({"display":"block"});
        $(".coupon-public").addClass("close");
        $(".coupon-loading").addClass("open");
        $('.coupon-loading').delay(1500).fadeOut();
        $(".coupon-loading").fadeOut( "slow", function() {
            $(".coupon-loading").removeClass("open");
            $(".coupon-public").removeClass("close");
            $("input[name=txt_magiamgia]").val(macode);
            $(".nice-"+macode).addClass("open");
        });
        
    });

    $(".magiamgia").on( "click", function() {

        var magiamgia  = $("input[name=txt_magiamgia]").val();

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'api__magiamgia',magiamgia:magiamgia},
        })
        .done(function(data) {
            if(data==0){
                $('.cartsum-price').html("0đ");
            }else{
                $('.cartsum-price').html(data);
            }
            
        });
        
    });

    $(".magiamgia").on( "click", function() {

        var magiamgia  = $("input[name=txt_magiamgia]").val();

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'api__magiamgia__biloi',magiamgia:magiamgia},
        })
        .done(function(data) {
            $('.note-magiamgia').html(data);
        });
        
    });

    $(".magiamgia").on( "click", function() {

        var magiamgia   = $("input[name=txt_magiamgia]").val();
        var phuongxa    = $("select[name=customer_shipping_phuongxa]").val();
        var quanhuyen   = $("select[name=customer_shipping_district]").val();
        var thanhpho    = $("select[name=customer_shipping_province]").val();

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'api__magiamgia__tongtienthanhtoan',magiamgia:magiamgia,thanhpho:thanhpho,quanhuyen:quanhuyen,phuongxa:phuongxa},
        })
        .done(function(data) {
            if(data==0){
                console.log("không hợp lệ");
            }else{
               $('.payment-due-price').html(data); 
            }
        });
       
        
    });

    // $(".magiamgia").on( "click", function() {

    //     var magiamgia  = $("input[name=txt_magiamgia]").val();

    //     $.ajax({
    //         url: 'modules.php',
    //         type: 'POST',
    //         dataType: 'html',
    //         data: {name: 'Shoping',op:'api__magg__tongtientt__left',magiamgia:magiamgia},
    //     })
    //     .done(function(data) {
    //         $('.tongtien-left').html(data);
    //     });
        
    // });
    

    $('#save__muahang').submit(function(e) {
        // e.preventDefault();
        data = new FormData($('#save__muahang')[0]);

        $(".waiting").show();
        $("body").addClass("modal-open");
        $(".sendmail").addClass("modal-backdrop fade in");
        


        $.ajax({
            type: 'POST',
            url: '/modules.php?name=Shoping&op=save__muahang',
            data: data,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data) {
            // console.log(data);

            if(data==1){
                $(".waiting").hide();
                $("body").removeClass("modal-open");
                $(".sendmail").removeClass("modal-backdrop fade in");

                $('.muahangthanhcong').addClass("error");    
                $('.muahangthanhcong').addClass("is-active");    
                load_muahang();
            }else{
                console.log(data);
            }

        }).fail(function(jqXHR,status, errorThrown) {
            console.log(errorThrown);
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
        });
    });

    /*******************/

    $(".add-plus").click(function(e){
        var gid     = $(this).attr("data-gid");
        var soluong = $(".soluong"+gid).val();  

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'update__add__soluong',gid:gid,soluong:soluong},
        })
        .done(function(data) {
            location.reload();
        });
    });


    $(".add-minus").click(function(e){
        var gid     = $(this).attr("data-gid");
        var soluong = $(".soluong"+gid).val();  

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'update__subtraction__soluong',gid:gid,soluong:soluong},
        })
        .done(function(data) {
            location.reload();
        });
    });
     

    // product quantity
    // $('.product-detail, #quick-view-modal').on('click', '.box_qty .qty-minus', function(){
    //     var quantity = parseInt($(this).parent('.box_qty').find('input').val());
    //     var price = parseInt($(this).parent('.box_qty').data('price'));
    //     var id = $(this).parent('.box_qty').data('id');
    //     quantity = quantity - 1;
    //     if(quantity < 1) quantity = 1;
    //     $(this).parent('.box_qty').find('input[name=quantity]').val(quantity);
    // });

    // $('.product-detail, #quick-view-modal').on('click', '.box_qty .qty-plus', function(){
    //     var quantity = parseInt($(this).parent('.box_qty').find('input').val());
    //     var price = parseInt($(this).parent('.box_qty').data('price'));
    //     var id = $(this).parent('.box_qty').data('id');
    //     quantity = quantity + 1;
    //     $(this).parent('.box_qty').find('input[name=quantity]').val(quantity);

    // });

    $(".close-sp").on( "click", function() {

        var gid     = $(this).attr("data-gid");

        $.ajax({
            url: 'modules.php',
            type: 'POST',
            dataType: 'html',
            data: {name: 'Shoping',op:'delete__giohang__gid',gid:gid},
        })
        .done(function(data) {
            location.reload();          
        });
    });

    $(".tt-button input").on( "click", function() {
        $(".ttline").removeClass("active");
        var giatri = $(this).val();
        $(".cod"+giatri).addClass("active");
    });

});