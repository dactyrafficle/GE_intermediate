function returnExxArr(b, alpha, beta, gamma, L) {
  
  let output = [];

  let dp = 0.01;
  for (let x = 0; x < b.data.range.x.max; x += dp) {
    for (let y = 0; y < b.data.range.y.max; y += dp) {
     
     let w = 1;
     let p = [x,y];
     let exx = testMarketPrices(alpha, beta, gamma, L, w, p).exx;
     if (exx < 0.0001) {
       output.push({
         'exogenous':[alpha, beta, gamma, L],
         'p':[x,y],
         'exx':exx
       });

     }
    }  
  }
  
  return output;
}
