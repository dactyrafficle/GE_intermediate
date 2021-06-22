
//let exogenous_variables = fetch('exogenous_variables.json?x=' + Math.random()).then(r => r.json());
//let initial_prices = fetch('initial_prices.json?x=' + Math.random()).then(r => r.json());

window.addEventListener('load', function() {
  
  let alpha = 0.5;
  let beta = 0.5;
  let gamma = 1.1;
  let L = 24;
  
  let w = 1;
  let p = [1, 1];
  
  let MARKETSOLUTION;
  let EXXARR;
  let CENTRALSOLUTION;
  let SELECTED = {
    'x':0,
    'y':0,
    'v':{'x':0,'y':0},
    'a':{'x':0,'y':0}
  };
  let CURRENT = {
    'x':0,
    'y':0,
    'v':{'x':0,'y':0},
    'a':{'x':0,'y':0}
  };

  // ALIGNING USER-FACING INPUTS WITH JSON DATA
  
  let input_alpha = document.getElementById('input_alpha');
  let input_beta = document.getElementById('input_beta');
  let input_gamma = document.getElementById('input_gamma');
  let input_L = document.getElementById('input_L');
  
  input_alpha.value = alpha;
  input_beta.value = beta;
  input_gamma.value = gamma;
  input_L.value = L;
  
  let market_summary_table_container = document.getElementById('market-summary-table-container');
  let budget_summary_table_container = document.getElementById('budget-summary-table-container');
  let firm_income_summary_table_container = document.getElementById('firm-income-summary-table-container');

  let selected_market_summary_table_container = document.getElementById('selected-market-summary-table-container');

  // UPDATING THE MARKET AND BUDGET SUMMARIES
  
  MARKETSOLUTION = solveMarket(alpha, beta, gamma, L, w, p);
  console.log(MARKETSOLUTION);

  market_summary_table_container.innerHTML = '';
  budget_summary_table_container.innerHTML = '';
  firm_income_summary_table_container.innerHTML = '';
  market_summary_table_container.appendChild(returnMarketSummaryTable(MARKETSOLUTION));
  budget_summary_table_container.appendChild(returnBudgetSummaryTable(MARKETSOLUTION));
  firm_income_summary_table_container.appendChild(returnFirmIncomeSummaryTable(MARKETSOLUTION));
  
  // UPDATE SELECTED BOX
  selected_market_summary_table_container.innerHTML = '';
  let SELECTEDMARKET = testMarketPrices(alpha, beta, gamma, L, w, [SELECTED.x, SELECTED.y])
  selected_market_summary_table_container.appendChild(returnMarketSummaryTable(SELECTEDMARKET));
        
    // SOLVING CENTRALLY PLANNED PROBLEM

    let solution_n1 = document.getElementById('solution_n1');
    let solution_n2 = document.getElementById('solution_n2');
    let solution_n = document.getElementById('solution_n');
    let solution_b = document.getElementById('solution_b');
    let solution_k = document.getElementById('solution_k');
    let solution_x = document.getElementById('solution_x');
    let solution_u = document.getElementById('solution_u');
    let solution_a_p0 = document.getElementById('solution_a_p0');
    let solution_a_p1 = document.getElementById('solution_a_p1');
    
    let solution_b_n0 = document.getElementById('solution_b_n0');
    let solution_b_n1 = document.getElementById('solution_b_n1');
    let solution_b_n = document.getElementById('solution_b_n');
    let solution_b_b = document.getElementById('solution_b_b');
    let solution_b_k = document.getElementById('solution_b_k');
    let solution_b_x = document.getElementById('solution_b_x');
    let solution_b_u = document.getElementById('solution_b_u');
    
    CENTRALSOLUTION = solveCentralPlanner(alpha, beta, gamma, L);
    showCentrallyPlannedSolution(CENTRALSOLUTION);
  

    // ADJUSTING EXOGENOUS VARIABLES

    let myinputs = document.getElementsByClassName('myinputs');
    for (let i = 0; i < myinputs.length; i++) {
      myinputs[i].addEventListener('input', function() {
        
        alpha = parseFloat(input_alpha.value);
        beta = parseFloat(input_beta.value);
        gamma = parseFloat(input_gamma.value);
        L = parseFloat(input_L.value);
       
        MARKETSOLUTION = solveMarket(alpha, beta, gamma, L, w, p);

        market_summary_table_container.innerHTML = '';
        market_summary_table_container.appendChild(returnMarketSummaryTable(MARKETSOLUTION));

        budget_summary_table_container.innerHTML = '';
        budget_summary_table_container.appendChild(returnBudgetSummaryTable(MARKETSOLUTION));

        firm_income_summary_table_container.innerHTML = '';
        firm_income_summary_table_container.appendChild(returnFirmIncomeSummaryTable(MARKETSOLUTION));

        CENTRALSOLUTION = solveCentralPlanner(alpha, beta, gamma, L);
        showCentrallyPlannedSolution(CENTRALSOLUTION);
        
        EXXARR = returnExxArr(b, alpha, beta, gamma, L);
        updateBox(b, MARKETSOLUTION, EXXARR, SELECTED, 1, CENTRALSOLUTION);
        
        // UPDATE SELECTED BOX
        selected_market_summary_table_container.innerHTML = '';
        let SELECTEDMARKET = testMarketPrices(alpha, beta, gamma, L, w, [SELECTED.x, SELECTED.y])
        selected_market_summary_table_container.appendChild(returnMarketSummaryTable(SELECTEDMARKET));

      });
    }

  // THE BOX
  let box_container = document.getElementById('box-container');
  let b = new Box('p[0]', 'p[1]');
  b.dimension(1000, 1000);
  b.border('1px solid #ddd');
  b.rangex(-0.5, 6);
  b.rangey(-0.5, 6);
  
  box_container.appendChild(b.returnCanvas());
  
  EXXARR = returnExxArr(b, alpha, beta, gamma, L);
  SELECTED.x = b.data.range.x.min + 0.5*b.data.range.x.span;
  SELECTED.y = b.data.range.y.min + 0.5*b.data.range.y.span;
  updateBox(b, MARKETSOLUTION, EXXARR, SELECTED, 1, CENTRALSOLUTION);

  let keyIsPressed = false;
  

  window.addEventListener('keyup', function(e) {
    keyIsPressed = false;    
  });
  window.addEventListener('keydown', function(e) {
   keyIsPressed = true;
   let mag = 0.01;
   let k = e.keyCode;
   console.log(k);
    if (k === 87) {
      SELECTED.y += mag;
    }
    if (k === 68) {
      SELECTED.x += mag;
    }
    if (k === 83) {
      SELECTED.y -= mag;
    }
    if (k === 65) {
      SELECTED.x -= mag;
    }
    updateBox(b, MARKETSOLUTION, EXXARR, SELECTED, 1, CENTRALSOLUTION);
    
    // UPDATE SELECTED BOX
    selected_market_summary_table_container.innerHTML = '';
    let SELECTEDMARKET = testMarketPrices(alpha, beta, gamma, L, w, [SELECTED.x, SELECTED.y])
    selected_market_summary_table_container.appendChild(returnMarketSummaryTable(SELECTEDMARKET));
  });
  
  b.c.addEventListener('mousemove', function(e) {
    //console.log(e);
    let pixel = {'x':e.offsetX,'y':e.offsetY};
    let val = b.PIXEL2VAL(pixel);
    //selected_market_summary_table_container
  });
  b.c.addEventListener('click', function(e) {
    let pixel = {'x':e.offsetX,'y':e.offsetY};
    let val = b.PIXEL2VAL(pixel);
    //console.log(val);
    SELECTED.x = val.x;
    SELECTED.y = val.y;
    
    updateBox(b, MARKETSOLUTION, EXXARR, SELECTED, 1, CENTRALSOLUTION);
    
    // UPDATE SELECTED BOX
    selected_market_summary_table_container.innerHTML = '';
    let SELECTEDMARKET = testMarketPrices(alpha, beta, gamma, L, w, [val.x, val.y])
    selected_market_summary_table_container.appendChild(returnMarketSummaryTable(SELECTEDMARKET));
  });

}); // CLOSING WINDOW LOAD EVENT