
function solveMarket(alpha, beta, gamma, L, w, p) {

 let dp = 0.1; // if you start too large, you will shoot right past the best region!!!! 
 let m = [-1*dp, 0, 1*dp];

 let current_prices = [p[0], p[1]];
 let current_market = testMarketPrices(alpha, beta, gamma, L, w, current_prices);
 
 let solution_path = [];
 solution_path[0] = p;
 
 while (dp > 0.00001) {
   
   let best_prices = [];
   best_prices[0] = current_prices[0];
   best_prices[1] = current_prices[1];
   let best_market = testMarketPrices(alpha, beta, gamma, L, w, current_prices);
 
   let improved = false;
   for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) {
     if (i === 1 && j === 1) {}
     else {
      let test_market = testMarketPrices(alpha, beta, gamma, L, w, [current_prices[0]+m[i], current_prices[1]+m[j]]);
      if (test_market.exx < best_market.exx) {
        best_prices[0] = (current_prices[0]+m[i]);
        best_prices[1] = (current_prices[1]+m[j]);
        best_market = testMarketPrices(alpha, beta, gamma, L, w, best_prices);
        improved = true;
        solution_path.push(best_prices);
      }
     }
    } 
   }
   
   if (improved) {
     current_prices[0] = best_prices[0];
     current_prices[1] = best_prices[1];
     current_market = testMarketPrices(alpha, beta, gamma, L, w, current_prices);
   } else {
     dp = dp/10;
     m = [-1*dp, 0, 1*dp];
   }
   
 }
 current_market.solution_path = solution_path;
 return current_market;
}
