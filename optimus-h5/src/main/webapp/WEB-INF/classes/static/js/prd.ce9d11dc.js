/*! finlog 2016-05-18 09 */
function queryDetail(){var subjectNo=mui.$getParam("subjectNo");return subjectNo?void mui.$get("/invest/subject/"+subjectNo,null,function(data){insertToDom(data)}):void mui.toast("获取不到产品编号!")}function insertToDom(data){if($(".mui-title").text(data.subjectName),$(".mui-content").html(prdTmplFunc(data)),$("header").append(headerTmplFunc(data)),data.bidOrders){for(var html=[],i=0;i<data.bidOrders.length;i++)data.bidOrders[i].index=(9>i?"0":"")+(i+1),html.push(investOrderTmplFunc(data.bidOrders[i]));$("#investOrdersContainer").append(html.join(""))}biddableAmount=data.biddableAmount.amount,bidMinAmount=data.bidMinAmount.amount,bidUnit=data.bidUnit.amount,rewardRate=data.rewardRate,subjectNo=data.subjectNo,loanTermDay=LoanTerm[data.loanTerm];var now=(new Date).getTime();return 0>=biddableAmount?void $("#doInvestBtn").text("已售罄"):data.validDate<=now?void $("#doInvestBtn").text("已截止"):void(biddableAmount>0&&($("#doInvestBtn").removeAttr("disabled"),$("#investMoney").removeAttr("disabled")))}function beforeInvest(amount){return amount-0!=amount?void mui.toast("请输入合法的金额!"):(amount-=0,amount>biddableAmount?void mui.toast("超过剩余可购买金额!"):bidMinAmount>biddableAmount&&amount==biddableAmount?!0:biddableAmount>=bidMinAmount&&bidMinAmount>amount?void mui.toast("至少购买"+bidMinAmount):bidMinAmount>biddableAmount&&amount!=biddableAmount?void mui.toast("当前剩余不足起购金额,需一次性全部购买!"):bidUnit>0&&!isMod0(amount,bidUnit)?void mui.toast("金额需是投资步长的整数倍!"):!0)}function isMod0(l,r){var e10=0,str=""+r;return-1!==str.indexOf(".")&&(e10=str.length-str.indexOf(".")-1),l*Math.pow(10,e10)%(r*Math.pow(10,e10))===0}function doInvest(){if(!loading){var amount=$("#investMoney").val();if(!beforeInvest(amount))return void mask.close();loading=!0,$("#loading").show(),mui.$post("/invest/subject/"+subjectNo,{amount:amount},function(data){return 1===data.code?void mui.confirm("现在就去充值?","余额不足",["充值","不买了"],function(e){0==e.index&&(window.location.href=APPROOT+"/deposit")}):void(data.url?window.location.href=data.url:mui.toast("投资失败!"))},function(){mask.close(),loading=!1,$("#loading").hide()})}}for(var prdTmplFunc=mui.$template($("#prdTmpl").html()),headerTmplFunc=mui.$template($("#headerTmpl").html()),investOrderTmplFunc=mui.$template($("#investOrderTmpl").html()),biddableAmount=0,bidMinAmount=0,bidUnit=0,rewardRate=0,subjectNo="",loanTermDay=0,LoanTerm={},i=1;50>i;i++)LoanTerm[i+"月"]=30*i;var loading=!1;mui.init({swipeBack:!0});var mask=null;$("#investMoney").on("focus",function(){setTimeout(function(){mask||(mask=mui.createMask()),mask.show(),/ipad|iphone|mac/gi.test(navigator.userAgent)&&($(".mui-bar-tab").css("position","absolute"),$(".mui-backdrop").css("position","absolute"))},300)}),$("#investMoney").on("focusout",function(){setTimeout(function(){$(".mui-bar-tab").css("position","fixed")},300)}),$("#investMoney").on("input",function(){var val=$("#investMoney").val();if(!val)return $("#profitMoney").text("0"),void $("#investMoney").val("");var money=parseInt(val)||0;money>biddableAmount&&(money=biddableAmount),$("#investMoney").val(money);var profit=money*loanTermDay*rewardRate/360/100;profit=profit.toFixed(5)+"",$("#profitMoney").text(profit.substring(0,profit.indexOf(".")+3))}),$("#doInvestBtn").on("tap",function(){setTimeout(doInvest,500)}),queryDetail();