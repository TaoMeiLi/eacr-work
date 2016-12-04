$(function(){
	$("#tcdd_btn").bind("click",function(){
		$("#tcdd_se").show();
		$("#plate_sele11").val("");
		$("#plate_sele22").val("");
		$("#tcdd_add").bind("click",function(){
			if($("#plate_sele11").val()!=''&&$("#plate_sele22").val()!=''){
				var cs=$("#plate_sele22").val();
				$("#tcdd").append("<p class='tcdd_cs'><span>"+cs+"</span><i>X</i></p>")		}
				$(".tcdd_cs i").bind("click",function(){
					$(this).parent(".tcdd_cs").remove();
				})		
		})
	})
})