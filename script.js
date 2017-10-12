$(document).ready(()=>{
	var firstView = true;
	$('.yahoo-finance-form').submit((event)=>{
		// Stop the browser from sending the page on... we will handle it.
		event.preventDefault()
		// console.log("User submitted the form!")
		var stockSymbol = $('#ticker').val();
		// console.log(stockSymbol);
		var url = 'http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+stockSymbol+'%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		// getJSON takes:
		// 1. Where
		// 2. What to do (function)
		$.getJSON(url,(theDataJSFound)=>{
			console.log(theDataJSFound);
			var numFound = theDataJSFound.query.count;
			var newRow = "";
			if(numFound > 1){
				theDataJSFound.query.results.quote.map((stock)=>{
					newRow += buildRow(stock);
			})
			}else{
				var stockInfo = theDataJSFound.query.results.quote;
				var newRow = buildRow(stockInfo);
			}
			
			
			if(firstView){
				$('#stock-table-body').append(newRow);
				firstView = false
			}else{
				$('#stock-table-body').append(newRow);
			}
			;
		});
	})
	function buildRow(stockInfo){
		if(stockInfo.Change.indexOf('+') > -1){
			var classChange = "success"
		}else{
			var classChange = "danger"
		}
		var newRow = '';
		newRow += '<tr>';
			newRow += `<td>${stockInfo.Symbol}</td>`;
			newRow += `<td>${stockInfo.Name}</td>`;
			newRow += `<td>${stockInfo.Ask}</td>`;
			newRow += `<td>${stockInfo.Bid}</td>`;
			newRow += `<td class="bg-${classChange}">${stockInfo.Change}</td>`;
		newRow += '</tr>';
		return newRow;
	}
	$("#reset").click(function() {
    	document.location.reload();
    });
});



