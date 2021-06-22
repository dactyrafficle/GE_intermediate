function returnBudgetSummaryTable(market) {
 let table = document.createElement('table');
 table.classList.add('mytables');
 table.classList.add('results');
 
 let str = '';
 str += '<tr><td colspan="2">BUDGET SUMMARY</td></tr>';
 str += '<tr><td></td><td>CONSUMER[0]</td></tr>';
 
 str += '<tr><td>w*L</td><td>'+ (market.consumers[0].allocation.L*market.price.w).toFixed(4) +'</td></tr>';
 str += '<tr><td>FIRMS[0].profit</td><td>'+ (market.firms[0].profit).toFixed(4) +'</td></tr>';
 str += '<tr><td>FIRMS[1].profit</td><td>'+ (market.firms[1].profit).toFixed(4) +'</td></tr>';
 str += '<tr><td>BUDGET</td><td>'+ (market.consumers[0].total_budget).toFixed(4) +'</td></tr>';
 str += '<tr><td>leisure</td><td>'+ (market.consumers[0].allocation.b*market.price.w).toFixed(4) +'</td></tr>';
 str += '<tr><td>INCOME</td><td>'+ (market.consumers[0].total_income).toFixed(4) +'</td></tr>';
 str += '<tr><td>goods</td><td>'+ (market.consumers[0].allocation.x*market.price.p[1]).toFixed(4) +'</td></tr>';
 str += '<tr><td>BALANCE</td><td>'+ (market.consumers[0].total_income - market.consumers[0].total_expenditure).toFixed(4) +'</td></tr>';
 
 table.innerHTML += str;
 return table;
}