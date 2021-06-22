function returnMarketSummaryTable(market) {
 let table = document.createElement('table');
 table.classList.add('mytables');
 table.classList.add('results');
 
 let str = '';
 str += '<tr><td colspan="4">MARKET SUMMARY</td></tr>';
 str += '<tr><td></td><td>LABOR[0]</td><td>GOODS[0]</td><td>GOODS[1]</td></tr>'
 str += '<tr><td>PRICES</td><td>'+ (market.price.w).toFixed(4) +'</td><td>'+ (market.price.p[0]).toFixed(4) +'</td><td>' + (market.price.p[1]).toFixed(4) + '</td></tr>'
 str += '<tr><td>FIRMS[0]</td><td>'+ (-market.firms[0].z).toFixed(4) +'</td><td>'+ (market.firms[0].y).toFixed(4) +'</td><td>' + (0).toFixed(4) + '</td></tr>'
 str += '<tr><td>FIRMS[1]</td><td>'+ (-market.firms[1].z).toFixed(4) +'</td><td>'+ (market.firms[1].k).toFixed(4) +'</td><td>' + (-market.firms[1].y).toFixed(4) + '</td></tr>'
 str += '<tr><td>CONSUMERS[0]</td><td>'+ (market.consumers[0].n).toFixed(4) +'</td><td>'+ (0).toFixed(4) +'</td><td>' + (-market.consumers[0].x).toFixed(4) + '</td></tr>'
 str += '<tr><td>EXX</td><td>'+ (market.labor.exx**2).toFixed(4) +'</td><td>'+ (market.capital.exx**2).toFixed(4) +'</td><td>' + (market.goods.exx**2).toFixed(4) + '</td></tr>'
 
 table.innerHTML += str;
 return table;
}