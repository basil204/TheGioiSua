
function valid(o,w){o.value = o.value.replace(valid.r[w],'');}valid.r={'numbers':/[^\d]/g}

// function isNumberKey(evt){
//  	var charCode = (evt.which) ? evt.which : event.keyCode
//  	if (charCode > 31 && (charCode < 48 || charCode > 57)){

//  		alert("Vui lòng nhập số.");
//  		return false;
//  	}else{
//  		return true;
//  	}
// }
// function lichsudoiqua() {
//   	self.location = "/lich-su-doi-qua.html";
// }
// function closeelement(){
//   	div = document.getElementById("closeelement");div.style.display= "none";
// }


// function valid(o,w){o.value = o.value.replace(valid.r[w],''); }valid.r={'numbers':/[^\d]/g}
// function new_captcha()
// {
// 	var c_currentTime = new Date();
// 	var c_miliseconds = c_currentTime.getTime();
		
// 	document.getElementById('imgrandom').src = '/classes/barcode.php';
// }
// function changeLang(lang)
// {
// 	var urlLang = document.location;
//     ReURL(urlLang+"/lang="+lang); 
		
// }

function load__tien__muasp(){
	$.post('/modules.php', {name:"Shoping",op:"load__tien__muasp"}, function(data, textStatus, xhr) {
		
		$(".cart-price").html(data);
	});
}

function load__soluong__sanpham(){
	$.post('/modules.php', {name:"Shoping",op:"load__soluong__sanpham"}, function(data, textStatus, xhr) {
		$(".showcard").html(data);
	});
}

function load__giohang(){
	$.post('/modules.php', {name:"Shoping",op:"load__giohang"}, function(data, textStatus, xhr) {
		$(".cart-popup").html(data);
	});
}


$(document).ready(function(w) {


	load__soluong__sanpham();
	load__tien__muasp();
	load__giohang();


	$(".catnhomnow > ul > li > a").on('click', function() {	
		
		var cid  = $(this).attr("data-cid");

		$(".catnhomnow > ul > li").removeClass("active");

		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'showajax__sanphamnhom',cid:cid},
		})
		.done(function(data) {
			$(".catnhomnow > ul > li.catsp"+cid).addClass("active");
			$(".showlistcat").html(data);
		});					
	});


    $('.kiemtradh').submit(function(e) {
        // e.preventDefault();
        data = new FormData($('.kiemtradh')[0]);
        $.ajax({
            type: 'POST',
            url: '/modules.php?name=Shoping&op=check__donhang',
            data: data,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data) {
            console.log(data);
            $(".ktdh-show").html(data);
        }).fail(function(jqXHR,status, errorThrown) {
            console.log(errorThrown);
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
        });
    });

	$(".deletesp").on('click', function() {	
		
		var gid    	= $(this).attr("data-id");
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'deletesp',gid:gid},
		})
		.done(function(data) {

			load__soluong__sanpham();

			if(data==1){
				$(".xmenel2024").addClass("close");
			}else{
				$(".addblue").html(data);
			}
		});					
	});


	$("input[name=jquery]").on('keyup', function() {
	 
	 	var giatri = $("input[name=jquery]").val();

		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'ajax__timkiem',giatri:giatri},
		})
		.done(function(data) {

			if(giatri==""){
				$("body").removeClass("modal-open");
				$(".timkiem-me").removeClass("modal-backdrop");
				$(".timkiem-me").removeClass("fade");
				$(".timkiem-me").removeClass("in");
				$(".timkiem-sanpham").hide();
			}else{
				$("body").addClass("modal-open");
				$(".timkiem-me").addClass("modal-backdrop");
				$(".timkiem-me").addClass("fade");
				$(".timkiem-me").addClass("in");
				$(".timkiem-sanpham").show();
				$(".timkiem-sanpham").html(data);
			}
		});
	});

	$(".maytrela").on('click', function() {

		$("body").removeClass("modal-open");
		$(".timkiem-me").removeClass("modal-backdrop");
		$(".timkiem-me").removeClass("fade");
		$(".timkiem-me").removeClass("in");
		$(".timkiem-sanpham").hide();
	});


	$(".thaydoi-tt").on('click', function() {	
		var id    	= $(this).attr("data-id");
		var donhang = $(this).attr("data-dh");


		var result = window.confirm('Bạn có muốn hủy đơn hàng '+donhang+' này không?');
		if (result == false) {
		  	return false;
		};

		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'tinhtrang__donhang',id:id},
		})
		.done(function(data) {
			console.log(data);
			$("td.thaydoitt"+id).html(data);
		});					
	});
	

	$(".xlanguage").click(function() {
		$(".hide-language").toggleClass("open");
	});

	$(".buy-fast").click(function() {
	 	var pid  	 = $(this).attr("data-pid");
	 	var soluong  = $(this).attr("data-sl");
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'add_basket_ajax',pid:pid,soluong:soluong},
		})
		.done(function(data) {
			console.log(data);
			load__giohang();
			load__tien__muasp();
			load__soluong__sanpham();
			// $(".fancybox-inner").html(data);
			$(".addgh-body").html(data);
			$(".addgiohang").addClass("is-active");
			$(".addgiohang").addClass("error");
			$('.is-active').delay(1500).fadeOut("fast", function() {
				$(".addgiohang").removeClass("is-active");
				$(".addgiohang").removeClass("error");
			});	
		});
	});

	$(".buynow").click(function() {
	 	var pid  	 = $(this).attr("data-pid");
	 	var soluong  = $(this).attr("data-sl");
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'add_basket_ajax',pid:pid,soluong:soluong},
		})
		.done(function(data) {
			// load__giohang();
			// load__tien__muasp();
			// load__soluong__sanpham();

			window.location.href = "/thanh-toan";
			
		});
	});

	// product quantity
	$('.product-detail, #quick-view-modal').on('click', '.box_qty .qty-minus', function(){
		var quantity = parseInt($(this).parent('.box_qty').find('input').val());
		var price = parseInt($(this).parent('.box_qty').data('price'));
		var id = $(this).parent('.box_qty').data('id');
		quantity = quantity - 1;
		if(quantity < 1) quantity = 1;
		$(this).parent('.box_qty').find('input').val(quantity);
	});

	$('.product-detail, #quick-view-modal').on('click', '.box_qty .qty-plus', function(){
		var quantity = parseInt($(this).parent('.box_qty').find('input').val());
		var price = parseInt($(this).parent('.box_qty').data('price'));
		var id = $(this).parent('.box_qty').data('id');
		quantity = quantity + 1;
		$(this).parent('.box_qty').find('input').val(quantity);

	});

	$("#add-to-cart").click(function() {
		var pid  	 = $(this).attr("data-pid");
	 	var soluong  = $("#quantity").val();
	 	// alert(soluong);
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'add_basket_ajax',pid:pid,soluong:soluong},
		})
		.done(function(data) {
			// console.log(data);
			// alert("Đã thêm sản phẩm vào giỏ hàng.");
			load__giohang();
			load__tien__muasp();
			load__soluong__sanpham();
			// $("#fadein_fadeout").show();
			// $('#fadein_fadeout').delay("fast").fadeIn();
			// $('#fadein_fadeout').delay(5000).fadeOut();
			
			$(".addgh-body").html(data);
			$(".addgiohang").addClass("is-active");
			$(".addgiohang").addClass("error");
			$('.is-active').delay(1500).fadeOut("fast", function() {
				$(".addgiohang").removeClass("is-active");
				$(".addgiohang").removeClass("error");
			});	
		});
	});


	$(".del-giohang").click(function() {
	 	var gid  = $(this).attr("data-gid");

	 	var result = window.confirm('Bạn có muốn xóa không?');
		if (result == false) {
		  	return false;
		};

		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'del__giohang',gid:gid},
		})
		.done(function(data) {
			location.reload();
			// $(".giohang-load").html(data);	
		});
	});


	// $("input[name=gcount]").on('change', function() {	
	//  	var gid  	= $(this).attr("data-gid");
	//  	var soluong = $(this).val();

	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'edit__giohang',gid:gid,soluong:soluong},
	// 	})
	// 	.done(function(data) {
	// 		load__soluong__sanpham();
	// 		load__tien__muasp();
	// 		load__giohang();
	// 		$(".giohang-money").html(data);
	// 	});
	// });

	$("select[name=gcount]").change(function(p){
		var gid  	= $(this).attr("data-gid");
		var soluong = $(this).val();
		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'edit__giohang',gid:gid,soluong:soluong},
		})
		.done(function(data) {
			load__soluong__sanpham();
			load__tien__muasp();
			load__giohang();
			$(".addblue").html(data);
		});
	});
	
	

	$('#myTabs a').click(function (e) {
	  	e.preventDefault()
	  	$(this).tab('show')
	});









	// var flag123=1;
	// $(window).scroll(function(){
	// 	if(flag123!=100){
	// 		t = parseInt($(window).scrollTop());
	// 		if(t>100){
	// 			$('.kingpower').addClass("open");	
	// 		}else{
	// 			$('.kingpower').removeClass("open");                   
	// 		}
	// 	}
	// });

	// $(".various").fancybox({
	// 	maxWidth	: 800,
	// 	maxHeight	: 400,
	// 	fitToView	: false,
	// 	width		: '100%',
	// 	height		: '100%',
	// 	autoSize	: false,
	// 	closeClick	: false,
	// 	openEffect	: 'none',
	// 	closeEffect	: 'none'

	// });


	// $(".none-tichdiem").click(function(e){
	// 	alert("Vui lòng đăng nhập, để vào trang tích điểm.");
	// });

	// $('#tao-nhom').submit(function(e) {
	 //        // e.preventDefault();
	 //        data = new FormData($('#tao-nhom')[0]);
	 //        $.ajax({
	 //            type: 'POST',
	 //            url: '/admin/admin.php?op=tichdiem__nhom__save',
	 //            data: data,
	 //            cache: false,
	 //            contentType: false,
	 //            processData: false
	 //        }).done(function(data) {
	 //            console.log(data);
	 //        }).fail(function(jqXHR,status, errorThrown) {
	 //            console.log(errorThrown);
	 //            console.log(jqXHR.responseText);
	 //            console.log(jqXHR.status);
	 //        });
	 //    });

	 //    $('#input-tichdiem').submit(function(e) {
	 //        // e.preventDefault();
	 //        data = new FormData($('#input-tichdiem')[0]);
	 //        $.ajax({
	 //            type: 'POST',
	 //            url: '/modules.php?name=Tichdiem&op=tichdiem__save',
	 //            data: data,
	 //            cache: false,
	 //            contentType: false,
	 //            processData: false
	 //        }).done(function(data) {
	 //            console.log(data);
	 //            $(".captcha-note").html(data);
	 //        }).fail(function(jqXHR,status, errorThrown) {
	 //            console.log(errorThrown);
	 //            console.log(jqXHR.responseText);
	 //            console.log(jqXHR.status);
	 //        });
	 //    });

	 //    $('.viewpass').on('click', function() {
	// 	var type  = $("input[name=txt_password]").attr('type');
	// 	if(type == "password"){
	// 		document.getElementById("change-type").type="text";
	// 	}else{
	// 		document.getElementById("change-type").type="password";
	// 	}
		
	// });	

	// $('.not-pay').on('click', function() {
	// 	$("#closeelement").css({"display":"block"});
	// 	setTimeout(closeelement, 3000);
	// });

	


	// $(".show-doiqua").on('click', function() {	
	//  	var cid  	= $(this).attr("data-cid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Your_Account',op:'show__doiqua',cid:cid},
	// 	})
	// 	.done(function(data) {
	// 		// console.log(data);
	// 		$(".show-doiqua").removeClass("active");
	// 		$(".show-doiqua"+cid).addClass("active");
	// 		$(".international-x").html(data);
	// 	});
	// });



	// $('#add-doiqua').submit(function(e) {
	 //        // e.preventDefault();
	 //        data = new FormData($('#add-doiqua')[0]);
	 //        $.ajax({
	 //            type: 'POST',
	 //            url: '/modules.php?name=Doiqua&op=add__doiqua__save',
	 //            data: data,
	 //            cache: false,
	 //            contentType: false,
	 //            processData: false
	 //        }).done(function(data) {
	 //        	// console.log(data);
	 //        	Notify("Bạn đã xác nhận thành công, Chúng tôi sẽ liên hệ với bạn trong thời gia sớm nhất.", null, null, "danger");
	 //            if(data==1){
	 //            	setTimeout(lichsudoiqua, 5000);
	 //            }else{
	 //            	alert("Đã xảy ra lỗi.");
	 //            }
	 //        }).fail(function(jqXHR,status, errorThrown) {
	 //            console.log(errorThrown);
	 //            console.log(jqXHR.responseText);
	 //            console.log(jqXHR.status);
	 //        });
	 //    });

	 //    $(".x_doiqua").on('click', function() {	
	//  	var cid  	= $(this).attr("data-cid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		// data: {name:'Doiqua',op:'show__nhom__doiqua',cid:cid},
	// 		data: {name:'Home',op:'home__category__ajax',cid:cid},
	// 	})
	// 	.done(function(data) {
	// 		// console.log(data);
	// 		$(".x_doiqua").removeClass("active");
	// 		$(".x_doiqua"+cid).addClass("active");
	// 		$(".international-x").html(data);
	// 	});
	// });


	// $(".tinnoibat-ajax").click(function() {
	//  	var sid  	= $(this).attr("data-id");
	//  	var $this 	= $(this);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Tintuc',op:'tinnoibat_ajax',sid:sid},
	// 	})
	// 	.done(function(data) {

	// 			console.log(data);

	// 			if(data==1){
	// 				$this.removeClass('fa-star-o');
	// 				$this.addClass('fa-star');
	// 			}else{
	// 				$this.removeClass('fa-star');
	// 				$this.addClass('fa-star-o');
	// 			}
	// 	});
	// });


	// $(".trangchu-ajax").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	//  	var $this 	= $(this);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'trangchu_ajax',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				$this.removeClass('fa-star');
	// 				$this.addClass('fa-star-o');
	// 			}else{
	// 				$this.removeClass('fa-star-o');
	// 				$this.addClass('fa-star');
	// 			}
	// 	});
	// });

	// $(".sptieubieu-ajax").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	//  	var $this 	= $(this);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'sanphantieubieu_ajax',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				$this.removeClass('fa-star');
	// 				$this.addClass('fa-star-o');
	// 			}else{
	// 				$this.removeClass('fa-star-o');
	// 				$this.addClass('fa-star');
	// 			}
	// 	});
	// });


	// $(".del-tieubieu").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'del_tieubieu',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				self.location = "?op=shoping_tieubieu";
	// 			}else{
	// 				alert("cập nhật không thành công !");
	// 			}
	// 	});
	// });


	// $(".del-trangchu").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'del_trangchu',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				self.location = "?op=shoping_banchay";
	// 			}else{
	// 				alert("cập nhật không thành công !");
	// 			}
	// 	});
	// });

	// $(".del-spbanchay").click(function() {
	//  	var pid  = $(this).attr("data-pid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'del_spbanchay',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 		if(data==1){
	// 			self.location = "?op=shoping_banchay";
	// 		}else{
	// 			alert("cập nhật không thành công !");
	// 		}
	// 	});
	// });


	// $(".vitri-trangchu").change(function(e) {
	// 	var pid   = $(this).attr("data-pid");
	// 	var vitri = $("input[name=vitri_trangchu].vitri-trangchu"+pid).val();
	// 	// alert(vitri);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'vitri_trangchu',pid:pid,'vitri':vitri},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 		if(data==1){
	// 			// $('.huydon'+id).html(data);
	// 			// self.location ="?op=shoping_trangchu";
	// 			window.location="?op=shoping_banchay";
	// 			// console.log("ok");
	// 		}else{
	// 			// alert("Inser không thành công");
	// 			console.log("No Update");
	// 		}
	// 		e.preventDefault();
	// 	});					
	// });

	// $(".spmoi-ajax").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	//  	var $this 	= $(this);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'spmoi_ajax',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				$this.removeClass('fa-star');
	// 				$this.addClass('fa-star-o');
	// 			}else{
	// 				$this.removeClass('fa-star-o');
	// 				$this.addClass('fa-star');
	// 			}
	// 	});
	// });

	// $(".spbanchay-ajax").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	//  	var $this 	= $(this);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'spbanchay_ajax',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				$this.removeClass('fa-star');
	// 				$this.addClass('fa-star-o');
	// 			}else{
	// 				$this.removeClass('fa-star-o');
	// 				$this.addClass('fa-star');
	// 			}
	// 	});
	// });


	// $(".thutu-spmoi").change(function(e) {
	// 	var pid   = $(this).attr("data-pid");
	// 	var thutu = $("input[name=thutu_spmoi].thutu-spmoi"+pid).val();
	// 	// alert(thutu);
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'thutu_spmoi',pid:pid,'thutu':thutu},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 		if(data==1){
	// 			// $('.huydon'+id).html(data);
	// 			// self.location ="?op=shoping_trangchu";
	// 			window.location="?op=shoping_moi";
	// 			// console.log("ok");
	// 		}else{
	// 			// alert("Inser không thành công");
	// 			console.log("No Update");
	// 		}
	// 		e.preventDefault();
	// 	});					
	// });

	// $(".del-spmoi").click(function() {
	//  	var pid  	= $(this).attr("data-pid");
	// 	$.ajax({
	// 		url: '/modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'del_spmoi',pid:pid},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 			if(data==1){
	// 				self.location = "?op=shoping_moi";
	// 			}else{
	// 				alert("cập nhật không thành công !");
	// 			}
	// 	});
	// });


	// $('#idform-dangnhap').submit(function(e) {
	//        // e.preventDefault();
	//        data = new FormData($('#idform')[0]);
	//        $.ajax({
	//            type: 'POST',
	//            url: '/modules.php?name=Your_Account&op=kiemtra__dangnhap',
	//            data: data,
	//            cache: false,
	//            contentType: false,
	//            processData: false
	//        }).done(function(data) {
	//        	console.log(data);
	//        	if(data==1){
	//        		console.log("success");
	//        		self.location = "/trang-quan-tri-thanh-vien.html";
	//        	}else{
	//        		$(".home-error").html(data);	
	//        	}
	//        }).fail(function(jqXHR,status, errorThrown) {
	//            console.log(errorThrown);
	//            console.log(jqXHR.responseText);
	//            console.log(jqXHR.status);
	//        });
	//    });


    $(".muangay").click(function() {
	 	var pid  	 = $(this).attr("data-pid");
	 	var soluong  = $(this).attr("data-sl");
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'add_basket_ajax',pid:pid,soluong:soluong},
		})
		.done(function(data) {
			console.log(data);
			// $(".fancybox-inner").html(data);
		});
	});


	$("input[name=check_donhang]").keyup(function() {
	 	var giatri = $(this).val();
	 	// alert(giatri);
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'donhang__show',giatri:giatri},
		})
		.done(function(data) {
			console.log(data);
			$(".donhang-show").html(data);
		});
	});


	$(".dmsp").click(function() {
	 	$(".dmsp-haschild").toggleClass("open");
	});

	$(".fields").focus(function(){
	    $(this).addClass("hover");
	});
	
	$(".fields").blur(function(){
	    $(this).removeClass("hover");
	});

	
	// $(".top-dmsp > ul > li > ul > li > a").hover(function() {
	//  	var mid  = $(this).attr("data-mid");
	//  	// alert(mid);
	// 	$.ajax({
	// 		url: 'modules.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {name:'Shoping',op:'show__nhomsp__ajax',mid:mid},
	// 	})
	// 	.done(function(data) {
	// 		// console.log(data);
	// 		$(".menuright-ajax").addClass("open");
	// 		$(".menuright-ajax").html(data);
	// 	});
	// });

	$(".sdetail-menu > ul > li").click(function() {
	 	var id = $(this).attr("data-id");

	 	$(".tab").removeClass("active");
	 	$(".tab"+id).addClass("active");

	 	$(".gdetail").removeClass("open");
	 	$(".body"+id).addClass("open");
	 	
	});

	// $(".global-tructuyen > ul > li").click(function() {
	//  	var mid = $(this).attr("data-mid");

	//  	$(".nhomcha").removeClass("open");
	//  	$(".nhomcha"+mid).addClass("open");
	 	
	// });


	$(".global-tructuyen > ul > li").click(function() {
	 	var cid = $(this).attr("data-cid");

	 	$(".nhomcon").removeClass("open");
	 	$(".nhomcon"+cid).addClass("open");
	 	
	});


	$(".ative-download").click(function() {
	 	$(".show-download").toggleClass("open");
	});

	
	$("#add-to-muangay").click(function() {
		var pid  	 = $(this).attr("data-pid");
	 	var soluong  = $("#quantity").val();
	 	// alert(soluong);
		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'add__basket__muangay',pid:pid,soluong:soluong},
		})
		.done(function(data) {
			load__giohang();
			load__tien__muasp();
			load__soluong__sanpham();

			self.location = "/mua-hang.html";
			
			// $(".addgh-body").html(data);
			// $(".addgiohang").addClass("is-active");
			// $(".addgiohang").addClass("error");
			// $('.is-active').delay(1500).fadeOut("fast", function() {
			// 	$(".addgiohang").removeClass("is-active");
			// 	$(".addgiohang").removeClass("error");
			// });	
		});
	});

	$("ul.wpfFilterVerScroll > li").click(function(e) {
		var str = $(this).attr("data-range");
		var res = str.split(",");
		var link = "?min_price="+res[0]+"&max_price="+res[1];
		window.location.href = link;
		// $(".wpfFilterVerScroll").load("/modules.php?name=Shoping&op=display_tam&min_price="+res[0]+"&max_price"+res[1]);
		// window.location="?min_price="+res[0]+"&max_price="+res[1];
		// window.location = link;
	});


	$(".xsnom").click(function(){
		var cid  = $(this).attr("data-cid");

		$.ajax({
			url: '/modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name:'Shoping',op:'ajax__sanpham__nhom',cid:cid},
		})
		.done(function(data) {
			$(".xsnom").removeClass("open");
			$(".cate"+cid).addClass("open")
			// $(".spnhom-noibat-global").html(data);
			$(".supper-xnhom").html(data);
			
		});
	});

	// JS-old


	$(".nhom_cha").change(function() {
		var city_id = $(".nhom_cha").val();
		//alert(city_id);
		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name: 'Shoping',op:'show_huyen_ajax',city_id:city_id},
		})
		.done(function(data) {
			$('.nhom_con').html(data);
		});
	});

	$(".nhom_con").change(function() {
		var id = $(".nhom_con").val();
		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name: 'Shoping',op:'show_phi_ajax',id:id},
		})
		.done(function(data) {
			$('.phivc_ajax').html(data);
		});
	});

	$(".nhom_con").change(function() {
		var id = $(".nhom_con").val();
		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name: 'Shoping',op:'show_lamviec_ajax',id:id},
		})
		.done(function(data) {
			$('.nhom_chau').html(data);
		});
	});

	$(".nhom_con").change(function() {
		var id = $(".nhom_con").val();
		$.ajax({
			url: 'modules.php',
			type: 'POST',
			dataType: 'html',
			data: {name: 'Shoping',op:'update_phivanchuyen',id:id},
		})
		.done(function(data) {
			if(data==1){
				console.log("Done");
			}else{
				console.log("Fail");
			}
		});
	});
	
});
