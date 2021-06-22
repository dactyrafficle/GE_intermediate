function returnFirmIncomeSummaryTable(market) {
 let table = document.createElement('table');
 table.classList.add('mytables');
 table.classList.add('results');
 
 let str = '';
 str += '<tr><td colspan="99">FIRM INCOME SUMMARY</td></tr>';
 str += '<tr><td></td><td>FIRMS[0]</td><td>FIRMS[1]</td></tr>';

 str += '<tr><td>QUANTITY</td><td>'+ (market.firms[0].y).toFixed(4) +'</td><td>'+ (market.firms[1].y).toFixed(4) +'</td></tr>';
 str += '<tr><td>PRICE</td><td>'+ (market.price.p[0]).toFixed(4) +'</td><td>'+ (market.price.p[1]).toFixed(4) +'</td></tr>';
 str += '<tr><td>REVENUE</td><td>'+ (market.firms[0].y*market.price.p[0]).toFixed(4) +'</td><td>'+ (market.firms[1].y*market.price.p[1]).toFixed(4) +'</td></tr>';
 
 str += '<tr><td>z, qty</td><td>'+ (market.firms[0].z).toFixed(4) +'</td><td>'+ (market.firms[1].z).toFixed(4) +'</td></tr>';
 str += '<tr><td>z, cost @' + (market.price.w).toFixed(4) + '</td><td>'+ (market.firms[0].z*market.price.w).toFixed(4) +'</td><td>'+ (market.firms[1].z).toFixed(4) +'</td></tr>';
 
 str += '<tr><td>k, qty</td><td>'+ (0).toFixed(4) +'</td><td>'+ (market.firms[1].k).toFixed(4) +'</td></tr>';
 str += '<tr><td>k, cost @' + (market.price.p[0]).toFixed(4) + '</td><td>'+ (0).toFixed(4) +'</td><td>'+ (market.firms[1].k*market.price.p[0]).toFixed(4) +'</td></tr>';
 
 str += '<tr><td>COST</td><td>'+ (market.firms[0].z*market.price.w).toFixed(4) +'</td><td>'+ (market.firms[1].k*market.price.p[0] + market.firms[1].z*market.price.w).toFixed(4) +'</td></tr>';

 str += '<tr><td>PROFIT</td><td>'+ (market.firms[0].profit).toFixed(4) +'</td><td>'+ (market.firms[1].profit).toFixed(4) +'</td></tr>';
 
 table.innerHTML += str;
 return table;
}