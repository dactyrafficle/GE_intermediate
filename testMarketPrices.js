function testMarketPrices(alpha, beta, gamma, L, w, p) {
  
  let market = {
   'labor':{
     'supply':0,
     'demand':0,
     'exx':0
   },
   'capital':{
     'supply':0,
     'demand':0,
     'exx':0
   },
   'goods':{
     'supply':0,
     'demand':0,
     'exx':0
   },
   'price':{
     'p':p,
     'w':w
   },
   'exx':0,
   'firms':[[],[]],
   'consumers':[[]]
  }
  
  // FIRMS[0]
  
  let z0 = (w/(p[0]*alpha))**(1/(alpha-1));
  let y0 = z0**alpha;
  let profit0 = p[0]*y0 - w*z0;
  if (profit0 < 0) {
    z0 = 0;
    y0 = 0;
    profit0 = 0;
  }
  
  market.firms[0].z = z0;
  market.firms[0].y = y0;
  market.firms[0].profit = profit0;
  
  market.labor.demand += z0;
  market.labor.exx -= z0;

  market.capital.supply += y0;
  market.capital.exx += y0;
  
  // FIRMS[1]
  
  let k1 = y0;
  let z1 = (w/(p[1]*beta))**(1/(beta-1))*(k1+1);
  let y1 = z1**beta*(k1+1)**(1-beta);
  let profit1 = p[1]*y1 - w*z1 - p[0]*k1;
  if (profit1 < 0) {
    k1 = 0;
    z1 = 0;
    y1 = 0;
    profits1 = 0;
  }
  market.firms[1].z = z1;
  market.firms[1].k = k1;
  market.firms[1].y = y1;
  market.firms[1].profit = profit1;
  
  market.labor.demand += z1;
  market.labor.exx -= z1;
  
  market.capital.demand += k1;
  market.capital.exx -= k1;
  
  market.goods.supply += y1;
  market.goods.exx += y1;

  // CONSUMER
  
  let M = w*L + profit0 + profit1;
  let b = (gamma/(1+gamma))*M/w;
  let n = L - b;
  let x = (1/(1+gamma))*M/p[1];
  
  market.consumers[0].b = b;
  market.consumers[0].n = n;
  market.consumers[0].x = x;
  market.consumers[0].allocation = {
    'b':b,
    'n':n,
    'x':x,
    'L':L
  }
  
  market.consumers[0].budget = {
    'labor':L*w,
    'dividends':[profit0, profit1]
  }
  market.consumers[0].income = {
    'labor':n*w,
    'dividends':[profit0, profit1]
  }
  market.consumers[0].expense_allocation = {
    'x':x
  }
  market.consumers[0].budget_allocation = {
    'b':b,
    'x':x
  }
  market.consumers[0].total_income = n*w + profit0 + profit1;
  market.consumers[0].total_budget = L*w + profit0 + profit1;
  market.consumers[0].total_expenditure = x*p[1];
  market.consumers[0].total_budget_expenditure = b*w + x*p[1];
  
  market.labor.supply += n;
  market.labor.exx += n;
  
  market.goods.demand += x;
  market.goods.exx -= x;
  
  // SUMMARY

  market.exx += market.labor.exx**2;
  market.exx += (market.capital.supply-market.capital.demand)**2;  
  market.exx += (market.goods.supply-market.goods.demand)**2;
  
  market.profit = [profit0, profit1];
  
  return market;
  
}