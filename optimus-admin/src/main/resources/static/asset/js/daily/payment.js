/*! hx 2016-05-17 13 */
require("app").register.controller("paymentContorller",function($scope,$myhttp,$timeout,$location){function getCheckedOrderIds(){var ids=[];return _.each($scope.checkboxs,function(val,key){val&&ids.push(key)}),ids.join(",")}function netting(){var inM=0,outM=0,netM=0;_.each($scope.payment.ins||[],function(p){$scope.checkboxs[p.id]&&(inM=p.amount-0+inM)}),_.each($scope.payment.outs||[],function(p){$scope.checkboxs[p.id]&&(outM=p.amount-0+outM)}),inM>outM?($scope.payment.nettingV="入款",netM=inM-outM):($scope.payment.nettingV="出款",netM=outM-inM),console.log(inM,outM,netM),$scope.payment.inV=angular.formatNum(inM),$scope.payment.outV=angular.formatNum(outM),$scope.payment.nettingMoneyV=angular.formatNum(netM)}$scope.orderId=$location.search().orderId,$scope.loading=!1,$scope.loadingMakeRecord=!1,$scope.date=new Date,$scope.totalWaitExecs=0,$scope.payment={},$scope.checkboxs={},$scope.allIsCheck=!1,$scope.orders=[],$scope.checkAll=function(onlyValid){$scope.orderId||($scope.orders=[].concat($scope.payment.ins||[]).concat($scope.payment.outs||[]),onlyValid&&($scope.allIsCheck=!_.find($scope.orders,function(o){return!$scope.checkboxs[o.id]})),onlyValid||_.each($scope.orders,function(o){$scope.checkboxs[o.id]=$scope.allIsCheck}),netting())},$scope.check=function(id){$scope.checkAll(!0)},$scope.refresh=function(){$scope.checkboxs={},$scope.allIsCheck=!1,$scope.loading=!0,$myhttp("loading",$scope).get("/payment/waitpayment",{orderId:$scope.orderId},function(result){$scope.payment=result,$scope.checkAll()}),$myhttp.get("/payment/waitexecs",null,function(result){$scope.totalWaitExecs=result&&_.isArray(result)?result.length:0})},$scope.makeRecord=function(){var ids=getCheckedOrderIds();return ids?($scope.loadingMakeRecord=!0,void $myhttp("loadingMakeRecord",$scope).get("/payment/order",{ids:ids},function(result){$scope.refresh()})):void angular.info("请选择记录!")},$timeout($scope.refresh,300)});